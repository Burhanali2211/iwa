import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const createAssignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  subject: z.string().min(1, 'Subject is required'),
  class: z.string().min(1, 'Class is required'),
  dueDate: z.string(),
  maxMarks: z.number().positive('Max marks must be positive'),
  instructions: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});



// GET - Fetch assignments
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const classFilter = searchParams.get('class');

    const whereClause: { class?: string; teacherId?: string; subject?: string } = {};

    // If user is a student, filter by their class and assignments assigned to them
    if (authResult.user.role === 'STUDENT') {
      const student = await prisma.student.findUnique({
        where: { userId: authResult.user.userId }
      });
      
      if (student) {
        whereClause.class = student.class;
      }
    } else if (authResult.user.role === 'TEACHER') {
      // Teachers can see assignments they created
      const teacher = await prisma.teacher.findUnique({
        where: { userId: authResult.user.userId }
      });
      
      if (teacher) {
        whereClause.teacherId = teacher.id;
      }
    }

    // Apply filters
    if (subject) {
      whereClause.subject = subject;
    }

    if (classFilter && authResult.user.role !== 'STUDENT') {
      whereClause.class = classFilter;
    }

    const assignments = await prisma.assignment.findMany({
      where: whereClause,
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        },
        submissions: authResult.user.role === 'STUDENT' ? {
          where: {
            userId: authResult.user.userId
          }
        } : true,
      },
      orderBy: {
        dueDate: 'asc'
      }
    });

    // Add submission status for students
    const assignmentsWithStatus = assignments.map(assignment => {
      if (authResult.user.role === 'STUDENT') {
        const userSubmission = assignment.submissions.find(
          (sub: { userId: string }) => sub.userId === authResult.user.userId
        );
        
        return {
          ...assignment,
          submissionStatus: userSubmission ? 'SUBMITTED' : 'PENDING',
          userSubmission: userSubmission || null,
        };
      }
      
      return {
        ...assignment,
        submissionCount: assignment.submissions.length,
      };
    });

    return NextResponse.json({
      success: true,
      assignments: assignmentsWithStatus,
    });

  } catch (error) {
    console.error('Get assignments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

// POST - Create new assignment (Teachers and Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['TEACHER', 'ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const validatedData = createAssignmentSchema.parse(body);

    // Get teacher profile
    const teacher = await prisma.teacher.findUnique({
      where: { userId: authResult.user.userId }
    });

    if (!teacher && authResult.user.role === 'TEACHER') {
      return NextResponse.json(
        { error: 'Teacher profile not found' },
        { status: 404 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        subject: validatedData.subject,
        class: validatedData.class,
        dueDate: new Date(validatedData.dueDate),
        maxMarks: validatedData.maxMarks,
        instructions: validatedData.instructions,
        attachments: JSON.stringify(validatedData.attachments || []),
        teacherId: teacher?.id || 'admin',
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Assignment created successfully',
      assignment,
    }, { status: 201 });

  } catch (error) {
    console.error('Create assignment error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}

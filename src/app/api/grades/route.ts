import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const createGradeSchema = z.object({
  studentId: z.string(),
  examName: z.string().min(1, 'Exam name is required'),
  subject: z.string().min(1, 'Subject is required'),
  maxMarks: z.number().positive('Max marks must be positive'),
  obtainedMarks: z.number().min(0, 'Obtained marks cannot be negative'),
  grade: z.string().optional(),
  remarks: z.string().optional(),
  examDate: z.string(),
});

// GET - Fetch grades (for students: their own grades, for teachers/admin: all grades)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const subject = searchParams.get('subject');
    const examName = searchParams.get('examName');

    const whereClause: { userId?: string; studentId?: string; subject?: string; examName?: string } = {};

    // If user is a student, only show their grades
    if (authResult.user.role === 'STUDENT') {
      whereClause.userId = authResult.user.userId;
    } else if (studentId) {
      // Teachers/Admin can filter by student
      whereClause.studentId = studentId;
    }

    if (subject) {
      whereClause.subject = subject;
    }

    if (examName) {
      whereClause.examName = examName;
    }

    const grades = await prisma.examResult.findMany({
      where: whereClause,
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        },
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
      },
      orderBy: {
        examDate: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      grades,
    });

  } catch (error) {
    console.error('Get grades error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}

// POST - Create new grade (Teachers and Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['TEACHER', 'ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const validatedData = createGradeSchema.parse(body);

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

    // Calculate grade based on percentage
    const percentage = (validatedData.obtainedMarks / validatedData.maxMarks) * 100;
    let calculatedGrade = validatedData.grade;
    
    if (!calculatedGrade) {
      if (percentage >= 90) calculatedGrade = 'A+';
      else if (percentage >= 80) calculatedGrade = 'A';
      else if (percentage >= 70) calculatedGrade = 'B+';
      else if (percentage >= 60) calculatedGrade = 'B';
      else if (percentage >= 50) calculatedGrade = 'C';
      else if (percentage >= 40) calculatedGrade = 'D';
      else calculatedGrade = 'F';
    }

    const grade = await prisma.examResult.create({
      data: {
        studentId: validatedData.studentId,
        userId: validatedData.studentId, // Assuming studentId is the user ID
        teacherId: teacher?.id || 'admin',
        examName: validatedData.examName,
        subject: validatedData.subject,
        maxMarks: validatedData.maxMarks,
        obtainedMarks: validatedData.obtainedMarks,
        grade: calculatedGrade,
        remarks: validatedData.remarks,
        examDate: new Date(validatedData.examDate),
      },
      include: {
        student: {
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
      message: 'Grade created successfully',
      grade,
    }, { status: 201 });

  } catch (error) {
    console.error('Create grade error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create grade' },
      { status: 500 }
    );
  }
}

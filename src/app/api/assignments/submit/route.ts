import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const submitAssignmentSchema = z.object({
  assignmentId: z.string(),
  content: z.string().min(1, 'Assignment content is required'),
  attachments: z.array(z.string()).optional(),
});

// POST - Submit assignment (Students only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['STUDENT']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const validatedData = submitAssignmentSchema.parse(body);

    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: validatedData.assignmentId }
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if assignment is still open for submission
    const now = new Date();
    if (now > assignment.dueDate) {
      return NextResponse.json(
        { error: 'Assignment submission deadline has passed' },
        { status: 400 }
      );
    }

    // Check if student has already submitted
    const existingSubmission = await prisma.assignmentSubmission.findUnique({
      where: {
        assignmentId_userId: {
          assignmentId: validatedData.assignmentId,
          userId: authResult.user.userId,
        }
      }
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: 'Assignment already submitted. Contact teacher to resubmit.' },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await prisma.assignmentSubmission.create({
      data: {
        assignmentId: validatedData.assignmentId,
        userId: authResult.user.userId,
        content: validatedData.content,
        attachments: JSON.stringify(validatedData.attachments || []),
        submittedAt: new Date(),
        status: 'SUBMITTED',
      },
      include: {
        assignment: {
          select: {
            title: true,
            subject: true,
            maxMarks: true,
          }
        },
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Assignment submitted successfully',
      submission,
    }, { status: 201 });

  } catch (error) {
    console.error('Submit assignment error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit assignment' },
      { status: 500 }
    );
  }
}

// GET - Get assignment submissions (Teachers and Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['TEACHER', 'ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const assignmentId = searchParams.get('assignmentId');

    if (!assignmentId) {
      return NextResponse.json(
        { error: 'Assignment ID is required' },
        { status: 400 }
      );
    }

    // Check if assignment exists and teacher has access
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        teacher: true,
      }
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // If teacher, check if they own this assignment
    if (authResult.user.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({
        where: { userId: authResult.user.userId }
      });

      if (teacher && assignment.teacherId !== teacher.id) {
        return NextResponse.json(
          { error: 'Access denied to this assignment' },
          { status: 403 }
        );
      }
    }

    // Get all submissions for this assignment
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            studentProfile: {
              select: {
                rollNumber: true,
                class: true,
                section: true,
              }
            }
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      assignment: {
        id: assignment.id,
        title: assignment.title,
        subject: assignment.subject,
        class: assignment.class,
        dueDate: assignment.dueDate,
        maxMarks: assignment.maxMarks,
      },
      submissions,
      submissionCount: submissions.length,
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

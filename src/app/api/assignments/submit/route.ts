import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

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
    const { data: assignment } = await supabase
      .from('assignments')
      .select('id, due_date, title, subject, max_marks')
      .eq('id', validatedData.assignmentId)
      .single();

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if assignment is still open for submission
    const now = new Date();
    if (now > new Date(assignment.due_date)) {
      return NextResponse.json(
        { error: 'Assignment submission deadline has passed' },
        { status: 400 }
      );
    }

    // Check if student has already submitted
    const { data: existingSubmission } = await supabase
      .from('assignment_submissions')
      .select('id')
      .eq('assignment_id', validatedData.assignmentId)
      .eq('user_id', authResult.user.userId)
      .single();

    if (existingSubmission) {
      return NextResponse.json(
        { error: 'Assignment already submitted. Contact teacher to resubmit.' },
        { status: 400 }
      );
    }

    // Create submission
    const { data: submission, error } = await supabase
      .from('assignment_submissions')
      .insert({
        assignment_id: validatedData.assignmentId,
        user_id: authResult.user.userId,
        content: validatedData.content,
        attachments: JSON.stringify(validatedData.attachments || []),
        submitted_at: new Date().toISOString(),
        status: 'SUBMITTED',
      })
      .select('*, assignments(title, subject, max_marks), users(name, email)')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to submit assignment' },
        { status: 500 }
      );
    }

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
    const { data: assignment } = await supabase
      .from('assignments')
      .select('id, title, subject, class, due_date, max_marks, teacher_id')
      .eq('id', assignmentId)
      .single();

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // If teacher, check if they own this assignment
    if (authResult.user.role === 'TEACHER') {
      const { data: teacher } = await supabase
        .from('teachers')
        .select('id')
        .eq('user_id', authResult.user.userId)
        .single();

      if (teacher && assignment.teacher_id !== teacher.id) {
        return NextResponse.json(
          { error: 'Access denied to this assignment' },
          { status: 403 }
        );
      }
    }

    // Get all submissions for this assignment
    const { data: submissions, error } = await supabase
      .from('assignment_submissions')
      .select('*, users(name, email, students(roll_number, class, section))')
      .eq('assignment_id', assignmentId)
      .order('submitted_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      assignment: {
        id: assignment.id,
        title: assignment.title,
        subject: assignment.subject,
        class: assignment.class,
        dueDate: assignment.due_date,
        maxMarks: assignment.max_marks,
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

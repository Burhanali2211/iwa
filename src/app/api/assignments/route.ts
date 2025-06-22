import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const createAssignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  subject: z.string().min(1, 'Subject is required'),
  class: z.string().min(1, 'Class is required'),
  due_date: z.string(),
  max_marks: z.number().positive('Max marks must be positive'),
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

    let query = supabase
      .from('assignments')
      .select(`
        *,
        teachers!inner(
          *,
          users!inner(name, email)
        ),
        assignment_submissions(*)
      `);

    // If user is a student, filter by their class and assignments assigned to them
    if (authResult.user.role === 'STUDENT') {
      const { data: student } = await supabase
        .from('students')
        .select('class')
        .eq('user_id', authResult.user.userId)
        .single();
      
      if (student) {
        query = query.eq('class', student.class);
      }
    } else if (authResult.user.role === 'TEACHER') {
      // Teachers can see assignments they created
      const { data: teacher } = await supabase
        .from('teachers')
        .select('id')
        .eq('user_id', authResult.user.userId)
        .single();
      
      if (teacher) {
        query = query.eq('teacher_id', teacher.id);
      }
    }

    // Apply filters
    if (subject) {
      query = query.eq('subject', subject);
    }

    if (classFilter && authResult.user.role !== 'STUDENT') {
      query = query.eq('class', classFilter);
    }

    const { data: assignments, error } = await query.order('due_date', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch assignments' },
        { status: 500 }
      );
    }

    // Add submission status for students
    const assignmentsWithStatus = assignments.map(assignment => {
      if (authResult.user.role === 'STUDENT') {
        const userSubmission = assignment.assignment_submissions.find(
          (sub: { user_id: string }) => sub.user_id === authResult.user.userId
        );
        
        return {
          ...assignment,
          submissionStatus: userSubmission ? 'SUBMITTED' : 'PENDING',
          userSubmission: userSubmission || null,
        };
      }
      
      return {
        ...assignment,
        submissionCount: assignment.assignment_submissions.length,
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
    const { data: teacher } = await supabase
      .from('teachers')
      .select('id')
      .eq('user_id', authResult.user.userId)
      .single();

    if (!teacher && authResult.user.role === 'TEACHER') {
      return NextResponse.json(
        { error: 'Teacher profile not found' },
        { status: 404 }
      );
    }

    const { data: assignment, error } = await supabase
      .from('assignments')
      .insert({
        title: validatedData.title,
        description: validatedData.description,
        subject: validatedData.subject,
        class: validatedData.class,
        due_date: validatedData.due_date,
        max_marks: validatedData.max_marks,
        instructions: validatedData.instructions,
        attachments: JSON.stringify(validatedData.attachments || []),
        teacher_id: teacher?.id || 'admin',
      })
      .select(`
        *,
        teachers!inner(
          *,
          users!inner(name, email)
        )
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create assignment' },
        { status: 500 }
      );
    }

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

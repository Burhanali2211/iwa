import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

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

    let query = supabase
      .from('exam_results')
      .select('*, students(*, users(name, email)), teachers(*, users(name, email))');

    // If user is a student, only show their grades
    if (authResult.user.role === 'STUDENT') {
      query = query.eq('user_id', authResult.user.userId);
    } else if (studentId) {
      // Teachers/Admin can filter by student
      query = query.eq('student_id', studentId);
    }

    if (subject) {
      query = query.eq('subject', subject);
    }

    if (examName) {
      query = query.eq('exam_name', examName);
    }

    const { data: grades, error } = await query.order('exam_date', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch grades' },
        { status: 500 }
      );
    }

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

    const { data: grade, error } = await supabase
      .from('exam_results')
      .insert({
        student_id: validatedData.studentId,
        user_id: validatedData.studentId, // Assuming studentId is the user ID
        teacher_id: teacher?.id || 'admin',
        exam_name: validatedData.examName,
        subject: validatedData.subject,
        max_marks: validatedData.maxMarks,
        obtained_marks: validatedData.obtainedMarks,
        grade: calculatedGrade,
        remarks: validatedData.remarks,
        exam_date: validatedData.examDate,
      })
      .select('*, students(*, users(name, email))')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create grade' },
        { status: 500 }
      );
    }

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

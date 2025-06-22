import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  is_active: z.boolean().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN']).optional(),
  studentProfile: z.object({
    roll_number: z.string().optional(),
    class: z.string().optional(),
    section: z.string().optional(),
    father_name: z.string().optional(),
    mother_name: z.string().optional(),
    guardian_phone: z.string().optional(),
    emergency_contact: z.string().optional(),
    blood_group: z.string().optional(),
    medical_info: z.string().optional(),
  }).optional(),
  teacherProfile: z.object({
    employee_id: z.string().optional(),
    department: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    qualification: z.string().optional(),
    experience: z.number().optional(),
    is_class_teacher: z.boolean().optional(),
    class_assigned: z.string().optional(),
    salary: z.number().optional(),
  }).optional(),
});

// GET - Fetch single user (Admin or own profile)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const userId = (await params).id;

    // Check if user can access this profile
    if (authResult.user.role !== 'ADMIN' && authResult.user.userId !== userId) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*, students(*), teachers(*)')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT - Update user (Admin or own profile)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }
    const bcrypt = require('bcryptjs');

    const userId = params.id;

    // Check if user can update this profile
    if (authResult.user.role !== 'ADMIN' && authResult.user.userId !== userId) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*, students(*), teachers(*)')
      .eq('id', userId)
      .single();

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already taken
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const { data: emailExists } = await supabase
        .from('users')
        .select('id')
        .eq('email', validatedData.email)
        .single();

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare main user update data
    const updateData: any = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.email) updateData.email = validatedData.email;
    if (validatedData.phone) updateData.phone = validatedData.phone;
    if (validatedData.address) updateData.address = validatedData.address;
    if (validatedData.date_of_birth) updateData.date_of_birth = validatedData.date_of_birth;
    if (validatedData.is_active !== undefined) updateData.is_active = validatedData.is_active;
    if (validatedData.role) updateData.role = validatedData.role;

    // Hash password if provided
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Update main user
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    // Update student profile if provided
    if (validatedData.studentProfile && existingUser.students) {
      const { error: studentError } = await supabase
        .from('students')
        .update({
          roll_number: validatedData.studentProfile.roll_number,
          class: validatedData.studentProfile.class,
          section: validatedData.studentProfile.section,
          father_name: validatedData.studentProfile.father_name,
          mother_name: validatedData.studentProfile.mother_name,
          guardian_phone: validatedData.studentProfile.guardian_phone,
          emergency_contact: validatedData.studentProfile.emergency_contact,
          blood_group: validatedData.studentProfile.blood_group,
          medical_info: validatedData.studentProfile.medical_info,
        })
        .eq('user_id', userId);

      if (studentError) {
        console.error('Student profile update error:', studentError);
      }
    }

    // Update teacher profile if provided
    if (validatedData.teacherProfile && existingUser.teachers) {
      const teacherData = { ...validatedData.teacherProfile } as any;
      if (teacherData.subjects) {
        teacherData.subjects = JSON.stringify(teacherData.subjects);
      }

      const { error: teacherError } = await supabase
        .from('teachers')
        .update(teacherData)
        .eq('user_id', userId);

      if (teacherError) {
        console.error('Teacher profile update error:', teacherError);
      }
    }

    // Fetch updated user with profiles
    const { data: finalUser } = await supabase
      .from('users')
      .select('*, students(*), teachers(*)')
      .eq('id', userId)
      .single();

    // Remove password from response
    const { password, ...userWithoutPassword } = finalUser!;

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Update user error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const userId = (await params).id;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user (this will cascade to related records due to foreign key constraints)
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 
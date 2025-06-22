import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth, getUserWithProfile } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  profile_image: z.string().optional(),
  // Student specific fields
  studentProfile: z.object({
    father_name: z.string().optional(),
    mother_name: z.string().optional(),
    guardian_phone: z.string().optional(),
    emergency_contact: z.string().optional(),
    blood_group: z.string().optional(),
    medical_info: z.string().optional(),
  }).optional(),
  // Teacher specific fields
  teacherProfile: z.object({
    department: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    qualification: z.string().optional(),
    experience: z.number().optional(),
    is_class_teacher: z.boolean().optional(),
    class_assigned: z.string().optional(),
  }).optional(),
});

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const user = await getUserWithProfile(authResult.user.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    // Update main user data
    const updateData: any = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.phone) updateData.phone = validatedData.phone;
    if (validatedData.address) updateData.address = validatedData.address;
    if (validatedData.profile_image) updateData.profile_image = validatedData.profile_image;
    if (validatedData.date_of_birth) updateData.date_of_birth = validatedData.date_of_birth;

    const { data: updatedUser, error: userError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', authResult.user.userId)
      .select('*, students(*), teachers(*)')
      .single();

    if (userError) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    // Update role-specific profile
    if (validatedData.studentProfile && updatedUser.students) {
      const { error: studentError } = await supabase
        .from('students')
        .update(validatedData.studentProfile)
        .eq('user_id', authResult.user.userId);

      if (studentError) {
        console.error('Student profile update error:', studentError);
      }
    }

    if (validatedData.teacherProfile && updatedUser.teachers) {
      const teacherData = { ...validatedData.teacherProfile } as any;
      if (teacherData.subjects) {
        teacherData.subjects = JSON.stringify(teacherData.subjects);
      }

      const { error: teacherError } = await supabase
        .from('teachers')
        .update(teacherData)
        .eq('user_id', authResult.user.userId);

      if (teacherError) {
        console.error('Teacher profile update error:', teacherError);
      }
    }

    // Fetch updated user with profiles
    const finalUser = await getUserWithProfile(authResult.user.userId);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: finalUser,
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

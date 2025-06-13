import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth, getUserWithProfile } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  profileImage: z.string().optional(),
  // Student specific fields
  studentProfile: z.object({
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianPhone: z.string().optional(),
    emergencyContact: z.string().optional(),
    bloodGroup: z.string().optional(),
    medicalInfo: z.string().optional(),
  }).optional(),
  // Teacher specific fields
  teacherProfile: z.object({
    department: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    qualification: z.string().optional(),
    experience: z.number().optional(),
    isClassTeacher: z.boolean().optional(),
    classAssigned: z.string().optional(),
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
    const updateData: { name?: string; phone?: string; address?: string; profileImage?: string; dateOfBirth?: Date } = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.phone) updateData.phone = validatedData.phone;
    if (validatedData.address) updateData.address = validatedData.address;
    if (validatedData.profileImage) updateData.profileImage = validatedData.profileImage;
    if (validatedData.dateOfBirth) updateData.dateOfBirth = new Date(validatedData.dateOfBirth);

    const updatedUser = await prisma.user.update({
      where: { id: authResult.user.userId },
      data: updateData,
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    // Update role-specific profile
    if (validatedData.studentProfile && updatedUser.studentProfile) {
      await prisma.student.update({
        where: { userId: authResult.user.userId },
        data: validatedData.studentProfile,
      });
    }

    if (validatedData.teacherProfile && updatedUser.teacherProfile) {
      const teacherData = { ...validatedData.teacherProfile } as { subjects?: string[] | string; [key: string]: unknown };
      if (teacherData.subjects) {
        teacherData.subjects = JSON.stringify(teacherData.subjects);
      }

      await prisma.teacher.update({
        where: { userId: authResult.user.userId },
        data: teacherData,
      });
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

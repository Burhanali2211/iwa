import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  studentProfile: z.object({
    rollNumber: z.string().optional(),
    class: z.string().optional(),
    section: z.string().optional(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianPhone: z.string().optional(),
    emergencyContact: z.string().optional(),
    bloodGroup: z.string().optional(),
    medicalInfo: z.string().optional(),
  }).optional(),
  teacherProfile: z.object({
    employeeId: z.string().optional(),
    department: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    qualification: z.string().optional(),
    experience: z.number().optional(),
    isClassTeacher: z.boolean().optional(),
    classAssigned: z.string().optional(),
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!user) {
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const userId = (await params).id;

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
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already taken
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    // Update user with transaction
    await prisma.$transaction(async (tx) => {
      // Prepare main user update data
      const updateData: { name?: string; email?: string; phone?: string; address?: string; dateOfBirth?: Date; isActive?: boolean; password?: string } = {};
      if (validatedData.name) updateData.name = validatedData.name;
      if (validatedData.email) updateData.email = validatedData.email;
      if (validatedData.phone) updateData.phone = validatedData.phone;
      if (validatedData.address) updateData.address = validatedData.address;
      if (validatedData.dateOfBirth) updateData.dateOfBirth = new Date(validatedData.dateOfBirth);
      if (validatedData.isActive !== undefined) updateData.isActive = validatedData.isActive;

      // Hash password if provided
      if (validatedData.password) {
        updateData.password = await bcrypt.hash(validatedData.password, 12);
      }

      // Update main user
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: updateData,
      });

      // Update student profile if provided
      if (validatedData.studentProfile && existingUser.studentProfile) {
        await tx.student.update({
          where: { userId: userId },
          data: {
            rollNumber: validatedData.studentProfile.rollNumber,
            class: validatedData.studentProfile.class,
            section: validatedData.studentProfile.section,
            fatherName: validatedData.studentProfile.fatherName,
            motherName: validatedData.studentProfile.motherName,
            guardianPhone: validatedData.studentProfile.guardianPhone,
            emergencyContact: validatedData.studentProfile.emergencyContact,
            bloodGroup: validatedData.studentProfile.bloodGroup,
            medicalInfo: validatedData.studentProfile.medicalInfo,
          },
        });
      }

      // Update teacher profile if provided
      if (validatedData.teacherProfile && existingUser.teacherProfile) {
        await tx.teacher.update({
          where: { userId: userId },
          data: {
            employeeId: validatedData.teacherProfile.employeeId,
            department: validatedData.teacherProfile.department,
            subjects: JSON.stringify(validatedData.teacherProfile.subjects || []),
            qualification: validatedData.teacherProfile.qualification,
            experience: validatedData.teacherProfile.experience,
            isClassTeacher: validatedData.teacherProfile.isClassTeacher,
            classAssigned: validatedData.teacherProfile.classAssigned,
            salary: validatedData.teacherProfile.salary,
          },
        });
      }

      return updatedUser;
    });

    // Fetch updated user data
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser!;

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
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent admin from deleting themselves
    if (authResult.user.userId === userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId }
    });

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

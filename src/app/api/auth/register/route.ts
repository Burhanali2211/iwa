import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'PARENT']).default('STUDENT'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        phone: validatedData.phone,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    });

    // Create role-specific profile
    if (validatedData.role === 'STUDENT') {
      await prisma.student.create({
        data: {
          userId: user.id,
          rollNumber: `STU${Date.now()}`, // Generate unique roll number
          class: 'Unassigned',
          fatherName: 'To be updated',
          guardianPhone: validatedData.phone || 'To be updated',
        }
      });
    } else if (validatedData.role === 'TEACHER') {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          employeeId: `EMP${Date.now()}`, // Generate unique employee ID
          department: 'To be assigned',
          subjects: JSON.stringify([]),
          qualification: 'To be updated',
          experience: 0,
        }
      });
    }

    return NextResponse.json({
      message: 'User registered successfully',
      user
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

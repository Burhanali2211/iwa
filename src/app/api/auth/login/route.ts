import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // In development mode, bypass database check and return a mock user
    if (process.env.NODE_ENV === 'development') {
      const mockUser = {
        id: 'dev-user-id',
        name: 'Development User',
        email: validatedData.email,
        role: 'ADMIN',
        phone: '1234567890',
        profileImage: '',
        isActive: true,
        studentProfile: null,
        teacherProfile: null,
      };

      const token = jwt.sign(
        {
          userId: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
        },
        process.env.NEXTAUTH_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      const response = NextResponse.json({
        message: 'Login successful',
        user: mockUser,
        token,
      });

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      return response;
    }

    // For production, continue with normal database check
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        studentProfile: true,
        teacherProfile: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated. Please contact administration.' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.NEXTAUTH_SECRET || 'fallback-secret-key-for-development';
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Prepare user data for response
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profileImage: user.profileImage,
      studentId: user.studentId,
      teacherId: user.teacherId,
      studentProfile: user.studentProfile,
      teacherProfile: user.teacherProfile,
    };

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: userData,
      token, // Also send token in response for client-side storage if needed
    });

    // Set httpOnly cookie for security
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    
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

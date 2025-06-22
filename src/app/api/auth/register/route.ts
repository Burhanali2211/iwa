import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = 'STUDENT', phone, dateOfBirth } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['STUDENT', 'TEACHER', 'PARENT'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in our users table
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: email,
          password: hashedPassword,
          name: name,
          role: role,
          phone: phone || null,
          date_of_birth: dateOfBirth || null,
          is_active: true,
        }
      ])
      .select()
      .single();

    if (userError) {
      console.error('User creation error:', userError);
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        profile_image: user.profile_image,
      },
      token,
      message: 'Registration successful',
    });

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
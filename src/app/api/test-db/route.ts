import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const { data: users, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      usersCount: users?.length || 0
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'create-test-user') {
      // Create a test user
      const hashedPassword = await bcrypt.hash('test123', 12);
      
      const { data: user, error } = await supabase
        .from('users')
        .insert([
          {
            email: 'test@example.com',
            password: hashedPassword,
            name: 'Test User',
            role: 'STUDENT',
            is_active: true,
          }
        ])
        .select()
        .single();

      if (error) {
        return NextResponse.json({
          status: 'error',
          message: 'Failed to create test user',
          error: error.message
        }, { status: 500 });
      }

      return NextResponse.json({
        status: 'success',
        message: 'Test user created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    }

    return NextResponse.json({
      status: 'error',
      message: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
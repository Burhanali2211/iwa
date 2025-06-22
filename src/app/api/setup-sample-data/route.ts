import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Check if admin user already exists
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'admin@islamic.com')
      .single();

    if (existingAdmin) {
      return NextResponse.json({
        status: 'warning',
        message: 'Admin user already exists',
        adminEmail: 'admin@islamic.com',
        adminPassword: 'admin123'
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .insert([
        {
          email: 'admin@islamic.com',
          password: hashedPassword,
          name: 'System Administrator',
          role: 'ADMIN',
          is_active: true,
        }
      ])
      .select()
      .single();

    if (adminError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to create admin user',
        error: adminError.message
      }, { status: 500 });
    }

    // Create sample teacher
    const teacherPassword = await bcrypt.hash('teacher123', 12);
    const { data: teacherUser, error: teacherError } = await supabase
      .from('users')
      .insert([
        {
          email: 'teacher@islamic.com',
          password: teacherPassword,
          name: 'Ustadh Ahmad',
          role: 'TEACHER',
          is_active: true,
        }
      ])
      .select()
      .single();

    // Create sample student
    const studentPassword = await bcrypt.hash('student123', 12);
    const { data: studentUser, error: studentError } = await supabase
      .from('users')
      .insert([
        {
          email: 'student@islamic.com',
          password: studentPassword,
          name: 'Ahmed Ali',
          role: 'STUDENT',
          is_active: true,
        }
      ])
      .select()
      .single();

    return NextResponse.json({
      status: 'success',
      message: 'Sample data created successfully',
      users: {
        admin: {
          email: 'admin@islamic.com',
          password: 'admin123',
          role: 'ADMIN'
        },
        teacher: {
          email: 'teacher@islamic.com',
          password: 'teacher123',
          role: 'TEACHER'
        },
        student: {
          email: 'student@islamic.com',
          password: 'student123',
          role: 'STUDENT'
        }
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Setup failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
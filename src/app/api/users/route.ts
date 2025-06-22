import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN']),
  phone: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
  // Student specific fields
  studentProfile: z.object({
    roll_number: z.string().optional(),
    class: z.string(),
    section: z.string().optional(),
    father_name: z.string(),
    mother_name: z.string().optional(),
    guardian_phone: z.string(),
    emergency_contact: z.string().optional(),
    blood_group: z.string().optional(),
    medical_info: z.string().optional(),
  }).optional(),
  // Teacher specific fields
  teacherProfile: z.object({
    employee_id: z.string().optional(),
    department: z.string(),
    subjects: z.array(z.string()),
    qualification: z.string(),
    experience: z.number().min(0),
    is_class_teacher: z.boolean().optional(),
    class_assigned: z.string().optional(),
    salary: z.number().optional(),
  }).optional(),
});

// GET - Fetch all users (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('users')
      .select('*, students(*), teachers(*)');

    let countQuery = supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (role && role !== 'ALL') {
      query = query.eq('role', role);
      countQuery = countQuery.eq('role', role);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      countQuery = countQuery.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Get total count for pagination
    const { count: totalCount, error: countError } = await countQuery;
    const count = countError ? 0 : (totalCount || 0);

    const { data: users, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    // Remove password from response and transform data structure
    const sanitizedUsers = users.map(({ password, students, teachers, ...userWithoutPassword }) => {
      const transformedUser = {
        ...userWithoutPassword,
        studentProfile: students || null,
        teacherProfile: teachers || null,
      };
      
      return transformedUser;
    });

    return NextResponse.json({
      success: true,
      users: sanitizedUsers,
      pagination: {
        page,
        limit,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
      },
    });

  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }
    const bcrypt = require('bcryptjs');

    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create main user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        phone: validatedData.phone,
        address: validatedData.address,
        date_of_birth: validatedData.date_of_birth,
        is_active: true,
      })
      .select()
      .single();

    if (userError) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create role-specific profile
    if (validatedData.role === 'STUDENT' && validatedData.studentProfile) {
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          user_id: user.id,
          roll_number: validatedData.studentProfile.roll_number || `STU${Date.now()}`,
          class: validatedData.studentProfile.class,
          section: validatedData.studentProfile.section,
          father_name: validatedData.studentProfile.father_name,
          mother_name: validatedData.studentProfile.mother_name,
          guardian_phone: validatedData.studentProfile.guardian_phone,
          emergency_contact: validatedData.studentProfile.emergency_contact,
          blood_group: validatedData.studentProfile.blood_group,
          medical_info: validatedData.studentProfile.medical_info,
        });

      if (studentError) {
        console.error('Student profile creation error:', studentError);
      }
    } else if (validatedData.role === 'TEACHER' && validatedData.teacherProfile) {
      const { error: teacherError } = await supabase
        .from('teachers')
        .insert({
          user_id: user.id,
          employee_id: validatedData.teacherProfile.employee_id || `EMP${Date.now()}`,
          department: validatedData.teacherProfile.department,
          subjects: JSON.stringify(validatedData.teacherProfile.subjects || []),
          qualification: validatedData.teacherProfile.qualification,
          experience: validatedData.teacherProfile.experience,
          is_class_teacher: validatedData.teacherProfile.is_class_teacher || false,
          class_assigned: validatedData.teacherProfile.class_assigned,
          salary: validatedData.teacherProfile.salary,
        });

      if (teacherError) {
        console.error('Teacher profile creation error:', teacherError);
      }
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword,
    }, { status: 201 });

  } catch (error) {
    console.error('Create user error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN']),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  // Student specific fields
  studentProfile: z.object({
    rollNumber: z.string().optional(),
    class: z.string(),
    section: z.string().optional(),
    fatherName: z.string(),
    motherName: z.string().optional(),
    guardianPhone: z.string(),
    emergencyContact: z.string().optional(),
    bloodGroup: z.string().optional(),
    medicalInfo: z.string().optional(),
  }).optional(),
  // Teacher specific fields
  teacherProfile: z.object({
    employeeId: z.string().optional(),
    department: z.string(),
    subjects: z.array(z.string()),
    qualification: z.string(),
    experience: z.number().min(0),
    isClassTeacher: z.boolean().optional(),
    classAssigned: z.string().optional(),
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
    const skip = (page - 1) * limit;

    const whereClause: { role?: string; OR?: Array<{ name?: { contains: string; mode: string }; email?: { contains: string; mode: string } }> } = {};

    if (role && role !== 'ALL') {
      whereClause.role = role;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          studentProfile: true,
          teacherProfile: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    // Remove password from response
    const sanitizedUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

    return NextResponse.json({
      success: true,
      users: sanitizedUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
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

    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

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

    // Create user with transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create main user
      const user = await tx.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
          role: validatedData.role,
          phone: validatedData.phone,
          address: validatedData.address,
          dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        },
      });

      // Create role-specific profile
      if (validatedData.role === 'STUDENT' && validatedData.studentProfile) {
        await tx.student.create({
          data: {
            userId: user.id,
            rollNumber: validatedData.studentProfile.rollNumber || `STU${Date.now()}`,
            class: validatedData.studentProfile.class,
            section: validatedData.studentProfile.section,
            fatherName: validatedData.studentProfile.fatherName,
            motherName: validatedData.studentProfile.motherName,
            guardianPhone: validatedData.studentProfile.guardianPhone,
            emergencyContact: validatedData.studentProfile.emergencyContact,
            bloodGroup: validatedData.studentProfile.bloodGroup,
            medicalInfo: validatedData.studentProfile.medicalInfo,
          }
        });
      } else if (validatedData.role === 'TEACHER' && validatedData.teacherProfile) {
        await tx.teacher.create({
          data: {
            userId: user.id,
            employeeId: validatedData.teacherProfile.employeeId || `EMP${Date.now()}`,
            department: validatedData.teacherProfile.department,
            subjects: JSON.stringify(validatedData.teacherProfile.subjects || []),
            qualification: validatedData.teacherProfile.qualification,
            experience: validatedData.teacherProfile.experience,
            isClassTeacher: validatedData.teacherProfile.isClassTeacher || false,
            classAssigned: validatedData.teacherProfile.classAssigned,
            salary: validatedData.teacherProfile.salary,
          }
        });
      }

      return user;
    });

    // Fetch complete user data
    const newUser = await prisma.user.findUnique({
      where: { id: result.id },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser!;

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

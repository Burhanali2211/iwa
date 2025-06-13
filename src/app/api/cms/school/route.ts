import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schemas
const schoolContentSchema = z.object({
  type: z.enum(['course', 'announcement', 'faculty', 'timetable', 'assignment']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).default('draft'),
  metadata: z.record(z.any()).optional(),
});

// GET /api/cms/school - Get all school content
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN', 'TEACHER']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: { category?: string; isPublished?: boolean } = {};
    if (type) where.category = type;
    if (status) where.isPublished = status === 'published';

    // For now, return mock data since we don't have a specific school content table
    // In a real implementation, you would create a SchoolContent model
    const mockContent = [
      {
        id: '1',
        type: 'course',
        title: 'Quran Memorization - Level 1',
        description: 'Basic Quran memorization course for beginners',
        content: 'Comprehensive course covering the fundamentals of Quran memorization...',
        status: 'published',
        author: 'Ustadh Ahmad',
        createdAt: '2024-01-18T10:30:00Z',
        updatedAt: '2024-01-18T10:30:00Z',
        metadata: {
          duration: '6 months',
          level: 'beginner',
          prerequisites: 'Basic Arabic reading'
        }
      },
      {
        id: '2',
        type: 'course',
        title: 'Islamic History',
        description: 'Comprehensive study of Islamic civilization',
        content: 'Detailed exploration of Islamic history from the time of Prophet Muhammad...',
        status: 'published',
        author: 'Dr. Fatima',
        createdAt: '2024-01-17T15:20:00Z',
        updatedAt: '2024-01-17T15:20:00Z',
        metadata: {
          duration: '4 months',
          level: 'intermediate',
          prerequisites: 'Basic Islamic knowledge'
        }
      },
      {
        id: '3',
        type: 'announcement',
        title: 'Ramadan Schedule Update',
        description: 'Updated class timings for the holy month',
        content: 'Dear students and parents, please note the updated schedule...',
        status: 'published',
        author: 'Admin',
        createdAt: '2024-01-16T09:15:00Z',
        updatedAt: '2024-01-16T09:15:00Z',
        metadata: {
          priority: 'high',
          expiryDate: '2024-05-01'
        }
      },
      {
        id: '4',
        type: 'faculty',
        title: 'New Arabic Teacher',
        description: 'Welcome Ustadh Hassan to our faculty',
        content: 'We are pleased to announce that Ustadh Hassan has joined our faculty...',
        status: 'published',
        author: 'Principal',
        createdAt: '2024-01-15T14:45:00Z',
        updatedAt: '2024-01-15T14:45:00Z',
        metadata: {
          department: 'Arabic Language',
          qualifications: 'MA in Arabic Literature'
        }
      },
      {
        id: '5',
        type: 'assignment',
        title: 'Hadith Study Assignment',
        description: 'Weekly hadith analysis and reflection',
        content: 'Students are required to analyze and reflect on the assigned hadith...',
        status: 'draft',
        author: 'Ustadh Omar',
        createdAt: '2024-01-14T11:30:00Z',
        updatedAt: '2024-01-14T11:30:00Z',
        metadata: {
          dueDate: '2024-01-21',
          subject: 'Hadith Studies',
          grade: 'Grade 8'
        }
      }
    ];

    // Filter mock data based on query parameters
    let filteredContent = mockContent;
    if (type) {
      filteredContent = filteredContent.filter(item => item.type === type);
    }
    if (status) {
      filteredContent = filteredContent.filter(item => item.status === status);
    }

    // Apply pagination
    const paginatedContent = filteredContent.slice(offset, offset + limit);

    // Get statistics
    const stats = {
      totalCourses: mockContent.filter(item => item.type === 'course').length,
      activeFaculty: 15, // This would come from User table with role TEACHER
      totalStudents: 245, // This would come from User table with role STUDENT
      pendingAssignments: mockContent.filter(item => item.type === 'assignment' && item.status === 'draft').length,
      upcomingExams: 3, // This would come from a separate exams table
      recentAnnouncements: mockContent.filter(item => item.type === 'announcement').length
    };

    return NextResponse.json({
      success: true,
      data: {
        content: paginatedContent,
        stats,
        pagination: {
          total: filteredContent.length,
          limit,
          offset,
          hasMore: offset + limit < filteredContent.length
        }
      }
    });

  } catch (error) {
    console.error('Get school content error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch school content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/school - Create new school content
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN', 'TEACHER']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const validatedData = schoolContentSchema.parse(body);

    // In a real implementation, you would save to database
    const newContent = {
      id: Date.now().toString(),
      ...validatedData,
      author: authResult.user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'School content created successfully',
      data: newContent
    }, { status: 201 });

  } catch (error) {
    console.error('Create school content error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create school content' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/school - Update school content
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN', 'TEACHER']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const validatedData = schoolContentSchema.partial().parse(updateData);

    // In a real implementation, you would update in database
    const updatedContent = {
      id,
      ...validatedData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'School content updated successfully',
      data: updatedContent
    });

  } catch (error) {
    console.error('Update school content error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update school content' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/school - Delete school content
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would delete from database
    // await prisma.schoolContent.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'School content deleted successfully'
    });

  } catch (error) {
    console.error('Delete school content error:', error);
    return NextResponse.json(
      { error: 'Failed to delete school content' },
      { status: 500 }
    );
  }
}

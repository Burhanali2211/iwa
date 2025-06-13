'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for religious content updates
const updateReligiousContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  content: z.string().min(10, 'Content must be at least 10 characters').optional(),
  type: z.enum(['article', 'prayer', 'quran', 'khutba', 'dua']).optional(),
  author: z.string().min(1, 'Author is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  featuredImage: z.string().url().optional(),
  arabicText: z.string().optional(),
  translation: z.string().optional(),
  reference: z.string().optional(),
});

// GET /api/cms/religious/[id] - Fetch single religious content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { id } = await params;

    // Mock data - replace with actual database query
    const mockContent = {
      id: '1',
      title: 'The Importance of Daily Prayer',
      content: 'Prayer (Salah) is one of the five pillars of Islam and holds immense significance in the life of a Muslim. It serves as a direct connection between the believer and Allah, providing spiritual nourishment and guidance throughout the day.\n\nThe five daily prayers are:\n1. Fajr (Dawn Prayer)\n2. Dhuhr (Midday Prayer)\n3. Asr (Afternoon Prayer)\n4. Maghrib (Sunset Prayer)\n5. Isha (Night Prayer)\n\nEach prayer has its own significance and benefits, both spiritual and physical. Regular prayer helps maintain discipline, mindfulness, and connection with the divine.',
      type: 'article',
      author: 'Imam Abdullah',
      category: 'Worship',
      tags: ['prayer', 'salah', 'worship', 'pillars'],
      isPublished: true,
      isFeatured: true,
      excerpt: 'Understanding the spiritual and practical importance of the five daily prayers in Islam.',
      featuredImage: '/images/prayer.jpg',
      arabicText: '',
      translation: '',
      reference: 'Quran and Sunnah',
      views: 1250,
      likes: 89,
      publishedAt: '2024-01-15T10:00:00Z',
      createdAt: '2024-01-10T08:00:00Z',
      lastModified: '2024-01-15T10:00:00Z'
    };

    if (id !== '1') {
      return NextResponse.json(
        { success: false, error: 'Religious content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockContent
    });

  } catch (error) {
    console.error('Get religious content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch religious content' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/religious/[id] - Update religious content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { id } = await params;
    const body = await request.json();

    // Validate the request body
    const validationResult = updateReligiousContentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Here you would update in the database
    const updatedContent = {
      id,
      ...validatedData,
      lastModified: new Date().toISOString(),
      publishedAt: validatedData.isPublished ? new Date().toISOString() : null
    };

    return NextResponse.json({
      success: true,
      message: 'Religious content updated successfully',
      data: updatedContent
    });

  } catch (error) {
    console.error('Update religious content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update religious content' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/religious/[id] - Delete religious content
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    // Here you would delete from the database
    // For now, just simulate the deletion
    // const { id } = await params;

    return NextResponse.json({
      success: true,
      message: 'Religious content deleted successfully'
    });

  } catch (error) {
    console.error('Delete religious content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete religious content' },
      { status: 500 }
    );
  }
}

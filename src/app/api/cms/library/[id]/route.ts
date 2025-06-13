'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for library content updates
const updateLibraryContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  author: z.string().min(1, 'Author is required').optional(),
  isbn: z.string().optional(),
  category: z.string().min(1, 'Category is required').optional(),
  language: z.string().min(1, 'Language is required').optional(),
  description: z.string().optional(),
  publisher: z.string().optional(),
  publishedYear: z.number().optional(),
  pages: z.number().optional(),
  type: z.enum(['physical', 'digital', 'both']).optional(),
  status: z.enum(['available', 'borrowed', 'reserved', 'maintenance']).optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  coverImage: z.string().url().optional(),
  digitalUrl: z.string().url().optional(),
  location: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  totalCopies: z.number().min(0).optional(),
});

// GET /api/cms/library/[id] - Fetch single book
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
    const mockBook = {
      id: '1',
      title: 'Tafsir Ibn Kathir',
      author: 'Ibn Kathir',
      isbn: '978-1234567890',
      category: 'Tafsir',
      language: 'Arabic',
      description: 'Comprehensive commentary on the Quran by the renowned Islamic scholar Ibn Kathir. This multi-volume work provides detailed explanations of Quranic verses, drawing from authentic Hadith and the understanding of the early Muslim scholars.',
      publisher: 'Dar Al-Kutub Al-Ilmiyyah',
      publishedYear: 1365,
      pages: 4000,
      type: 'both',
      status: 'available',
      tags: ['quran', 'tafsir', 'commentary', 'classical'],
      isPublished: true,
      isFeatured: true,
      coverImage: '/images/books/tafsir-ibn-kathir.jpg',
      digitalUrl: '/library/digital/tafsir-ibn-kathir.pdf',
      location: 'Section A, Shelf 1',
      rating: 4.9,
      totalCopies: 5,
      availableCopies: 3,
      borrowedCount: 156,
      createdAt: '2024-01-10T08:00:00Z',
      lastModified: '2024-01-15T10:00:00Z'
    };

    if (id !== '1') {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockBook
    });

  } catch (error) {
    console.error('Get book error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/library/[id] - Update book
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
    const validationResult = updateLibraryContentSchema.safeParse(body);
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
    const updatedBook = {
      id,
      ...validatedData,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });

  } catch (error) {
    console.error('Update book error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/library/[id] - Delete book
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
      message: 'Book deleted successfully'
    });

  } catch (error) {
    console.error('Delete book error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}

'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for library content
const libraryContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  language: z.string().min(1, 'Language is required'),
  description: z.string().optional(),
  publisher: z.string().optional(),
  publishedYear: z.number().optional(),
  pages: z.number().optional(),
  type: z.enum(['physical', 'digital', 'both']),
  status: z.enum(['available', 'borrowed', 'reserved', 'maintenance']).default('available'),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
  coverImage: z.string().url().optional(),
  digitalUrl: z.string().url().optional(),
  location: z.string().optional(), // For physical books
  rating: z.number().min(0).max(5).optional(),
});

// GET /api/cms/library - Fetch all library content
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const language = searchParams.get('language') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Mock data for now - replace with actual database queries
    const mockBooks = [
      {
        id: '1',
        title: 'Tafsir Ibn Kathir',
        author: 'Ibn Kathir',
        isbn: '978-1234567890',
        category: 'Tafsir',
        language: 'Arabic',
        description: 'Comprehensive commentary on the Quran by the renowned Islamic scholar Ibn Kathir.',
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
      },
      {
        id: '2',
        title: 'Sahih Al-Bukhari',
        author: 'Imam Al-Bukhari',
        isbn: '978-0987654321',
        category: 'Hadith',
        language: 'Arabic',
        description: 'The most authentic collection of Hadith compiled by Imam Al-Bukhari.',
        publisher: 'Dar Al-Salam',
        publishedYear: 846,
        pages: 2400,
        type: 'physical',
        status: 'available',
        tags: ['hadith', 'sunnah', 'authentic', 'classical'],
        isPublished: true,
        isFeatured: true,
        coverImage: '/images/books/sahih-bukhari.jpg',
        location: 'Section B, Shelf 2',
        rating: 5.0,
        totalCopies: 8,
        availableCopies: 6,
        borrowedCount: 234,
        createdAt: '2024-01-08T14:00:00Z',
        lastModified: '2024-01-12T16:30:00Z'
      },
      {
        id: '3',
        title: 'The Sealed Nectar',
        author: 'Safi-ur-Rahman al-Mubarakpuri',
        isbn: '978-1122334455',
        category: 'Biography',
        language: 'English',
        description: 'Biography of Prophet Muhammad (PBUH) - Winner of the World Muslim League Prize.',
        publisher: 'Darussalam',
        publishedYear: 1979,
        pages: 635,
        type: 'both',
        status: 'available',
        tags: ['biography', 'prophet', 'seerah', 'english'],
        isPublished: true,
        isFeatured: false,
        coverImage: '/images/books/sealed-nectar.jpg',
        digitalUrl: '/library/digital/sealed-nectar.pdf',
        location: 'Section C, Shelf 1',
        rating: 4.8,
        totalCopies: 12,
        availableCopies: 9,
        borrowedCount: 89,
        createdAt: '2024-01-05T10:00:00Z',
        lastModified: '2024-01-10T12:00:00Z'
      },
      {
        id: '4',
        title: 'Fiqh Us-Sunnah',
        author: 'Sayyid Sabiq',
        isbn: '978-5566778899',
        category: 'Fiqh',
        language: 'Arabic',
        description: 'Comprehensive guide to Islamic jurisprudence based on Quran and Sunnah.',
        publisher: 'Dar Al-Kitab Al-Arabi',
        publishedYear: 1946,
        pages: 1200,
        type: 'physical',
        status: 'borrowed',
        tags: ['fiqh', 'jurisprudence', 'islamic law', 'practical'],
        isPublished: true,
        isFeatured: false,
        coverImage: '/images/books/fiqh-sunnah.jpg',
        location: 'Section D, Shelf 3',
        rating: 4.7,
        totalCopies: 6,
        availableCopies: 0,
        borrowedCount: 67,
        createdAt: '2024-01-03T09:00:00Z',
        lastModified: '2024-01-18T11:15:00Z'
      }
    ];

    // Apply filters
    let filteredBooks = mockBooks;

    if (search) {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }

    if (language) {
      filteredBooks = filteredBooks.filter(book => book.language === language);
    }

    if (type) {
      filteredBooks = filteredBooks.filter(book => book.type === type);
    }

    if (status) {
      filteredBooks = filteredBooks.filter(book => book.status === status);
    }

    // Apply sorting
    filteredBooks.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const totalCount = filteredBooks.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    // Calculate statistics
    const stats = {
      totalBooks: mockBooks.length,
      availableBooks: mockBooks.filter(book => book.status === 'available').length,
      borrowedBooks: mockBooks.filter(book => book.status === 'borrowed').length,
      digitalBooks: mockBooks.filter(book => book.type === 'digital' || book.type === 'both').length,
      physicalBooks: mockBooks.filter(book => book.type === 'physical' || book.type === 'both').length,
      featuredBooks: mockBooks.filter(book => book.isFeatured).length,
      totalBorrows: mockBooks.reduce((sum, book) => sum + book.borrowedCount, 0),
      averageRating: mockBooks.reduce((sum, book) => sum + (book.rating || 0), 0) / mockBooks.length
    };

    return NextResponse.json({
      success: true,
      data: paginatedBooks,
      stats,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get library content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch library content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/library - Create new library content
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = libraryContentSchema.safeParse(body);
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

    // Here you would create in the database
    const newBook = {
      id: Date.now().toString(),
      ...validatedData,
      totalCopies: 1,
      availableCopies: validatedData.status === 'available' ? 1 : 0,
      borrowedCount: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Book added to library successfully',
      data: newBook
    }, { status: 201 });

  } catch (error) {
    console.error('Create library content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add book to library' },
      { status: 500 }
    );
  }
}

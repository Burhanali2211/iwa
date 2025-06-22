'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

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

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase.from('library_content').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (language) {
      query = query.eq('language', language);
    }
    
    if (type) {
        query = query.eq('type', type);
    }

    if (status) {
        query = query.eq('status', status);
    }

    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(from, to);

    const { data: books, error, count } = await query;

    if (error) {
        console.error('Error fetching library content:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch library content' }, { status: 500 });
    }
    
    // Calculate statistics
    const { data: allBooks, error: allBooksError } = await supabase.from('library_content').select('status, type, is_featured, borrowed_count, rating');
    
    if(allBooksError) {
        console.error('Error fetching all books for stats:', allBooksError);
    }

    const stats = {
        totalBooks: allBooks?.length || 0,
        availableBooks: allBooks?.filter(book => book.status === 'available').length || 0,
        borrowedBooks: allBooks?.filter(book => book.status === 'borrowed').length || 0,
        digitalBooks: allBooks?.filter(book => book.type === 'digital' || book.type === 'both').length || 0,
        physicalBooks: allBooks?.filter(book => book.type === 'physical' || book.type === 'both').length || 0,
        featuredBooks: allBooks?.filter(book => book.is_featured).length || 0,
        totalBorrows: allBooks?.reduce((sum, book) => sum + (book.borrowed_count || 0), 0) || 0,
        averageRating: (allBooks?.reduce((sum, book) => sum + (book.rating || 0), 0) || 0) / (allBooks?.length || 1)
    };
    
    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: books,
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

    // Insert into database
    const { data: newBook, error } = await supabase
      .from('library_content')
      .insert({
        title: validatedData.title,
        author: validatedData.author,
        isbn: validatedData.isbn,
        category: validatedData.category,
        language: validatedData.language,
        description: validatedData.description,
        publisher: validatedData.publisher,
        published_year: validatedData.publishedYear,
        pages: validatedData.pages,
        type: validatedData.type,
        status: validatedData.status,
        tags: JSON.stringify(validatedData.tags || []),
        is_published: validatedData.isPublished,
        is_featured: validatedData.isFeatured,
        cover_image: validatedData.coverImage,
        digital_url: validatedData.digitalUrl,
        location: validatedData.location,
        rating: validatedData.rating || 0,
        total_copies: 1,
        available_copies: validatedData.status === 'available' ? 1 : 0,
        borrowed_count: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to add book to library' },
        { status: 500 }
      );
    }

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

'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for religious content
const religiousContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  type: z.enum(['article', 'prayer', 'quran', 'khutba', 'dua']),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  featuredImage: z.string().url().optional(),
  arabicText: z.string().optional(),
  translation: z.string().optional(),
  reference: z.string().optional(),
});

// GET /api/cms/religious - Fetch all religious content
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
    const type = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'lastModified';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Mock data for now - replace with actual database queries
    const mockContent = [
      {
        id: '1',
        title: 'The Importance of Daily Prayer',
        content: 'Prayer (Salah) is one of the five pillars of Islam and holds immense significance in the life of a Muslim...',
        type: 'article',
        author: 'Imam Abdullah',
        category: 'Worship',
        tags: ['prayer', 'salah', 'worship', 'pillars'],
        isPublished: true,
        isFeatured: true,
        excerpt: 'Understanding the spiritual and practical importance of the five daily prayers in Islam.',
        featuredImage: '/images/prayer.jpg',
        views: 1250,
        likes: 89,
        publishedAt: '2024-01-15T10:00:00Z',
        createdAt: '2024-01-10T08:00:00Z',
        lastModified: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Dua for Morning Protection',
        content: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
        type: 'dua',
        author: 'Islamic Center',
        category: 'Daily Duas',
        tags: ['dua', 'morning', 'protection', 'daily'],
        isPublished: true,
        isFeatured: false,
        excerpt: 'A powerful morning dua for protection and blessings throughout the day.',
        arabicText: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
        translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
        reference: 'Sahih Bukhari',
        views: 890,
        likes: 156,
        publishedAt: '2024-01-12T06:00:00Z',
        createdAt: '2024-01-12T06:00:00Z',
        lastModified: '2024-01-12T06:00:00Z'
      },
      {
        id: '3',
        title: 'Understanding Surah Al-Fatiha',
        content: 'Surah Al-Fatiha, the opening chapter of the Quran, is recited in every unit of prayer...',
        type: 'quran',
        author: 'Dr. Sarah Ahmed',
        category: 'Quran Study',
        tags: ['quran', 'fatiha', 'prayer', 'recitation'],
        isPublished: true,
        isFeatured: true,
        excerpt: 'A detailed explanation of the meanings and significance of Surah Al-Fatiha.',
        featuredImage: '/images/quran.jpg',
        arabicText: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
        reference: 'Quran 1:1-7',
        views: 2100,
        likes: 234,
        publishedAt: '2024-01-08T14:00:00Z',
        createdAt: '2024-01-05T10:00:00Z',
        lastModified: '2024-01-08T14:00:00Z'
      }
    ];

    // Apply filters
    let filteredContent = mockContent;

    if (search) {
      filteredContent = filteredContent.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filteredContent = filteredContent.filter(item => item.type === type);
    }

    if (category) {
      filteredContent = filteredContent.filter(item => item.category === category);
    }

    if (status) {
      if (status === 'published') {
        filteredContent = filteredContent.filter(item => item.isPublished);
      } else if (status === 'draft') {
        filteredContent = filteredContent.filter(item => !item.isPublished);
      }
    }

    // Apply sorting
    filteredContent.sort((a, b) => {
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
    const totalCount = filteredContent.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContent = filteredContent.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedContent,
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
    console.error('Get religious content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch religious content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/religious - Create new religious content
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = religiousContentSchema.safeParse(body);
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
    const newContent = {
      id: Date.now().toString(),
      ...validatedData,
      views: 0,
      likes: 0,
      publishedAt: validatedData.isPublished ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Religious content created successfully',
      data: newContent
    }, { status: 201 });

  } catch (error) {
    console.error('Create religious content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create religious content' },
      { status: 500 }
    );
  }
}

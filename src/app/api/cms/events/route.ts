'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for events
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['lecture', 'workshop', 'conference', 'community', 'religious', 'educational']),
  category: z.string().min(1, 'Category is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  speaker: z.string().optional(),
  organizer: z.string().min(1, 'Organizer is required'),
  maxAttendees: z.number().min(1).optional(),
  registrationRequired: z.boolean().default(false),
  registrationDeadline: z.string().optional(),
  fee: z.number().min(0).optional(),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
  featuredImage: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// GET /api/cms/events - Fetch all events
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
    const sortBy = searchParams.get('sortBy') || 'startDate';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Mock data for now - replace with actual database queries
    const mockEvents = [
      {
        id: '1',
        title: 'Friday Khutba: The Importance of Community',
        description: 'Join us for this week&apos;s Friday sermon focusing on building strong Islamic communities and supporting one another.',
        type: 'religious',
        category: 'Weekly Khutba',
        startDate: '2024-02-02',
        endDate: '2024-02-02',
        startTime: '13:00',
        endTime: '14:00',
        location: 'Main Prayer Hall',
        speaker: 'Imam Abdullah Rahman',
        organizer: 'Islamic Center',
        maxAttendees: 500,
        registrationRequired: false,
        fee: 0,
        tags: ['khutba', 'friday', 'community', 'weekly'],
        isPublished: true,
        isFeatured: true,
        featuredImage: '/images/events/friday-khutba.jpg',
        contactEmail: 'info@islamiccenter.org',
        contactPhone: '+1-555-0123',
        currentAttendees: 0,
        views: 245,
        createdAt: '2024-01-15T10:00:00Z',
        lastModified: '2024-01-20T14:30:00Z'
      },
      {
        id: '2',
        title: 'Quran Study Circle - Surah Al-Baqarah',
        description: 'Weekly Quran study session focusing on the detailed study of Surah Al-Baqarah with translation and tafsir.',
        type: 'educational',
        category: 'Quran Study',
        startDate: '2024-02-05',
        endDate: '2024-02-05',
        startTime: '19:00',
        endTime: '20:30',
        location: 'Study Room A',
        speaker: 'Dr. Fatima Al-Zahra',
        organizer: 'Education Committee',
        maxAttendees: 30,
        registrationRequired: true,
        registrationDeadline: '2024-02-04T23:59:59Z',
        fee: 0,
        tags: ['quran', 'study', 'tafsir', 'weekly'],
        isPublished: true,
        isFeatured: false,
        featuredImage: '/images/events/quran-study.jpg',
        contactEmail: 'education@islamiccenter.org',
        currentAttendees: 18,
        views: 89,
        createdAt: '2024-01-12T09:00:00Z',
        lastModified: '2024-01-18T16:45:00Z'
      },
      {
        id: '3',
        title: 'Islamic Finance Workshop',
        description: 'Learn about Islamic banking principles, halal investments, and Sharia-compliant financial planning.',
        type: 'workshop',
        category: 'Finance',
        startDate: '2024-02-10',
        endDate: '2024-02-10',
        startTime: '10:00',
        endTime: '16:00',
        location: 'Conference Hall',
        speaker: 'Dr. Ahmed Hassan',
        organizer: 'Community Outreach',
        maxAttendees: 100,
        registrationRequired: true,
        registrationDeadline: '2024-02-08T23:59:59Z',
        fee: 25,
        tags: ['finance', 'workshop', 'halal', 'investment'],
        isPublished: true,
        isFeatured: true,
        featuredImage: '/images/events/islamic-finance.jpg',
        contactEmail: 'workshops@islamiccenter.org',
        contactPhone: '+1-555-0124',
        currentAttendees: 67,
        views: 156,
        createdAt: '2024-01-08T11:30:00Z',
        lastModified: '2024-01-25T10:15:00Z'
      },
      {
        id: '4',
        title: 'Youth Islamic Conference 2024',
        description: 'Annual conference for Muslim youth featuring inspiring speakers, workshops, and networking opportunities.',
        type: 'conference',
        category: 'Youth',
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        startTime: '09:00',
        endTime: '18:00',
        location: 'Community Center',
        speaker: 'Multiple Speakers',
        organizer: 'Youth Committee',
        maxAttendees: 300,
        registrationRequired: true,
        registrationDeadline: '2024-03-10T23:59:59Z',
        fee: 50,
        tags: ['youth', 'conference', 'annual', 'networking'],
        isPublished: false,
        isFeatured: false,
        featuredImage: '/images/events/youth-conference.jpg',
        contactEmail: 'youth@islamiccenter.org',
        contactPhone: '+1-555-0125',
        additionalInfo: 'Includes meals and conference materials',
        currentAttendees: 0,
        views: 45,
        createdAt: '2024-01-05T14:20:00Z',
        lastModified: '2024-01-22T09:30:00Z'
      }
    ];

    // Apply filters
    let filteredEvents = mockEvents;

    if (search) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.speaker?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }

    if (category) {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    if (status) {
      if (status === 'published') {
        filteredEvents = filteredEvents.filter(event => event.isPublished);
      } else if (status === 'draft') {
        filteredEvents = filteredEvents.filter(event => !event.isPublished);
      } else if (status === 'upcoming') {
        const now = new Date();
        filteredEvents = filteredEvents.filter(event => new Date(event.startDate) > now);
      } else if (status === 'past') {
        const now = new Date();
        filteredEvents = filteredEvents.filter(event => new Date(event.startDate) < now);
      }
    }

    // Apply sorting
    filteredEvents.sort((a, b) => {
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
    const totalCount = filteredEvents.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    // Calculate statistics
    const now = new Date();
    const stats = {
      totalEvents: mockEvents.length,
      upcomingEvents: mockEvents.filter(event => new Date(event.startDate) > now).length,
      pastEvents: mockEvents.filter(event => new Date(event.startDate) < now).length,
      publishedEvents: mockEvents.filter(event => event.isPublished).length,
      draftEvents: mockEvents.filter(event => !event.isPublished).length,
      featuredEvents: mockEvents.filter(event => event.isFeatured).length,
      totalAttendees: mockEvents.reduce((sum, event) => sum + event.currentAttendees, 0),
      totalViews: mockEvents.reduce((sum, event) => sum + event.views, 0)
    };

    return NextResponse.json({
      success: true,
      data: paginatedEvents,
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
    console.error('Get events error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/cms/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = eventSchema.safeParse(body);
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
    const newEvent = {
      id: Date.now().toString(),
      ...validatedData,
      currentAttendees: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    }, { status: 201 });

  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

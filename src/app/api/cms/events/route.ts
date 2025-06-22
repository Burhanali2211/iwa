'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

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

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase.from('events').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,speaker.ilike.%${search}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }
    
    if (category) {
        query = query.eq('category', category);
    }

    if (status) {
        const now = new Date().toISOString();
        if (status === 'published') query = query.eq('is_published', true);
        if (status === 'draft') query = query.eq('is_published', false);
        if (status === 'upcoming') query = query.gte('start_date', now);
        if (status === 'past') query = query.lt('start_date', now);
    }

    query = query.order(sortBy === 'startDate' ? 'start_date' : sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(from, to);

    const { data: events, error, count } = await query;

    if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
    }
    
    // Calculate statistics
    const { data: allEvents, error: allEventsError } = await supabase.from('events').select('start_date, is_published, is_featured, current_attendees, views');
    
    if(allEventsError) {
        console.error('Error fetching all events for stats:', allEventsError);
    }
    
    const now = new Date();
    const stats = {
        totalEvents: allEvents?.length || 0,
        upcomingEvents: allEvents?.filter(event => new Date(event.start_date) > now).length || 0,
        pastEvents: allEvents?.filter(event => new Date(event.start_date) < now).length || 0,
        publishedEvents: allEvents?.filter(event => event.is_published).length || 0,
        draftEvents: allEvents?.filter(event => !event.is_published).length || 0,
        featuredEvents: allEvents?.filter(event => event.is_featured).length || 0,
        totalAttendees: allEvents?.reduce((sum, event) => sum + (event.current_attendees || 0), 0) || 0,
        totalViews: allEvents?.reduce((sum, event) => sum + (event.views || 0), 0) || 0
    };
    
    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: events,
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

    // Insert into database
    const { data: newEvent, error } = await supabase
      .from('events')
      .insert({
        title: validatedData.title,
        description: validatedData.description,
        event_type: validatedData.type.toUpperCase(),
        start_date: validatedData.startDate,
        end_date: validatedData.endDate,
        location: validatedData.location,
        category: validatedData.category,
        speaker: validatedData.speaker,
        organizer: validatedData.organizer,
        max_attendees: validatedData.maxAttendees,
        registration_required: validatedData.registrationRequired,
        registration_deadline: validatedData.registrationDeadline,
        fee: validatedData.fee,
        tags: JSON.stringify(validatedData.tags || []),
        is_published: validatedData.isPublished,
        is_featured: validatedData.isFeatured,
        featured_image: validatedData.featuredImage,
        contact_email: validatedData.contactEmail,
        contact_phone: validatedData.contactPhone,
        additional_info: validatedData.additionalInfo,
        current_attendees: 0,
        views: 0,
        is_public: true,
        created_by: authResult.user.userId
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create event' },
        { status: 500 }
      );
    }

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

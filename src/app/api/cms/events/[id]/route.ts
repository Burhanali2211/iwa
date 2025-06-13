'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for event updates
const updateEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  type: z.enum(['lecture', 'workshop', 'conference', 'community', 'religious', 'educational']).optional(),
  category: z.string().min(1, 'Category is required').optional(),
  startDate: z.string().min(1, 'Start date is required').optional(),
  endDate: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required').optional(),
  endTime: z.string().optional(),
  location: z.string().min(1, 'Location is required').optional(),
  speaker: z.string().optional(),
  organizer: z.string().min(1, 'Organizer is required').optional(),
  maxAttendees: z.number().min(1).optional(),
  registrationRequired: z.boolean().optional(),
  registrationDeadline: z.string().optional(),
  fee: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  featuredImage: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// GET /api/cms/events/[id] - Fetch single event
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
    const mockEvent = {
      id: '1',
      title: 'Friday Khutba: The Importance of Community',
      description: 'Join us for this week\'s Friday sermon focusing on building strong Islamic communities and supporting one another. This khutba will explore the Quranic verses and Hadith that emphasize the importance of unity, mutual support, and collective responsibility in Islam.',
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
      additionalInfo: 'Please arrive 15 minutes early for the best seating. Wudu facilities are available.',
      currentAttendees: 0,
      views: 245,
      createdAt: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-20T14:30:00Z'
    };

    if (id !== '1') {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockEvent
    });

  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/events/[id] - Update event
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
    const validationResult = updateEventSchema.safeParse(body);
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
    const updatedEvent = {
      id,
      ...validatedData,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });

  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/events/[id] - Delete event
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
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

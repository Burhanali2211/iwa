'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for contact information updates
const updateContactInfoSchema = z.object({
  type: z.enum(['general', 'department', 'person', 'location', 'service']).optional(),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().optional(),
  email: z.string().email('Please enter a valid email address').optional(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional()
  }).optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  name: z.string().optional(),
  hours: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional()
  }).optional(),
  socialMedia: z.object({
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    linkedin: z.string().url().optional()
  }).optional(),
  isPublished: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  sortOrder: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

// GET /api/cms/contact/[id] - Fetch single contact information
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
    const mockContact = {
      id: '1',
      type: 'general',
      title: 'Main Islamic Center',
      description: 'Primary contact for the Islamic Center. We welcome all visitors and provide comprehensive Islamic services including daily prayers, educational programs, community events, and spiritual guidance.',
      email: 'info@islamiccenter.org',
      phone: '+1-555-0123',
      address: {
        street: '123 Mosque Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        country: 'United States'
      },
      hours: {
        monday: '9:00 AM - 9:00 PM',
        tuesday: '9:00 AM - 9:00 PM',
        wednesday: '9:00 AM - 9:00 PM',
        thursday: '9:00 AM - 9:00 PM',
        friday: '9:00 AM - 10:00 PM',
        saturday: '9:00 AM - 9:00 PM',
        sunday: '9:00 AM - 9:00 PM'
      },
      socialMedia: {
        website: 'https://islamiccenter.org',
        facebook: 'https://facebook.com/islamiccenter',
        twitter: 'https://twitter.com/islamiccenter',
        instagram: 'https://instagram.com/islamiccenter',
        youtube: 'https://youtube.com/islamiccenter'
      },
      isPublished: true,
      isPrimary: true,
      sortOrder: 1,
      tags: ['main', 'primary', 'general'],
      createdAt: '2024-01-01T10:00:00Z',
      lastModified: '2024-01-20T15:30:00Z'
    };

    if (id !== '1') {
      return NextResponse.json(
        { success: false, error: 'Contact information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockContact
    });

  } catch (error) {
    console.error('Get contact information error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact information' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/contact/[id] - Update contact information
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
    const validationResult = updateContactInfoSchema.safeParse(body);
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
    const updatedContact = {
      id,
      ...validatedData,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Contact information updated successfully',
      data: updatedContact
    });

  } catch (error) {
    console.error('Update contact information error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact information' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/contact/[id] - Delete contact information
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
      message: 'Contact information deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact information error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact information' },
      { status: 500 }
    );
  }
}

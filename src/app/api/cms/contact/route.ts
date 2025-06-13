'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for contact information
const contactInfoSchema = z.object({
  type: z.enum(['general', 'department', 'person', 'location', 'service']),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
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
  isPublished: z.boolean().default(true),
  isPrimary: z.boolean().default(false),
  sortOrder: z.number().default(0),
  tags: z.array(z.string()).optional().default([]),
});

// GET /api/cms/contact - Fetch all contact information
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';

    // Mock data for now - replace with actual database queries
    const mockContacts = [
      {
        id: '1',
        type: 'general',
        title: 'Main Islamic Center',
        description: 'Primary contact for the Islamic Center',
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
          instagram: 'https://instagram.com/islamiccenter'
        },
        isPublished: true,
        isPrimary: true,
        sortOrder: 1,
        tags: ['main', 'primary', 'general'],
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-20T15:30:00Z'
      },
      {
        id: '2',
        type: 'person',
        title: 'Imam Abdullah Rahman',
        description: 'Head Imam and Religious Director',
        email: 'imam@islamiccenter.org',
        phone: '+1-555-0124',
        department: 'Religious Affairs',
        position: 'Head Imam',
        name: 'Abdullah Rahman',
        isPublished: true,
        isPrimary: false,
        sortOrder: 2,
        tags: ['imam', 'religious', 'leadership'],
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-15T12:00:00Z'
      },
      {
        id: '3',
        type: 'department',
        title: 'Education Department',
        description: 'Islamic school and educational programs',
        email: 'education@islamiccenter.org',
        phone: '+1-555-0125',
        department: 'Education',
        hours: {
          monday: '8:00 AM - 4:00 PM',
          tuesday: '8:00 AM - 4:00 PM',
          wednesday: '8:00 AM - 4:00 PM',
          thursday: '8:00 AM - 4:00 PM',
          friday: '8:00 AM - 4:00 PM',
          saturday: 'Closed',
          sunday: 'Closed'
        },
        isPublished: true,
        isPrimary: false,
        sortOrder: 3,
        tags: ['education', 'school', 'learning'],
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-18T09:45:00Z'
      },
      {
        id: '4',
        type: 'service',
        title: 'Marriage & Family Counseling',
        description: 'Islamic marriage counseling and family guidance services',
        email: 'counseling@islamiccenter.org',
        phone: '+1-555-0126',
        department: 'Community Services',
        hours: {
          monday: 'By Appointment',
          tuesday: 'By Appointment',
          wednesday: 'By Appointment',
          thursday: 'By Appointment',
          friday: 'By Appointment',
          saturday: '10:00 AM - 2:00 PM',
          sunday: 'Closed'
        },
        isPublished: true,
        isPrimary: false,
        sortOrder: 4,
        tags: ['counseling', 'marriage', 'family', 'services'],
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-12T16:20:00Z'
      },
      {
        id: '5',
        type: 'department',
        title: 'Youth Programs',
        description: 'Programs and activities for Muslim youth',
        email: 'youth@islamiccenter.org',
        phone: '+1-555-0127',
        department: 'Youth',
        hours: {
          monday: 'Closed',
          tuesday: '4:00 PM - 8:00 PM',
          wednesday: '4:00 PM - 8:00 PM',
          thursday: '4:00 PM - 8:00 PM',
          friday: '6:00 PM - 9:00 PM',
          saturday: '10:00 AM - 6:00 PM',
          sunday: '2:00 PM - 6:00 PM'
        },
        isPublished: true,
        isPrimary: false,
        sortOrder: 5,
        tags: ['youth', 'programs', 'activities'],
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-10T14:15:00Z'
      }
    ];

    // Apply filters
    let filteredContacts = mockContacts;

    if (type) {
      filteredContacts = filteredContacts.filter(contact => contact.type === type);
    }

    if (search) {
      filteredContacts = filteredContacts.filter(contact =>
        contact.title.toLowerCase().includes(search.toLowerCase()) ||
        contact.description?.toLowerCase().includes(search.toLowerCase()) ||
        contact.department?.toLowerCase().includes(search.toLowerCase()) ||
        contact.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by sortOrder and then by title
    filteredContacts.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return a.title.localeCompare(b.title);
    });

    // Calculate statistics
    const stats = {
      totalContacts: mockContacts.length,
      publishedContacts: mockContacts.filter(c => c.isPublished).length,
      departments: mockContacts.filter(c => c.type === 'department').length,
      people: mockContacts.filter(c => c.type === 'person').length,
      services: mockContacts.filter(c => c.type === 'service').length,
      locations: mockContacts.filter(c => c.type === 'location').length
    };

    return NextResponse.json({
      success: true,
      data: filteredContacts,
      stats
    });

  } catch (error) {
    console.error('Get contact information error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact information' },
      { status: 500 }
    );
  }
}

// POST /api/cms/contact - Create new contact information
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = contactInfoSchema.safeParse(body);
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
    const newContact = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Contact information created successfully',
      data: newContact
    }, { status: 201 });

  } catch (error) {
    console.error('Create contact information error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contact information' },
      { status: 500 }
    );
  }
}

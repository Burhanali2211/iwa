'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for donation campaign updates
const updateDonationCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  type: z.enum(['general', 'mosque', 'education', 'charity', 'emergency', 'zakat', 'sadaqah']).optional(),
  category: z.string().min(1, 'Category is required').optional(),
  goalAmount: z.number().min(1, 'Goal amount must be greater than 0').optional(),
  currentAmount: z.number().min(0).optional(),
  currency: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required').optional(),
  endDate: z.string().optional(),
  isActive: z.boolean().optional(),
  isUrgent: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  featuredImage: z.string().url().optional(),
  organizer: z.string().min(1, 'Organizer is required').optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  bankDetails: z.object({
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
    bankName: z.string().optional()
  }).optional(),
  paymentMethods: z.array(z.enum(['card', 'bank', 'paypal', 'crypto', 'cash'])).optional(),
  tags: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
});

// GET /api/cms/donations/[id] - Fetch single donation campaign
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
    const mockCampaign = {
      id: '1',
      title: 'Mosque Renovation Project',
      description: 'Help us renovate and expand our main prayer hall to accommodate our growing community. The project includes new carpeting, improved lighting, accessibility features, and expanded space for women\'s prayer area. This renovation will ensure our mosque can serve the community for generations to come.',
      type: 'mosque',
      category: 'Infrastructure',
      goalAmount: 50000,
      currentAmount: 32500,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      isActive: true,
      isUrgent: false,
      isFeatured: true,
      isPublished: true,
      featuredImage: '/images/campaigns/mosque-renovation.jpg',
      organizer: 'Mosque Committee',
      contactEmail: 'donations@islamiccenter.org',
      contactPhone: '+1-555-0123',
      bankDetails: {
        accountName: 'Islamic Center Donations',
        accountNumber: '****1234',
        routingNumber: '****5678',
        bankName: 'Community Bank'
      },
      paymentMethods: ['card', 'bank', 'paypal'],
      tags: ['mosque', 'renovation', 'infrastructure', 'community'],
      additionalInfo: 'Tax-deductible donations. Receipt will be provided for all contributions.',
      donorCount: 156,
      averageDonation: 208.33,
      lastDonation: '2024-01-20T14:30:00Z',
      recentDonations: [
        { amount: 500, donor: 'Anonymous', date: '2024-01-20T14:30:00Z' },
        { amount: 250, donor: 'Ahmed Family', date: '2024-01-20T10:15:00Z' },
        { amount: 100, donor: 'Sarah M.', date: '2024-01-19T16:45:00Z' }
      ],
      milestones: [
        { amount: 10000, description: 'Initial planning phase', reached: true },
        { amount: 25000, description: 'Material procurement', reached: true },
        { amount: 40000, description: 'Construction begins', reached: false },
        { amount: 50000, description: 'Project completion', reached: false }
      ],
      createdAt: '2024-01-01T10:00:00Z',
      lastModified: '2024-01-20T15:45:00Z'
    };

    if (id !== '1') {
      return NextResponse.json(
        { success: false, error: 'Donation campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockCampaign
    });

  } catch (error) {
    console.error('Get donation campaign error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation campaign' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/donations/[id] - Update donation campaign
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
    const validationResult = updateDonationCampaignSchema.safeParse(body);
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
    const updatedCampaign = {
      id,
      ...validatedData,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Donation campaign updated successfully',
      data: updatedCampaign
    });

  } catch (error) {
    console.error('Update donation campaign error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update donation campaign' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/donations/[id] - Delete donation campaign
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
      message: 'Donation campaign deleted successfully'
    });

  } catch (error) {
    console.error('Delete donation campaign error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete donation campaign' },
      { status: 500 }
    );
  }
}

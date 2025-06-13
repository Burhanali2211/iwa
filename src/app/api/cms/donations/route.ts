'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for donation campaigns
const donationCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['general', 'mosque', 'education', 'charity', 'emergency', 'zakat', 'sadaqah']),
  category: z.string().min(1, 'Category is required'),
  goalAmount: z.number().min(1, 'Goal amount must be greater than 0'),
  currentAmount: z.number().min(0).default(0),
  currency: z.string().default('USD'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isActive: z.boolean().default(true),
  isUrgent: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  featuredImage: z.string().url().optional(),
  organizer: z.string().min(1, 'Organizer is required'),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  bankDetails: z.object({
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
    bankName: z.string().optional()
  }).optional(),
  paymentMethods: z.array(z.enum(['card', 'bank', 'paypal', 'crypto', 'cash'])).default(['card']),
  tags: z.array(z.string()).optional().default([]),
  additionalInfo: z.string().optional(),
});

// GET /api/cms/donations - Fetch all donation campaigns
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
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Mock data for now - replace with actual database queries
    const mockCampaigns = [
      {
        id: '1',
        title: 'Mosque Renovation Project',
        description: 'Help us renovate and expand our main prayer hall to accommodate our growing community. The project includes new carpeting, improved lighting, and accessibility features.',
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
        paymentMethods: ['card', 'bank', 'paypal'],
        tags: ['mosque', 'renovation', 'infrastructure', 'community'],
        donorCount: 156,
        averageDonation: 208.33,
        lastDonation: '2024-01-20T14:30:00Z',
        createdAt: '2024-01-01T10:00:00Z',
        lastModified: '2024-01-20T15:45:00Z'
      },
      {
        id: '2',
        title: 'Emergency Relief for Gaza',
        description: 'Urgent humanitarian aid for families affected by the crisis in Gaza. Funds will be used for food, medical supplies, and temporary shelter.',
        type: 'emergency',
        category: 'Humanitarian Aid',
        goalAmount: 25000,
        currentAmount: 18750,
        currency: 'USD',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        isActive: true,
        isUrgent: true,
        isFeatured: true,
        isPublished: true,
        featuredImage: '/images/campaigns/gaza-relief.jpg',
        organizer: 'Humanitarian Committee',
        contactEmail: 'relief@islamiccenter.org',
        paymentMethods: ['card', 'paypal', 'crypto'],
        tags: ['emergency', 'gaza', 'humanitarian', 'urgent'],
        donorCount: 89,
        averageDonation: 210.67,
        lastDonation: '2024-01-21T09:15:00Z',
        createdAt: '2024-01-15T08:00:00Z',
        lastModified: '2024-01-21T10:30:00Z'
      },
      {
        id: '3',
        title: 'Islamic School Scholarship Fund',
        description: 'Support deserving students who need financial assistance to attend our Islamic school. Help provide quality Islamic education to all children.',
        type: 'education',
        category: 'Education',
        goalAmount: 15000,
        currentAmount: 8500,
        currency: 'USD',
        startDate: '2024-01-10',
        endDate: '2024-08-31',
        isActive: true,
        isUrgent: false,
        isFeatured: false,
        isPublished: true,
        featuredImage: '/images/campaigns/scholarship.jpg',
        organizer: 'Education Committee',
        contactEmail: 'education@islamiccenter.org',
        contactPhone: '+1-555-0124',
        paymentMethods: ['card', 'bank'],
        tags: ['education', 'scholarship', 'students', 'school'],
        donorCount: 45,
        averageDonation: 188.89,
        lastDonation: '2024-01-19T16:20:00Z',
        createdAt: '2024-01-10T12:00:00Z',
        lastModified: '2024-01-19T17:00:00Z'
      },
      {
        id: '4',
        title: 'Ramadan Food Drive',
        description: 'Provide iftar meals and food packages to needy families during the holy month of Ramadan. Every donation helps feed a family.',
        type: 'charity',
        category: 'Food Aid',
        goalAmount: 10000,
        currentAmount: 3200,
        currency: 'USD',
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        isActive: false,
        isUrgent: false,
        isFeatured: false,
        isPublished: false,
        featuredImage: '/images/campaigns/ramadan-food.jpg',
        organizer: 'Community Outreach',
        contactEmail: 'outreach@islamiccenter.org',
        paymentMethods: ['card', 'cash'],
        tags: ['ramadan', 'food', 'charity', 'iftar'],
        donorCount: 23,
        averageDonation: 139.13,
        lastDonation: '2024-01-18T11:45:00Z',
        createdAt: '2024-01-05T14:30:00Z',
        lastModified: '2024-01-18T12:00:00Z'
      }
    ];

    // Apply filters
    let filteredCampaigns = mockCampaigns;

    if (search) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(search.toLowerCase()) ||
        campaign.organizer.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filteredCampaigns = filteredCampaigns.filter(campaign => campaign.type === type);
    }

    if (status) {
      if (status === 'active') {
        filteredCampaigns = filteredCampaigns.filter(campaign => campaign.isActive);
      } else if (status === 'inactive') {
        filteredCampaigns = filteredCampaigns.filter(campaign => !campaign.isActive);
      } else if (status === 'published') {
        filteredCampaigns = filteredCampaigns.filter(campaign => campaign.isPublished);
      } else if (status === 'draft') {
        filteredCampaigns = filteredCampaigns.filter(campaign => !campaign.isPublished);
      } else if (status === 'urgent') {
        filteredCampaigns = filteredCampaigns.filter(campaign => campaign.isUrgent);
      }
    }

    // Apply sorting
    filteredCampaigns.sort((a, b) => {
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
    const totalCount = filteredCampaigns.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

    // Calculate statistics
    const stats = {
      totalCampaigns: mockCampaigns.length,
      activeCampaigns: mockCampaigns.filter(c => c.isActive).length,
      publishedCampaigns: mockCampaigns.filter(c => c.isPublished).length,
      urgentCampaigns: mockCampaigns.filter(c => c.isUrgent).length,
      featuredCampaigns: mockCampaigns.filter(c => c.isFeatured).length,
      totalRaised: mockCampaigns.reduce((sum, c) => sum + c.currentAmount, 0),
      totalGoal: mockCampaigns.reduce((sum, c) => sum + c.goalAmount, 0),
      totalDonors: mockCampaigns.reduce((sum, c) => sum + c.donorCount, 0),
      averageDonation: mockCampaigns.reduce((sum, c) => sum + c.averageDonation, 0) / mockCampaigns.length
    };

    return NextResponse.json({
      success: true,
      data: paginatedCampaigns,
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
    console.error('Get donation campaigns error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/cms/donations - Create new donation campaign
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = donationCampaignSchema.safeParse(body);
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
    const newCampaign = {
      id: Date.now().toString(),
      ...validatedData,
      donorCount: 0,
      averageDonation: 0,
      lastDonation: null,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Donation campaign created successfully',
      data: newCampaign
    }, { status: 201 });

  } catch (error) {
    console.error('Create donation campaign error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create donation campaign' },
      { status: 500 }
    );
  }
}

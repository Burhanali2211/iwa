'use server';

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Validation schema for donation campaigns
const donationCampaignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['general', 'mosque', 'education', 'charity', 'emergency', 'zakat', 'sadaqah']),
  category: z.string().min(1, 'Category is required'),
  goalAmount: z.number().min(1, 'Goal amount must be greater than 0'),
  currentAmount: z.number().min(0).default(0),
  currency: z.string().default('USD'),
  startDate: z.string().min(1, 'Start date is required').refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Start date must be a valid date'),
  endDate: z.string().optional().refine((date) => {
    if (!date) return true;
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'End date must be a valid date'),
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

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase.from('donation_campaigns').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,organizer.ilike.%${search}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (status) {
      if (status === 'active') query = query.eq('is_active', true);
      if (status === 'inactive') query = query.eq('is_active', false);
      if (status === 'published') query = query.eq('is_published', true);
      if (status === 'draft') query = query.eq('is_published', false);
      if (status === 'urgent') query = query.eq('is_urgent', true);
    }

    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(from, to);

    const { data: campaigns, error, count } = await query;

    if (error) {
      console.error('Error fetching donation campaigns:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch donation campaigns' }, { status: 500 });
    }

    // Calculate statistics
    const { data: allCampaigns, error: allCampaignsError } = await supabase.from('donation_campaigns').select('is_active, is_published, is_urgent, is_featured, current_amount, goal_amount, donor_count');

    if(allCampaignsError) {
        console.error('Error fetching all campaigns for stats:', allCampaignsError);
    }

    const stats = {
      totalCampaigns: allCampaigns?.length || 0,
      activeCampaigns: allCampaigns?.filter(c => c.is_active).length || 0,
      publishedCampaigns: allCampaigns?.filter(c => c.is_published).length || 0,
      urgentCampaigns: allCampaigns?.filter(c => c.is_urgent).length || 0,
      featuredCampaigns: allCampaigns?.filter(c => c.is_featured).length || 0,
      totalRaised: allCampaigns?.reduce((sum, c) => sum + c.current_amount, 0) || 0,
      totalGoal: allCampaigns?.reduce((sum, c) => sum + c.goal_amount, 0) || 0,
      totalDonors: allCampaigns?.reduce((sum, c) => sum + c.donor_count, 0) || 0,
      averageDonation: (allCampaigns?.reduce((sum, c) => sum + c.current_amount, 0) || 0) / (allCampaigns?.reduce((sum, c) => sum + c.donor_count, 0) || 1)
    };
    
    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: campaigns,
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

    // Ensure dates are properly formatted
    const startDate = new Date(validatedData.startDate).toISOString().split('T')[0];
    const endDate = validatedData.endDate ? new Date(validatedData.endDate).toISOString().split('T')[0] : null;

    console.log('Inserting donation campaign with dates:', { startDate, endDate });

    // Insert into database
    const { data: newCampaign, error } = await supabase
      .from('donation_campaigns')
      .insert({
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        category: validatedData.category,
        goal_amount: validatedData.goalAmount,
        current_amount: validatedData.currentAmount,
        currency: validatedData.currency,
        start_date: startDate,
        end_date: endDate,
        is_active: validatedData.isActive,
        is_urgent: validatedData.isUrgent,
        is_featured: validatedData.isFeatured,
        is_published: validatedData.isPublished,
        featured_image: validatedData.featuredImage,
        organizer: validatedData.organizer,
        contact_email: validatedData.contactEmail,
        contact_phone: validatedData.contactPhone,
        bank_details: validatedData.bankDetails,
        payment_methods: JSON.stringify(validatedData.paymentMethods),
        tags: JSON.stringify(validatedData.tags || []),
        additional_info: validatedData.additionalInfo,
        donor_count: 0,
        average_donation: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create donation campaign' },
        { status: 500 }
      );
    }

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

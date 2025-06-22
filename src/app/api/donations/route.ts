import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const createDonationSchema = z.object({
  donorName: z.string().min(2, 'Donor name must be at least 2 characters'),
  donorEmail: z.string().email('Invalid email address').optional(),
  donorPhone: z.string().optional(),
  amount: z.number().positive('Amount must be positive').min(1, 'Minimum donation amount is ₹1'),
  donationType: z.enum(['SADAQAH', 'KHUMS', 'ZAKAT', 'STUDENT_SPONSORSHIP', 'GENERAL', 'BUILDING_FUND']),
  paymentMethod: z.enum(['UPI', 'CARD', 'BANK_TRANSFER', 'CASH', 'RAZORPAY', 'CASHFREE']),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  isAnonymous: z.boolean().optional(),
});

// GET - Fetch donations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const donationType = searchParams.get('donationType');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('donations')
      .select('*, users(id, name, email)');

    if (donationType && donationType !== 'ALL') {
      query = query.eq('donation_type', donationType);
    }
    if (status && status !== 'ALL') {
      query = query.eq('status', status);
    }
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { count: totalCount, error: countError } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true });

    // Get paginated donations
    const { data: donations, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch donations' },
        { status: 500 }
      );
    }

    // Calculate summary statistics
    const { data: totalAmountData } = await supabase
      .from('donations')
      .select('amount')
      .eq('status', 'COMPLETED');
    const totalAmount = (totalAmountData || []).reduce((sum, d) => sum + d.amount, 0);

    // Donations by type
    const { data: donationsByTypeData } = await supabase
      .from('donations')
      .select('donation_type, amount')
      .eq('status', 'COMPLETED');
    const donationsByType: Record<string, { amount: number; count: number }> = {};
    (donationsByTypeData || []).forEach((d: any) => {
      if (!donationsByType[d.donation_type]) {
        donationsByType[d.donation_type] = { amount: 0, count: 0 };
      }
      donationsByType[d.donation_type].amount += d.amount;
      donationsByType[d.donation_type].count += 1;
    });

    return NextResponse.json({
      success: true,
      donations,
      pagination: {
        page,
        limit,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit),
      },
      summary: {
        totalAmount,
        donationsByType,
      },
    });

  } catch (error) {
    console.error('Get donations error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

// POST - Create new donation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createDonationSchema.parse(body);

    // Get user if authenticated (optional for donations)
    const authResult = await requireAuth(request);
    let userId = null;
    if (!('error' in authResult)) {
      userId = authResult.user.userId;
    }

    // Create donation
    const { data: donation, error } = await supabase
      .from('donations')
      .insert({
        user_id: userId,
        donor_name: validatedData.donorName,
        donor_email: validatedData.donorEmail,
        donor_phone: validatedData.donorPhone,
        amount: validatedData.amount,
        donation_type: validatedData.donationType,
        payment_method: validatedData.paymentMethod,
        message: validatedData.message,
        is_anonymous: validatedData.isAnonymous || false,
        status: 'PENDING',
      })
      .select('*, users(id, name, email)')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create donation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Donation created successfully',
      donation,
    }, { status: 201 });

  } catch (error) {
    console.error('Create donation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}

// PUT - Update donation status (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const { donationId, status, transactionId, receiptUrl } = body;

    if (!donationId || !status) {
      return NextResponse.json(
        { error: 'Donation ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update donation
    const { data: updated, error } = await supabase
      .from('donations')
      .update({
        status,
        transaction_id: transactionId,
        receipt_url: receiptUrl,
      })
      .eq('id', donationId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update donation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Donation status updated',
      donation: updated,
    });

  } catch (error) {
    console.error('Update donation error:', error);
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a donation (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get('donationId');

    if (!donationId) {
      return NextResponse.json(
        { error: 'Donation ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('donations')
      .delete()
      .eq('id', donationId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete donation' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Donation deleted successfully',
    });

  } catch (error) {
    console.error('Delete donation error:', error);
    return NextResponse.json(
      { error: 'Failed to delete donation' },
      { status: 500 }
    );
  }
}

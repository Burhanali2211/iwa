import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    const skip = (page - 1) * limit;

    const whereClause: { donationType?: string; status?: string; createdAt?: { gte?: Date; lte?: Date } } = {};

    // Filter by donation type
    if (donationType && donationType !== 'ALL') {
      whereClause.donationType = donationType;
    }

    // Filter by status
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    // Filter by date range
    if (startDate && endDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      whereClause.createdAt = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      whereClause.createdAt = {
        lte: new Date(endDate),
      };
    }

    const [donations, totalCount] = await Promise.all([
      prisma.donation.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.donation.count({ where: whereClause }),
    ]);

    // Calculate summary statistics
    const totalAmount = await prisma.donation.aggregate({
      where: { ...whereClause, status: 'COMPLETED' },
      _sum: {
        amount: true,
      },
    });

    const donationsByType = await prisma.donation.groupBy({
      by: ['donationType'],
      where: { ...whereClause, status: 'COMPLETED' },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      success: true,
      donations,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      summary: {
        totalAmount: totalAmount._sum.amount || 0,
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
    const donation = await prisma.donation.create({
      data: {
        userId,
        donorName: validatedData.donorName,
        donorEmail: validatedData.donorEmail,
        donorPhone: validatedData.donorPhone,
        amount: validatedData.amount,
        donationType: validatedData.donationType,
        paymentMethod: validatedData.paymentMethod,
        message: validatedData.message,
        isAnonymous: validatedData.isAnonymous || false,
        status: 'PENDING', // Will be updated after payment verification
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

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

    // Check if donation exists
    const existingDonation = await prisma.donation.findUnique({
      where: { id: donationId }
    });

    if (!existingDonation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    // Update donation
    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status,
        transactionId,
        receiptUrl,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Donation updated successfully',
      donation: updatedDonation,
    });

  } catch (error) {
    console.error('Update donation error:', error);
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    );
  }
}

// DELETE - Delete donation (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get('id');

    if (!donationId) {
      return NextResponse.json(
        { error: 'Donation ID is required' },
        { status: 400 }
      );
    }

    // Check if donation exists
    const existingDonation = await prisma.donation.findUnique({
      where: { id: donationId }
    });

    if (!existingDonation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    // Delete donation
    await prisma.donation.delete({
      where: { id: donationId }
    });

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

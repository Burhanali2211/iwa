import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { razorpay, PAYMENT_CONFIG, generateReceiptId, validatePaymentAmount, rupeesToPaise } from '@/lib/razorpay';
import { getAuthUser } from '@/lib/auth';

const createOrderSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['donation', 'fee']),
  donationType: z.string().optional(),
  feeType: z.string().optional(),
  studentId: z.string().optional(),
  description: z.string().optional(),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  donorPhone: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay credentials are configured
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const isDemoMode = process.env.NODE_ENV === 'development' &&
      (!razorpayKeyId || !razorpayKeySecret ||
       razorpayKeyId === 'your-razorpay-key-id' ||
       razorpayKeySecret === 'your-razorpay-key-secret');

    if (!isDemoMode && (!razorpayKeyId || !razorpayKeySecret ||
        razorpayKeyId === 'your-razorpay-key-id' ||
        razorpayKeySecret === 'your-razorpay-key-secret')) {
      return NextResponse.json(
        {
          error: 'Payment gateway not configured. Please contact the administrator to set up Razorpay credentials.',
          code: 'PAYMENT_GATEWAY_NOT_CONFIGURED'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Get authenticated user (optional for donations)
    const authUser = await getAuthUser(request);

    // Validate payment amount
    const amountValidation = validatePaymentAmount(
      rupeesToPaise(validatedData.amount),
      validatedData.donationType
    );

    if (!amountValidation.valid) {
      return NextResponse.json(
        { error: amountValidation.message },
        { status: 400 }
      );
    }

    // Generate receipt ID
    const receiptId = generateReceiptId(validatedData.type);

    // Create Razorpay order
    const orderOptions = {
      amount: rupeesToPaise(validatedData.amount), // Amount in paise
      currency: PAYMENT_CONFIG.currency,
      receipt: receiptId,
      notes: {
        type: validatedData.type,
        donationType: validatedData.donationType || '',
        feeType: validatedData.feeType || '',
        studentId: validatedData.studentId || '',
        userId: authUser?.userId || '',
        donorName: validatedData.donorName || '',
        donorEmail: validatedData.donorEmail || '',
        donorPhone: validatedData.donorPhone || '',
        isAnonymous: validatedData.isAnonymous.toString(),
        description: validatedData.description || '',
      },
    };

    let order;

    if (isDemoMode) {
      // Create a mock order for demo purposes
      order = {
        id: `order_demo_${Date.now()}`,
        amount: orderOptions.amount,
        currency: orderOptions.currency,
        receipt: orderOptions.receipt,
        status: 'created',
      };
    } else {
      if (!razorpay) {
        throw new Error('Payment gateway not properly initialized');
      }
      order = await razorpay.orders.create(orderOptions);
    }

    // Prepare response data
    const responseData = {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      key: isDemoMode ? 'demo_key' : process.env.RAZORPAY_KEY_ID,
      name: PAYMENT_CONFIG.company_name,
      description: validatedData.description || PAYMENT_CONFIG.description,
      theme: PAYMENT_CONFIG.theme,
      prefill: {
        name: validatedData.donorName || authUser?.email || '',
        email: validatedData.donorEmail || authUser?.email || '',
        contact: validatedData.donorPhone || '',
      },
      notes: orderOptions.notes,
      isDemoMode: isDemoMode,
    };

    return NextResponse.json({
      success: true,
      order: responseData,
    });

  } catch (error) {
    console.error('Create order error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

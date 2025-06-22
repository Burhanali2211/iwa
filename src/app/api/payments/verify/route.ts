import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { razorpay, paiseToRupees } from '@/lib/razorpay';
import { supabase } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = verifyPaymentSchema.parse(body);

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${validatedData.razorpay_order_id}|${validatedData.razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== validatedData.razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get payment details from Razorpay
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    const payment = await razorpay.payments.fetch(validatedData.razorpay_payment_id);
    const order = await razorpay.orders.fetch(validatedData.razorpay_order_id);

    if (payment.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Get authenticated user (optional for donations)
    const authUser = await getAuthUser(request);

    // Extract order notes
    const notes = order.notes || {};
    const paymentType = notes.type;
    const amount = paiseToRupees(typeof payment.amount === 'string' ? parseInt(payment.amount) : payment.amount);

    let savedRecord;

    if (paymentType === 'donation') {
      // Save donation record
      const { data: donation, error } = await supabase
        .from('donations')
        .insert({
          user_id: authUser?.userId || null,
          donor_name: String(notes.donorName || 'Anonymous'),
          donor_email: notes.donorEmail ? String(notes.donorEmail) : null,
          donor_phone: notes.donorPhone ? String(notes.donorPhone) : null,
          amount: amount,
          donation_type: (notes.donationType as string) || 'GENERAL',
          payment_method: 'RAZORPAY',
          transaction_id: validatedData.razorpay_payment_id,
          status: 'COMPLETED',
          message: notes.description ? String(notes.description) : null,
          is_anonymous: String(notes.isAnonymous) === 'true',
          receipt_url: null,
        })
        .select()
        .single();
      savedRecord = donation;
    } else if (paymentType === 'fee') {
      // Save fee payment record
      if (!notes.studentId) {
        return NextResponse.json(
          { error: 'Student ID required for fee payment' },
          { status: 400 }
        );
      }
      const { data: feePayment, error } = await supabase
        .from('fee_payments')
        .insert({
          student_id: String(notes.studentId),
          amount: amount,
          fee_type: String(notes.feeType || 'MISCELLANEOUS'),
          payment_method: 'RAZORPAY',
          transaction_id: validatedData.razorpay_payment_id,
          status: 'COMPLETED',
          due_date: new Date().toISOString(),
          paid_date: new Date().toISOString(),
          receipt_url: null,
        })
        .select()
        .single();
      savedRecord = feePayment;
    }

    // Generate receipt URL (placeholder for now)
    const receiptUrl = `/receipts/${savedRecord?.id}`;

    // Update the record with receipt URL
    if (paymentType === 'donation' && savedRecord) {
      await supabase
        .from('donations')
        .update({ receipt_url: receiptUrl })
        .eq('id', savedRecord.id);
    } else if (paymentType === 'fee' && savedRecord) {
      await supabase
        .from('fee_payments')
        .update({ receipt_url: receiptUrl })
        .eq('id', savedRecord.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment: {
        id: validatedData.razorpay_payment_id,
        orderId: validatedData.razorpay_order_id,
        amount: amount,
        status: 'completed',
        receiptUrl,
        recordId: savedRecord?.id,
      },
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    
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
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

// Only initialize Razorpay if credentials are properly configured
export const razorpay = (razorpayKeyId && razorpayKeySecret &&
  razorpayKeyId !== 'your-razorpay-key-id' &&
  razorpayKeySecret !== 'your-razorpay-key-secret')
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
  : null;

// Payment configuration
export const PAYMENT_CONFIG = {
  currency: 'INR',
  receipt_prefix: 'islamic_school_',
  theme: {
    color: '#16a34a', // Green color matching our theme
  },
  company_name: 'Islamic School & Religious Center',
  description: 'Payment for Islamic School services',
};

// Donation types with their configurations
export const DONATION_TYPES = {
  SADAQAH: {
    name: 'Sadaqah',
    description: 'General charitable donation',
    min_amount: 100, // in paise (₹1)
  },
  KHUMS: {
    name: 'Khums',
    description: 'Religious obligation payment',
    min_amount: 500, // in paise (₹5)
  },
  ZAKAT: {
    name: 'Zakat',
    description: 'Obligatory charity payment',
    min_amount: 1000, // in paise (₹10)
  },
  STUDENT_SPONSORSHIP: {
    name: 'Student Sponsorship',
    description: 'Sponsor a student\'s education',
    min_amount: 120000, // in paise (₹1200)
  },
  BUILDING_FUND: {
    name: 'Building Fund',
    description: 'Support infrastructure development',
    min_amount: 50000, // in paise (₹500)
  },
  GENERAL: {
    name: 'General Donation',
    description: 'Support our mission',
    min_amount: 100, // in paise (₹1)
  },
};

// Fee types for school payments
export const FEE_TYPES = {
  TUITION: {
    name: 'Tuition Fee',
    description: 'Monthly tuition fee',
  },
  ADMISSION: {
    name: 'Admission Fee',
    description: 'One-time admission fee',
  },
  EXAMINATION: {
    name: 'Examination Fee',
    description: 'Examination and assessment fee',
  },
  LIBRARY: {
    name: 'Library Fee',
    description: 'Library access and book fee',
  },
  TRANSPORT: {
    name: 'Transport Fee',
    description: 'School transport service fee',
  },
  MISCELLANEOUS: {
    name: 'Miscellaneous Fee',
    description: 'Other school-related fees',
  },
};

// Helper function to convert rupees to paise
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

// Helper function to convert paise to rupees
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

// Generate unique receipt ID
export function generateReceiptId(type: 'donation' | 'fee' = 'donation'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${PAYMENT_CONFIG.receipt_prefix}${type}_${timestamp}_${random}`;
}

// Validate payment amount
export function validatePaymentAmount(amount: number, type?: string): { valid: boolean; message?: string } {
  if (amount <= 0) {
    return { valid: false, message: 'Amount must be greater than 0' };
  }

  if (type && DONATION_TYPES[type as keyof typeof DONATION_TYPES]) {
    const minAmount = DONATION_TYPES[type as keyof typeof DONATION_TYPES].min_amount;
    if (amount < minAmount) {
      return { 
        valid: false, 
        message: `Minimum amount for ${type} is ₹${paiseToRupees(minAmount)}` 
      };
    }
  }

  return { valid: true };
}

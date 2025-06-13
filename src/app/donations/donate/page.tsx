'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, CreditCard, User, Mail, Phone, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Declare Razorpay for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

function DonatePageContent() {
  const searchParams = useSearchParams();
  const donationType = searchParams.get('type') || 'general-sadaqah';

  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    donationType: donationType,
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    message: '',
    isAnonymous: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const donationTypes = {
    'general-sadaqah': {
      title: 'General Sadaqah',
      description: 'Support our daily operations and community programs',
      suggested: [50, 100, 250, 500, 1000],
      type: 'SADAQAH'
    },
    'khums': {
      title: 'Khums',
      description: 'Fulfill your religious obligation',
      suggested: [100, 500, 1000, 2000, 5000],
      type: 'KHUMS'
    },
    'zakat': {
      title: 'Zakat',
      description: 'Purify your wealth through obligatory charity',
      suggested: [200, 500, 1000, 2500, 5000],
      type: 'ZAKAT'
    },
    'student-sponsorship': {
      title: 'Student Sponsorship',
      description: 'Sponsor a student\'s education for a full academic year',
      suggested: [1200, 2400, 3600, 4800, 6000],
      type: 'STUDENT_SPONSORSHIP'
    },
    'building-fund': {
      title: 'Building Fund',
      description: 'Help us expand and improve our facilities',
      suggested: [500, 1000, 2500, 5000, 10000],
      type: 'BUILDING_FUND'
    },
  };

  const currentDonationType = donationTypes[donationType as keyof typeof donationTypes] || donationTypes['general-sadaqah'];

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      toast.error('Payment system unavailable. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!razorpayLoaded) {
      toast.error('Payment system is loading. Please wait.');
      return;
    }

    const amount = formData.amount === 'custom' ? parseFloat(formData.customAmount) : parseFloat(formData.amount);
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!formData.donorName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.donorEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      // Create payment order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          type: 'donation',
          donationType: currentDonationType.type,
          description: `${currentDonationType.title} - ${formData.message || 'Donation'}`,
          donorName: formData.donorName,
          donorEmail: formData.donorEmail,
          donorPhone: formData.donorPhone,
          isAnonymous: formData.isAnonymous,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        // Handle specific error codes
        if (orderData.code === 'PAYMENT_GATEWAY_NOT_CONFIGURED') {
          throw new Error('Payment system is currently unavailable. Please try again later or contact support.');
        }
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Check if this is demo mode
      if (orderData.order.isDemoMode) {
        // Simulate payment success in demo mode
        toast.success('Demo payment successful! (This is a test transaction)');
        // Reset form
        setFormData({
          amount: '',
          customAmount: '',
          donationType: donationType,
          donorName: '',
          donorEmail: '',
          donorPhone: '',
          message: '',
          isAnonymous: false,
        });
        return;
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.order.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: orderData.order.name,
        description: orderData.order.description,
        order_id: orderData.order.orderId,
        prefill: orderData.order.prefill,
        theme: orderData.order.theme,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast.success('Donation successful! Thank you for your generosity.');
              // Reset form
              setFormData({
                amount: '',
                customAmount: '',
                donationType: donationType,
                donorName: '',
                donorEmail: '',
                donorPhone: '',
                message: '',
                isAnonymous: false,
              });
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 pt-32 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="h-16 w-16 mx-auto mb-6 text-green-200" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentDonationType.title}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                {currentDonationType.description}
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Select Donation Amount</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {currentDonationType.suggested.map((amount) => (
                      <label key={amount} className="relative">
                        <input
                          type="radio"
                          name="amount"
                          value={amount.toString()}
                          checked={formData.amount === amount.toString()}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all ${
                          formData.amount === amount.toString()
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-300 text-gray-700 hover:text-green-700 hover:bg-green-50'
                        }`}>
                          <span className="text-lg font-semibold">₹{amount}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div className="flex items-center space-x-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="amount"
                        value="custom"
                        checked={formData.amount === 'custom'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.amount === 'custom'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-green-300 text-gray-700 hover:text-green-700 hover:bg-green-50'
                      }`}>
                        <span className="font-semibold">Custom Amount</span>
                      </div>
                    </label>
                    {formData.amount === 'custom' && (
                      <div className="flex-1">
                        <input
                          type="number"
                          name="customAmount"
                          value={formData.customAmount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Donor Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="donorName"
                          name="donorName"
                          required
                          value={formData.donorName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="donorEmail"
                          name="donorEmail"
                          required
                          value={formData.donorEmail}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="donorPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="donorPhone"
                          name="donorPhone"
                          value={formData.donorPhone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Add a message with your donation"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Anonymous Donation */}
                  <div className="mt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Make this donation anonymous
                      </span>
                    </label>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      Secure Payment: Your payment is processed securely through Razorpay
                    </span>
                  </div>
                </div>

                {/* Demo Mode Notice */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="h-5 w-5 text-yellow-600 mr-2">⚠️</div>
                      <span className="text-sm font-medium text-yellow-800">
                        Demo Mode: This is a test environment. No actual payments will be processed.
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !razorpayLoaded}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CreditCard className="h-6 w-6 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Force dynamic rendering to avoid SSR issues with useSearchParams
export const dynamic = 'force-dynamic';

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    }>
      <DonatePageContent />
    </Suspense>
  );
}

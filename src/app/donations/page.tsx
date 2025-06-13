import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Heart, Users, BookOpen, Building, Zap, Shield, CreditCard, Smartphone } from 'lucide-react';

export default function DonationsPage() {
  const donationTypes = [
    {
      icon: Heart,
      title: "General Sadaqah",
      description: "Support our daily operations and community programs",
      suggested: [50, 100, 250, 500],
      color: "bg-red-500"
    },
    {
      icon: BookOpen,
      title: "Khums",
      description: "Fulfill your religious obligation through our institution",
      suggested: [100, 500, 1000, 2000],
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Zakat",
      description: "Purify your wealth through obligatory charity",
      suggested: [200, 500, 1000, 2500],
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Student Sponsorship",
      description: "Sponsor a student's education for a full academic year",
      suggested: [1200, 2400, 3600, 4800],
      color: "bg-purple-500"
    },
    {
      icon: Building,
      title: "Building Fund",
      description: "Help us expand and improve our facilities",
      suggested: [500, 1000, 2500, 5000],
      color: "bg-orange-500"
    },
    {
      icon: BookOpen,
      title: "Library Fund",
      description: "Support our digital library and educational resources",
      suggested: [100, 250, 500, 1000],
      color: "bg-teal-500"
    }
  ];

  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Credit/Debit Card",
      description: "Secure payment via Razorpay",
      available: true
    },
    {
      icon: Smartphone,
      title: "UPI Payment",
      description: "Pay using UPI apps",
      available: true
    },
    {
      icon: Building,
      title: "Bank Transfer",
      description: "Direct bank transfer",
      available: true
    },
    {
      icon: Smartphone,
      title: "Mobile Wallet",
      description: "PayTM, PhonePe, etc.",
      available: true
    }
  ];

  const impactStats = [
    { number: "1,250", label: "Students Supported", icon: Users },
    { number: "$125K", label: "Raised This Year", icon: Heart },
    { number: "500", label: "Families Helped", icon: Building },
    { number: "95%", label: "Funds to Programs", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 pt-32 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Support Our Mission
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8">
                Your generous donations help us continue providing quality Islamic education 
                and community services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/donations/donate"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Donate Now
                </Link>
                <Link
                  href="/donations/sponsor"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Sponsor a Student
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact</h2>
              <p className="text-lg text-gray-600">See how your donations make a difference</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Donation Types */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Ways to Donate</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from various donation categories that align with your intentions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {donationTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className={`${type.color} p-6 text-white`}>
                      <Icon className="h-8 w-8 mb-3" />
                      <h3 className="text-xl font-bold">{type.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">{type.description}</p>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700">Suggested amounts:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {type.suggested.map((amount, idx) => (
                            <button
                              key={idx}
                              className="border border-gray-300 hover:border-green-500 hover:bg-green-50 px-3 py-2 rounded text-sm font-medium transition-colors text-gray-700 hover:text-green-700"
                            >
                              ₹{amount}
                            </button>
                          ))}
                        </div>
                        <Link
                          href={`/donations/donate?type=${type.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition-colors mt-4"
                        >
                          Donate Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Secure Payment Options</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple secure payment methods for your convenience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                    <Icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    {method.available && (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Transparent</h3>
                <p className="text-gray-600">
                  All donations are processed through secure payment gateways. You will receive 
                  an instant receipt and can track how your donation is being used.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recurring Donations */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Set Up Recurring Donations
                  </h2>
                  <p className="text-lg opacity-90 mb-6">
                    Make a lasting impact with monthly donations. Even small amounts 
                    can make a big difference when given consistently.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Cancel or modify anytime
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Automatic tax receipts
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Monthly impact reports
                    </li>
                  </ul>
                  <Link
                    href="/donations/recurring"
                    className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Set Up Monthly Donation
                  </Link>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-xl p-8">
                    <Heart className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Monthly Donors</h3>
                    <p className="text-4xl font-bold">250+</p>
                    <p className="opacity-90">Committed supporters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in complete transparency about how your donations are used
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">75%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Education Programs</h3>
                <p className="text-gray-600">Direct funding for student education and academic resources</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">20%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Facility Maintenance</h3>
                <p className="text-gray-600">Keeping our facilities safe, clean, and well-maintained</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">5%</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Administration</h3>
                <p className="text-gray-600">Minimal administrative costs to ensure efficient operations</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/donations/reports"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
              >
                View Annual Financial Report
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

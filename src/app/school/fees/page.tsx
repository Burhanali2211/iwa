import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CreditCard, Calendar, CheckCircle, AlertCircle, Download, Receipt, DollarSign, Clock } from 'lucide-react';

export default function FeesPage() {
  const feeStructure = [
    {
      grade: 'Primary School (Grades 1-5)',
      tuitionFee: 2500,
      registrationFee: 200,
      activityFee: 150,
      libraryFee: 100,
      totalFee: 2950
    },
    {
      grade: 'Middle School (Grades 6-8)',
      tuitionFee: 3000,
      registrationFee: 250,
      activityFee: 200,
      libraryFee: 150,
      totalFee: 3600
    },
    {
      grade: 'High School (Grades 9-12)',
      tuitionFee: 3500,
      registrationFee: 300,
      activityFee: 250,
      libraryFee: 200,
      totalFee: 4250
    }
  ];

  const paymentMethods = [
    {
      method: 'Online Payment',
      description: 'Pay securely using credit/debit cards or bank transfer',
      icon: CreditCard,
      processingFee: '2.5%',
      availability: 'Available 24/7'
    },
    {
      method: 'Bank Transfer',
      description: 'Direct transfer to school bank account',
      icon: Receipt,
      processingFee: 'Free',
      availability: 'Business hours'
    },
    {
      method: 'Cash Payment',
      description: 'Pay in person at the school office',
      icon: DollarSign,
      processingFee: 'Free',
      availability: 'Office hours only'
    }
  ];

  const paymentSchedule = [
    {
      installment: '1st Installment',
      dueDate: 'June 30, 2025',
      amount: '50%',
      status: 'upcoming',
      description: 'Registration and first semester fees'
    },
    {
      installment: '2nd Installment',
      dueDate: 'December 15, 2025',
      amount: '50%',
      status: 'upcoming',
      description: 'Second semester fees'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      date: '2025-01-15',
      description: 'Tuition Fee - Grade 8',
      amount: 1800,
      status: 'completed',
      method: 'Online Payment'
    },
    {
      id: 'TXN002',
      date: '2025-01-10',
      description: 'Activity Fee - Grade 8',
      amount: 200,
      status: 'completed',
      method: 'Bank Transfer'
    },
    {
      id: 'TXN003',
      date: '2025-01-05',
      description: 'Library Fee - Grade 8',
      amount: 150,
      status: 'pending',
      method: 'Online Payment'
    }
  ];

  const scholarshipInfo = [
    {
      type: 'Academic Excellence',
      discount: '50%',
      criteria: 'Top 10% academic performance'
    },
    {
      type: 'Financial Need',
      discount: '75%',
      criteria: 'Demonstrated financial hardship'
    },
    {
      type: 'Sibling Discount',
      discount: '15%',
      criteria: 'Multiple children enrolled'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <CreditCard className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                School Fee Payment
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Convenient and secure online fee payment system. 
                Pay your school fees anytime, anywhere with multiple payment options.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fee Structure 2025-2025
              </h2>
              <p className="text-lg text-gray-600">
                Transparent fee structure for all grade levels
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {feeStructure.map((fee, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {fee.grade}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tuition Fee</span>
                      <span className="font-semibold">${fee.tuitionFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Fee</span>
                      <span className="font-semibold">${fee.registrationFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activity Fee</span>
                      <span className="font-semibold">${fee.activityFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Library Fee</span>
                      <span className="font-semibold">${fee.libraryFee.toLocaleString()}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total Annual Fee</span>
                      <span className="text-orange-600">${fee.totalFee.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                    Pay Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Methods
              </h2>
              <p className="text-lg text-gray-600">
                Choose from multiple secure payment options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <method.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.method}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {method.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Processing Fee:</span>
                      <span className="font-medium">{method.processingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Availability:</span>
                      <span className="font-medium">{method.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Schedule */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Schedule
              </h2>
              <p className="text-lg text-gray-600">
                Flexible installment options available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {paymentSchedule.map((schedule, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {schedule.installment}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : schedule.status === 'due'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-gray-600">Due Date: </span>
                      <span className="font-medium ml-1">{schedule.dueDate}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-gray-600">Amount: </span>
                      <span className="font-medium ml-1">{schedule.amount} of total fee</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      {schedule.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Transactions
              </h2>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                View All →
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-orange-600 hover:text-orange-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Financial Assistance Available
              </h2>
              <p className="text-lg text-gray-600">
                Various scholarship and discount programs to help with fees
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scholarshipInfo.map((scholarship, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {scholarship.type}
                  </h3>
                  <div className="text-2xl font-bold text-orange-600 mb-3">
                    {scholarship.discount} OFF
                  </div>
                  <p className="text-gray-700 text-sm">
                    {scholarship.criteria}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/school/admissions"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Apply for Financial Aid
              </Link>
            </div>
          </div>
        </section>

        {/* Payment Form */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Make a Payment
                </h2>
                <p className="text-gray-600">
                  Enter your payment details below
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter student ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select payment type</option>
                    <option value="tuition">Tuition Fee</option>
                    <option value="registration">Registration Fee</option>
                    <option value="activity">Activity Fee</option>
                    <option value="library">Library Fee</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select payment method</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="wallet">Digital Wallet</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Payments?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our finance team is here to assist you with any payment-related questions 
              or issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Contact Finance Office
              </Link>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors">
                Payment FAQ
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

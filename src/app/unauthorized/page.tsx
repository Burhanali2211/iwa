'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-6 rounded-full">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this page. Please contact your administrator 
            if you believe this is an error, or return to a page you have access to.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact our support team at{' '}
            <a href="mailto:support@islamicschool.edu" className="underline">
              support@islamicschool.edu
            </a>{' '}
            or call{' '}
            <a href="tel:+15551234567" className="underline">
              +1 (555) 123-4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

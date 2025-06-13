'use client';

import React from 'react';
import { Loader2, RefreshCw, Database, Wifi, AlertCircle } from 'lucide-react';

// Main loading spinner
export function LoadingSpinner({ 
  size = 'md', 
  color = 'green',
  className = '' 
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'green' | 'blue' | 'gray';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    gray: 'text-gray-600'
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`} 
    />
  );
}

// Full page loading
export function PageLoading({ 
  message = 'Loading...',
  showLogo = true 
}: { 
  message?: string;
  showLogo?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {showLogo && (
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">IWA</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Islamic Center CMS</h2>
          </div>
        )}
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// Card loading skeleton
export function CardSkeleton({ 
  count = 1,
  className = '' 
}: { 
  count?: number;
  className?: string;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`bg-white rounded-lg shadow-sm border p-6 animate-pulse ${className}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 w-12 h-12"></div>
          </div>
        </div>
      ))}
    </>
  );
}

// Table loading skeleton
export function TableSkeleton({ 
  rows = 5,
  columns = 4 
}: { 
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Stats cards loading
export function StatsLoading({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 w-12 h-12"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Content loading with message
export function ContentLoading({ 
  message = 'Loading content...',
  icon: Icon = Database,
  showRetry = false,
  onRetry
}: {
  message?: string;
  icon?: React.ComponentType<any>;
  showRetry?: boolean;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
      <div className="mb-4">
        <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

// Button loading state
export function ButtonLoading({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex items-center justify-center space-x-2 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Network status indicator
export function NetworkStatus({ 
  isOnline = true,
  isConnecting = false 
}: {
  isOnline?: boolean;
  isConnecting?: boolean;
}) {
  if (isConnecting) {
    return (
      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
        <LoadingSpinner size="sm" color="gray" />
        <span className="text-sm">Connecting...</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
      <Wifi className="h-4 w-4" />
      <span className="text-sm">Online</span>
    </div>
  );
}

// Form loading overlay
export function FormLoading({ 
  isVisible = false,
  message = 'Saving...' 
}: {
  isVisible?: boolean;
  message?: string;
}) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-lg">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// List item loading
export function ListItemSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg animate-pulse">
          <div className="bg-gray-200 rounded-lg w-10 h-10"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="bg-gray-200 rounded w-6 h-6"></div>
        </div>
      ))}
    </div>
  );
}

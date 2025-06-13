'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import ErrorBoundary, { SectionErrorBoundary } from './ErrorBoundary';
import { ChevronRight } from 'lucide-react';

interface CMSLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
}

export default function CMSLayout({
  children,
  title,
  description,
  breadcrumbs = [],
  actions
}: CMSLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
        <SectionErrorBoundary sectionName="Navigation Sidebar">
          <AdminSidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </SectionErrorBoundary>

        <main className={`
          min-h-screen transition-all duration-300
          ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-16'}
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm mb-6 p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-gray-900 font-semibold">{crumb.label}</span>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 space-y-4 sm:space-y-0">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm flex-1 mr-0 sm:mr-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {description && (
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                )}
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">System Active</span>
                </div>
              </div>
              {actions && (
                <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-sm">
                  {actions}
                </div>
              )}
            </div>

            {/* Content */}
            <SectionErrorBoundary sectionName="Page Content">
              <div className="space-y-6">
                {children}
              </div>
            </SectionErrorBoundary>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

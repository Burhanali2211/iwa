'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Home,
  BookOpen,
  School,
  Library,
  Heart,
  CalendarDays,
  Phone,
  Edit,
  Eye,
  Plus,
  TrendingUp,
  Users,
  FileText,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CMSSection {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
  stats: {
    total: number;
    published: number;
    lastUpdated: string;
  };
  quickActions: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

interface CMSOverviewStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  totalViews: number;
  recentActivity: Array<{
    id: string;
    action: string;
    section: string;
    timestamp: string;
    user: string;
  }>;
}

export default function CMSOverview() {
  const router = useRouter();
  const [stats, setStats] = useState<CMSOverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCMSStats();
  }, []);

  const fetchCMSStats = async () => {
    try {
      setIsLoading(true);
      // Mock data - replace with actual API call
      const mockStats: CMSOverviewStats = {
        totalContent: 156,
        publishedContent: 142,
        draftContent: 14,
        totalViews: 12450,
        recentActivity: [
          {
            id: '1',
            action: 'Updated hero section',
            section: 'Home Page',
            timestamp: '2024-01-18T10:30:00Z',
            user: 'Admin User'
          },
          {
            id: '2',
            action: 'Published new article',
            section: 'Religious Content',
            timestamp: '2024-01-18T09:15:00Z',
            user: 'Imam Abdullah'
          },
          {
            id: '3',
            action: 'Created new event',
            section: 'Events',
            timestamp: '2024-01-17T16:45:00Z',
            user: 'Event Coordinator'
          },
          {
            id: '4',
            action: 'Updated library catalog',
            section: 'Library',
            timestamp: '2024-01-17T14:20:00Z',
            user: 'Librarian'
          }
        ]
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching CMS stats:', error);
      toast.error('Failed to load CMS statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const cmsSections: CMSSection[] = [
    {
      id: 'home',
      name: 'Home Page',
      description: 'Manage hero section, features, testimonials, and homepage content',
      icon: Home,
      href: '/admin/cms/home',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: {
        total: 6,
        published: 6,
        lastUpdated: '2024-01-18T10:30:00Z'
      },
      quickActions: [
        { label: 'Edit Hero', href: '/admin/cms/home/hero', icon: Edit },
        { label: 'Manage Features', href: '/admin/cms/home/features', icon: Edit },
        { label: 'Preview', href: '/', icon: Eye }
      ]
    },
    {
      id: 'religious',
      name: 'Religious Content',
      description: 'Manage Islamic articles, prayers, Quran content, and khutbas',
      icon: BookOpen,
      href: '/admin/cms/religious',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: {
        total: 45,
        published: 42,
        lastUpdated: '2024-01-18T09:15:00Z'
      },
      quickActions: [
        { label: 'Add Article', href: '/admin/cms/religious/create', icon: Plus },
        { label: 'Manage Articles', href: '/admin/cms/religious/articles', icon: Edit },
        { label: 'Prayer Times', href: '/admin/cms/religious/prayers', icon: Clock }
      ]
    },
    {
      id: 'school',
      name: 'School Management',
      description: 'Manage courses, announcements, faculty, and educational content',
      icon: School,
      href: '/admin/cms/school',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: {
        total: 28,
        published: 25,
        lastUpdated: '2024-01-17T15:45:00Z'
      },
      quickActions: [
        { label: 'Add Course', href: '/admin/cms/school/courses/create', icon: Plus },
        { label: 'Announcements', href: '/admin/cms/school/announcements', icon: Edit },
        { label: 'Faculty', href: '/admin/cms/school/faculty', icon: Users }
      ]
    },
    {
      id: 'library',
      name: 'Library Management',
      description: 'Manage books, digital resources, and library catalog',
      icon: Library,
      href: '/admin/cms/library',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      stats: {
        total: 234,
        published: 230,
        lastUpdated: '2024-01-17T14:20:00Z'
      },
      quickActions: [
        { label: 'Add Book', href: '/admin/cms/library/books/create', icon: Plus },
        { label: 'Categories', href: '/admin/cms/library/categories', icon: Edit },
        { label: 'Digital Resources', href: '/admin/cms/library/digital', icon: FileText }
      ]
    },
    {
      id: 'donations',
      name: 'Donation Management',
      description: 'Manage donation campaigns, goals, and payment methods',
      icon: Heart,
      href: '/admin/cms/donations',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      stats: {
        total: 12,
        published: 8,
        lastUpdated: '2024-01-16T11:30:00Z'
      },
      quickActions: [
        { label: 'New Campaign', href: '/admin/cms/donations/campaigns/create', icon: Plus },
        { label: 'Goals', href: '/admin/cms/donations/goals', icon: TrendingUp },
        { label: 'Payment Methods', href: '/admin/cms/donations/payments', icon: Edit }
      ]
    },
    {
      id: 'events',
      name: 'Events Management',
      description: 'Create and manage Islamic center events and programs',
      icon: CalendarDays,
      href: '/admin/cms/events',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      stats: {
        total: 18,
        published: 15,
        lastUpdated: '2024-01-17T16:45:00Z'
      },
      quickActions: [
        { label: 'Add Event', href: '/admin/cms/events/create', icon: Plus },
        { label: 'Calendar View', href: '/admin/cms/events/calendar', icon: CalendarDays },
        { label: 'Registrations', href: '/admin/cms/events/registrations', icon: Users }
      ]
    },
    {
      id: 'contact',
      name: 'Contact Management',
      description: 'Manage contact information, forms, and location details',
      icon: Phone,
      href: '/admin/cms/contact',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      stats: {
        total: 5,
        published: 5,
        lastUpdated: '2024-01-15T13:20:00Z'
      },
      quickActions: [
        { label: 'Contact Info', href: '/admin/cms/contact/info', icon: Edit },
        { label: 'Forms', href: '/admin/cms/contact/forms', icon: FileText },
        { label: 'Location', href: '/admin/cms/contact/location', icon: Edit }
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'Content Management System' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => window.open('/', '_blank')}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>Preview Site</span>
      </button>
      <button
        onClick={fetchCMSStats}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <BarChart3 className="h-4 w-4" />
        <span>Refresh Stats</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Content Management System" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Content Management System" 
      description="Manage all website content from one central location"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Overview Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publishedContent}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.draftContent}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Edit className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CMS Sections */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmsSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last updated</p>
                        <p className="text-xs text-gray-400">{formatDate(section.stats.lastUpdated)}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{section.stats.published}/{section.stats.total} published</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(section.stats.published / section.stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => router.push(section.href)}
                        className={`w-full ${section.color.replace('text-', 'bg-').replace('-600', '-600')} hover:${section.color.replace('text-', 'bg-').replace('-600', '-700')} text-white px-4 py-2 rounded-lg font-medium transition-colors`}
                      >
                        Manage {section.name}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        {section.quickActions.map((action, index) => {
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => router.push(action.href)}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                            >
                              <ActionIcon className="h-3 w-3" />
                              <span>{action.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="space-y-4">
                {stats?.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.section}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(activity.timestamp)} by {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}

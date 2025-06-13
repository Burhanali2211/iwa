'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Eye,
  Edit,
  Monitor,
  Type,
  BarChart3,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface HomePageSection {
  id: string;
  name: string;
  type: 'hero' | 'features' | 'stats' | 'testimonials' | 'events' | 'daily-content';
  isActive: boolean;
  lastModified: string;
  description: string;
}

export default function HomePageCMS() {
  const router = useRouter();
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomeSections();
  }, []);

  const fetchHomeSections = async () => {
    try {
      setIsLoading(true);
      // For now, using mock data. Later we'll implement API calls
      const mockSections: HomePageSection[] = [
        {
          id: 'hero',
          name: 'Hero Section',
          type: 'hero',
          isActive: true,
          lastModified: '2024-01-15T10:30:00Z',
          description: 'Main banner with title, subtitle, and call-to-action buttons'
        },
        {
          id: 'daily-content',
          name: 'Daily Islamic Content',
          type: 'daily-content',
          isActive: true,
          lastModified: '2024-01-14T15:20:00Z',
          description: 'Prayer times, Quran verse of the day, and Islamic calendar'
        },
        {
          id: 'features',
          name: 'Features Section',
          type: 'features',
          isActive: true,
          lastModified: '2024-01-13T09:15:00Z',
          description: 'Showcase of main website features and services'
        },
        {
          id: 'stats',
          name: 'Statistics Section',
          type: 'stats',
          isActive: true,
          lastModified: '2024-01-12T14:45:00Z',
          description: 'Key numbers and achievements display'
        },
        {
          id: 'events',
          name: 'Upcoming Events',
          type: 'events',
          isActive: true,
          lastModified: '2024-01-11T11:30:00Z',
          description: 'Display of upcoming Islamic events and programs'
        },
        {
          id: 'testimonials',
          name: 'Testimonials',
          type: 'testimonials',
          isActive: true,
          lastModified: '2024-01-10T16:20:00Z',
          description: 'Community feedback and testimonials'
        }
      ];
      
      setSections(mockSections);
    } catch (error) {
      console.error('Error fetching home sections:', error);
      toast.error('Failed to load home page sections');
    } finally {
      setIsLoading(false);
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero':
        return <Monitor className="h-5 w-5" />;
      case 'features':
        return <BarChart3 className="h-5 w-5" />;
      case 'stats':
        return <BarChart3 className="h-5 w-5" />;
      case 'testimonials':
        return <MessageSquare className="h-5 w-5" />;
      case 'events':
        return <BarChart3 className="h-5 w-5" />;
      case 'daily-content':
        return <Type className="h-5 w-5" />;
      default:
        return <Type className="h-5 w-5" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'hero':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'features':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'stats':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'testimonials':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'events':
        return 'bg-indigo-50 border-indigo-200 text-indigo-800';
      case 'daily-content':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Home Page' }
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
        onClick={fetchHomeSections}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Refresh</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Home Page CMS" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Home Page CMS" 
      description="Manage all sections and content on the homepage"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sections</p>
              <p className="text-2xl font-bold text-gray-900">{sections.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Type className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sections</p>
              <p className="text-2xl font-bold text-gray-900">
                {sections.filter(s => s.isActive).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-sm font-bold text-gray-900">
                {sections.length > 0 ? formatDate(sections[0].lastModified) : 'Never'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Status</p>
              <p className="text-sm font-bold text-green-600">Live</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getSectionColor(section.type)}`}>
                    {getSectionIcon(section.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    section.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {section.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Last modified: {formatDate(section.lastModified)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push(`/admin/cms/home/${section.id}`)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Section</span>
                </button>
                <button
                  onClick={() => window.open(`/#${section.id}`, '_blank')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CMSLayout>
  );
}

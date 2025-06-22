'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
      minute: '2-digit',
      hour12: true
    });
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    bgColor,
  }: {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
  }) => (
    <div className="bg-surface p-4 rounded-lg shadow-card flex items-center">
      <div className={`p-3 rounded-lg ${bgColor} mr-4`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-text-muted">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-1">
      <header className="bg-surface p-6 rounded-lg shadow-card mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center text-sm text-text-muted mb-2">
              <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin')}>Admin</span>
              <span className="mx-2">/</span>
              <span>Content Management System</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Content Management System</h1>
            <p className="text-text-secondary mt-1">Manage all website content from one central location</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
              <Eye className="h-4 w-4" />
              Preview Site
            </button>
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              <Activity className="h-4 w-4" />
              Refresh Stats
            </button>
          </div>
        </div>
      </header>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Content" value={stats.totalContent.toString()} icon={FileText} color="text-blue-600" bgColor="bg-blue-100" />
          <StatCard title="Published" value={stats.publishedContent.toString()} icon={BookOpen} color="text-green-600" bgColor="bg-green-100" />
          <StatCard title="Drafts" value={stats.draftContent.toString()} icon={Edit} color="text-yellow-600" bgColor="bg-yellow-100" />
          <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} icon={BarChart3} color="text-purple-600" bgColor="bg-purple-100" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-4">Content Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmsSections.map((section) => (
              <div key={section.id} className="bg-surface p-6 rounded-lg shadow-card flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${section.bgColor} mr-4`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Last updated</p>
                    <p className="text-xs text-text-secondary font-medium">{formatDate(section.stats.lastUpdated)}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground">{section.name}</h3>
                <p className="text-sm text-text-secondary my-2 flex-grow">{section.description}</p>
                <div className="my-4">
                    <div className="flex justify-between items-center text-xs text-text-muted mb-1">
                        <span>{section.stats.published}/{section.stats.total} published</span>
                        <span>{Math.round((section.stats.published/section.stats.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{width: `${(section.stats.published/section.stats.total) * 100}%`}}></div>
                    </div>
                </div>
                <button 
                  onClick={() => router.push(section.href)}
                  className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors mt-auto"
                >
                  Manage {section.name}
                </button>
                <div className="flex justify-center items-center gap-2 mt-4">
                    {section.quickActions.map(action => (
                        <button key={action.label} onClick={() => router.push(action.href)} className="flex items-center gap-2 text-xs text-text-secondary bg-background px-3 py-1.5 rounded-md hover:text-foreground">
                            <action.icon className="h-3 w-3" />
                            {action.label}
                        </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-surface p-6 rounded-lg shadow-card">
            {stats && stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start mb-6 last:mb-0">
                <div className="bg-green-100 p-2.5 rounded-full mr-4">
                    <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-text-secondary">{activity.section}</p>
                  <p className="text-xs text-text-muted mt-1">{formatDate(activity.timestamp)} by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

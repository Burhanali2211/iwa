'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  School,
  Users,
  BookOpen,
  Plus,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  Calendar,
  Bell,
  Clock,
  Award,
  UserCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SchoolContent {
  id: string;
  type: 'course' | 'announcement' | 'faculty' | 'timetable' | 'assignment';
  title: string;
  description: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
}

interface SchoolStats {
  totalCourses: number;
  activeFaculty: number;
  totalStudents: number;
  pendingAssignments: number;
  upcomingExams: number;
  recentAnnouncements: number;
}

export default function SchoolManagementCMS() {
  const router = useRouter();
  const [content, setContent] = useState<SchoolContent[]>([]);
  const [stats, setStats] = useState<SchoolStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'faculty' | 'announcements'>('overview');

  const fetchSchoolData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        limit: '50',
        offset: '0',
        ...(activeTab !== 'overview' && { type: activeTab })
      });

      const response = await fetch(`/api/cms/school?${params}`);
      const result = await response.json();

      if (result.success) {
        setStats(result.data.stats);
        setContent(result.data.content);
      } else {
        toast.error(result.error || 'Failed to load school data');
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
      toast.error('Failed to load school management data');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchSchoolData();
  }, [fetchSchoolData]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5" />;
      case 'announcement':
        return <Bell className="h-5 w-5" />;
      case 'faculty':
        return <Users className="h-5 w-5" />;
      case 'timetable':
        return <Clock className="h-5 w-5" />;
      case 'assignment':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                        <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin/cms')}>CMS</span>
                        <span className="mx-2">/</span>
                        <span>School Management</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">School Management CMS</h1>
                    <p className="text-text-secondary mt-1">Manage courses, announcements, faculty, and educational content</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => window.open('/school', '_blank')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Eye className="h-4 w-4" />
                        Preview School
                    </button>
                    <button onClick={() => router.push('/admin/cms/school/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Content
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Courses</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Active Faculty</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeFaculty}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Pending Tasks</p>
                <p className="text-2xl font-bold text-foreground">{stats.pendingAssignments}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Upcoming Exams</p>
                <p className="text-2xl font-bold text-foreground">{stats.upcomingExams}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Announcements</p>
                <p className="text-2xl font-bold text-foreground">{stats.recentAnnouncements}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-surface rounded-lg shadow-card mb-8">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: School },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'faculty', label: 'Faculty', icon: Users },
              { id: 'announcements', label: 'Announcements', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-all
                    ${activeTab === tab.id
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent text-text-secondary hover:border-gray-300 hover:text-foreground'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Content Table */}
        <div className="p-6">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border bg-background">
                            <th className="p-4 font-semibold text-sm">Title</th>
                            <th className="p-4 font-semibold text-sm">Type</th>
                            <th className="p-4 font-semibold text-sm">Status</th>
                            <th className="p-4 font-semibold text-sm">Last Modified</th>
                            <th className="p-4 font-semibold text-sm">Author</th>
                            <th className="p-4 font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map((item) => (
                            <tr key={item.id} className="border-b border-border hover:bg-background">
                                <td className="p-4 text-sm font-medium text-foreground">{item.title}</td>
                                <td className="p-4 text-sm capitalize">{item.type}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-text-secondary">{formatDate(item.lastModified)}</td>
                                <td className="p-4 text-sm text-text-secondary">{item.author}</td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                                            <Edit className="h-4 w-4"/>
                                        </button>
                                        <button className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-md">
                                            <Eye className="h-4 w-4"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

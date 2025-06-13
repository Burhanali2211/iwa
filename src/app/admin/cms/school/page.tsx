'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
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

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'School Management' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => window.open('/school', '_blank')}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>Preview School</span>
      </button>
      <button
        onClick={() => router.push('/admin/cms/school/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Content</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="School Management CMS" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="School Management CMS" 
      description="Manage courses, announcements, faculty, and educational content"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Faculty</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeFaculty}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingExams}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Announcements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.recentAnnouncements}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="border-b border-gray-200">
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
                  onClick={() => setActiveTab(tab.id as 'overview' | 'courses' | 'faculty' | 'announcements')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Content</h3>
                <div className="space-y-4">
                  {content.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getContentIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                          <span className="text-xs text-gray-400">by {item.author}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/admin/cms/school/${item.type}/${item.id}`)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => router.push('/admin/cms/school/create')}
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Create New Course</p>
                      <p className="text-sm text-gray-600">Add a new educational course</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/school/create')}
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                  >
                    <Bell className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Post Announcement</p>
                      <p className="text-sm text-gray-600">Share important updates</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/school/create')}
                    className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                  >
                    <Users className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Add Faculty Member</p>
                      <p className="text-sm text-gray-600">Register new teacher</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/school/create')}
                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
                  >
                    <Calendar className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">Create Assignment</p>
                      <p className="text-sm text-gray-600">Add new student assignment</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
                <button
                  onClick={() => router.push('/admin/cms/school/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.filter(item => item.type === 'course').map((course) => (
                  <div key={course.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>by {course.author}</span>
                      <span>{formatDate(course.lastModified)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <button
                        onClick={() => router.push(`/admin/cms/school/courses/${course.id}`)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Faculty Management</h3>
                <button
                  onClick={() => router.push('/admin/cms/school/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Faculty</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Faculty management interface will be implemented here.</p>
                <p className="text-sm text-gray-500 mt-2">This will include teacher profiles, qualifications, and assignments.</p>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
                <button
                  onClick={() => router.push('/admin/cms/school/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Announcement</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.filter(item => item.type === 'announcement').map((announcement) => (
                  <div key={announcement.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Bell className="h-6 w-6 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{announcement.title}</h4>
                          <p className="text-gray-600 mb-2">{announcement.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>by {announcement.author}</span>
                            <span>{formatDate(announcement.lastModified)}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(announcement.status)}`}>
                              {announcement.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/admin/cms/school/announcements/${announcement.id}`)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}

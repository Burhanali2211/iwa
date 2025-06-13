'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  Bell, 
  FileText, 
  TrendingUp,
  Award,
  LogOut,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  teacherProfile?: {
    employeeId: string;
    department: string;
    subjects: string[];
  };
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submissionCount: number;
  maxMarks: number;
}

interface TeacherStats {
  totalStudents: number;
  totalAssignments: number;
  pendingGrades: number;
  averageScore: number;
}

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [teacherStats, setTeacherStats] = useState<TeacherStats | null>(null);

  // Fetch teacher data
  const fetchTeacherData = async () => {
    try {
      // Fetch assignments
      const assignmentsResponse = await fetch('/api/assignments');
      if (assignmentsResponse.ok) {
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData.assignments || []);

        // Calculate stats
        const totalAssignments = assignmentsData.assignments?.length || 0;
        const totalSubmissions = assignmentsData.assignments?.reduce((sum: number, assignment: any) =>
          sum + (assignment.submissionCount || 0), 0) || 0;

        setTeacherStats({
          totalStudents: 156, // This would come from actual student count API
          totalAssignments,
          pendingGrades: Math.max(0, totalAssignments - Math.floor(totalSubmissions / 2)),
          averageScore: 87, // This would come from actual grade calculations
        });
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'TEACHER') {
        setUser(parsedUser);
        fetchTeacherData();
      } else {
        toast.error('Access denied. Teacher account required.');
        router.push('/auth/login');
      }
    } else {
      toast.error('Please login to access teacher dashboard.');
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const dashboardCards = [
    {
      title: 'Total Students',
      value: teacherStats ? teacherStats.totalStudents.toString() : 'Loading...',
      change: 'Across all classes',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Assignments',
      value: teacherStats ? teacherStats.totalAssignments.toString() : 'Loading...',
      change: 'Created this term',
      icon: BookOpen,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Grades',
      value: teacherStats ? teacherStats.pendingGrades.toString() : 'Loading...',
      change: 'Need attention',
      icon: ClipboardCheck,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Average Score',
      value: teacherStats ? `${teacherStats.averageScore}%` : 'Loading...',
      change: 'Class performance',
      icon: Award,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const todayClasses = [
    {
      subject: 'Islamic Studies',
      class: 'Grade 8A',
      time: '9:00 AM - 10:00 AM',
      room: 'Room 201',
      status: 'completed'
    },
    {
      subject: 'Arabic Language',
      class: 'Grade 7B',
      time: '10:30 AM - 11:30 AM',
      room: 'Room 105',
      status: 'completed'
    },
    {
      subject: 'Quran Studies',
      class: 'Grade 9A',
      time: '2:00 PM - 3:00 PM',
      room: 'Room 301',
      status: 'upcoming'
    },
    {
      subject: 'Islamic History',
      class: 'Grade 10B',
      time: '3:30 PM - 4:30 PM',
      room: 'Room 205',
      status: 'upcoming'
    }
  ];

  const recentActivities = [
    {
      title: 'Graded Mathematics Quiz - Grade 8A',
      time: '2 hours ago',
      type: 'grading'
    },
    {
      title: 'Created new assignment for Islamic Studies',
      time: '1 day ago',
      type: 'assignment'
    },
    {
      title: 'Updated attendance for Grade 7B',
      time: '2 days ago',
      type: 'attendance'
    },
    {
      title: 'Submitted monthly progress report',
      time: '3 days ago',
      type: 'report'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Employee ID: {user.teacherProfile?.employeeId} | 
              Department: {user.teacherProfile?.department}
            </p>
            {user.teacherProfile?.subjects && user.teacherProfile.subjects.length > 0 && (
              <p className="text-gray-600">
                Subjects: {user.teacherProfile.subjects.join(', ')}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <p className={`text-sm ${card.textColor} mt-1`}>{card.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {todayClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        classItem.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{classItem.subject}</p>
                        <p className="text-sm text-gray-600">{classItem.class} • {classItem.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        classItem.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {classItem.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-600">{activity.time}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.type === 'grading' ? 'bg-purple-100 text-purple-800' :
                        activity.type === 'assignment' ? 'bg-blue-100 text-blue-800' :
                        activity.type === 'attendance' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Plus className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Create Assignment</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <ClipboardCheck className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-gray-900">Mark Attendance</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-gray-900">Grade Papers</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Users className="h-6 w-6 text-orange-600" />
              <span className="font-medium text-gray-900">View Students</span>
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

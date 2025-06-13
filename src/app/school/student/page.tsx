'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  User,
  Bell,
  FileText,
  Clock,
  TrendingUp,
  Award,
  LogOut,
  BarChart3,
  Target
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  studentProfile?: {
    rollNumber: string;
    class: string;
    section?: string;
  };
}

interface Grade {
  id: string;
  examName: string;
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  examDate: string;
  remarks?: string;
}

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
}

export default function StudentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [recentGrades, setRecentGrades] = useState<Grade[]>([]);

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      // Fetch grades
      const gradesResponse = await fetch('/api/grades');
      if (gradesResponse.ok) {
        const gradesData = await gradesResponse.json();
        setGrades(gradesData.grades || []);
        setRecentGrades(gradesData.grades?.slice(0, 4) || []);
      }

      // Fetch attendance
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const attendanceResponse = await fetch(`/api/attendance?month=${currentMonth}&year=${currentYear}`);
      if (attendanceResponse.ok) {
        const attendanceData = await attendanceResponse.json();
        setAttendanceStats(attendanceData.statistics);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'STUDENT') {
        setUser(parsedUser);
        fetchStudentData();
      } else {
        toast.error('Access denied. Student account required.');
        router.push('/auth/login');
      }
    } else {
      toast.error('Please login to access student portal.');
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

  // Calculate average grade
  const calculateAverageGrade = () => {
    if (grades.length === 0) return 'N/A';
    const totalPercentage = grades.reduce((sum, grade) => {
      return sum + (grade.obtainedMarks / grade.maxMarks) * 100;
    }, 0);
    const average = totalPercentage / grades.length;

    if (average >= 90) return 'A+';
    else if (average >= 80) return 'A';
    else if (average >= 70) return 'B+';
    else if (average >= 60) return 'B';
    else if (average >= 50) return 'C';
    else if (average >= 40) return 'D';
    else return 'F';
  };

  const dashboardCards = [
    {
      title: 'Attendance',
      value: attendanceStats ? `${attendanceStats.attendancePercentage.toFixed(1)}%` : 'Loading...',
      change: attendanceStats ? `${attendanceStats.presentDays}/${attendanceStats.totalDays} days` : '',
      icon: Clock,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Average Grade',
      value: calculateAverageGrade(),
      change: `${grades.length} exams`,
      icon: GraduationCap,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Recent Exams',
      value: recentGrades.length.toString(),
      change: 'This month',
      icon: FileText,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Performance',
      value: attendanceStats && grades.length > 0 ? 'Good' : 'N/A',
      change: 'Overall',
      icon: Award,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  // Format recent activities from grades
  const formatRecentActivities = () => {
    return recentGrades.map(grade => {
      const percentage = ((grade.obtainedMarks / grade.maxMarks) * 100).toFixed(1);
      const examDate = new Date(grade.examDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - examDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let timeAgo = '';
      if (diffDays === 1) timeAgo = '1 day ago';
      else if (diffDays < 7) timeAgo = `${diffDays} days ago`;
      else if (diffDays < 30) timeAgo = `${Math.ceil(diffDays / 7)} weeks ago`;
      else timeAgo = `${Math.ceil(diffDays / 30)} months ago`;

      return {
        title: `${grade.subject} - ${grade.examName}`,
        time: timeAgo,
        score: `${percentage}% (${grade.grade})`,
        type: 'exam',
        marks: `${grade.obtainedMarks}/${grade.maxMarks}`
      };
    });
  };

  const recentActivities = formatRecentActivities();

  const upcomingEvents = [
    {
      title: 'Mathematics Exam',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'exam'
    },
    {
      title: 'Islamic History Quiz',
      date: 'Dec 15',
      time: '2:00 PM',
      type: 'quiz'
    },
    {
      title: 'Parent-Teacher Meeting',
      date: 'Dec 18',
      time: '4:00 PM',
      type: 'meeting'
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
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Roll Number: {user.studentProfile?.rollNumber} | 
              Class: {user.studentProfile?.class} {user.studentProfile?.section}
            </p>
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
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                          {activity.marks && (
                            <p className="text-xs text-gray-500">Marks: {activity.marks}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {activity.score}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{activity.type}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent exam results available</p>
                    <p className="text-sm text-gray-400">Your exam results will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming</h2>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{event.date} at {event.time}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.type === 'exam' ? 'bg-red-100 text-red-800' :
                        event.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.type}
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
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-medium text-gray-900">View Assignments</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <GraduationCap className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Check Grades</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-gray-900">View Schedule</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <User className="h-6 w-6 text-orange-600" />
              <span className="font-medium text-gray-900">Update Profile</span>
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

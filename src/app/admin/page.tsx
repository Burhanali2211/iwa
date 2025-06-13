'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { PageLoading, StatsLoading } from '@/components/admin/LoadingStates';
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  BarChart3,
  UserPlus,
  LogOut,
  Shield,
  GraduationCap,
  FileText,
  CheckCircle,
  Activity,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalDonations: number;
  monthlyRevenue: number;
  activeUsers: number;
  pendingAdmissions: number;
  upcomingEvents: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registered' | 'donation_received' | 'assignment_submitted' | 'attendance_marked';
  message: string;
  timestamp: string;
  user?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'ADMIN') {
        setUser(parsedUser);
        fetchDashboardData();
      } else {
        toast.error('Access denied. Admin privileges required.');
        router.push('/auth/login');
      }
    } else {
      toast.error('Please login to access admin dashboard.');
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setStatsLoading(true);

      // Fetch dashboard statistics from the new API
      const response = await fetch('/api/admin/stats');

      if (response.ok) {
        const data = await response.json();
        const statsData = data.stats;

        setStats({
          totalUsers: statsData.totalUsers,
          totalStudents: statsData.totalStudents,
          totalTeachers: statsData.totalTeachers,
          totalDonations: statsData.totalDonations,
          monthlyRevenue: statsData.monthlyRevenue,
          activeUsers: statsData.activeUsers,
          pendingAdmissions: statsData.pendingAdmissions,
          upcomingEvents: statsData.upcomingEvents,
        });

        setRecentActivities(statsData.recentActivities);
      } else {
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setStatsLoading(false);
    }
  };

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
    return <PageLoading message="Loading admin dashboard..." />;
  }

  if (!user) {
    return null;
  }

  const getDashboardCards = () => {
    if (!stats) return [];

    return [
      {
        title: 'Total Users',
        value: stats.totalUsers.toLocaleString(),
        change: `${stats.activeUsers} active users`,
        icon: Users,
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600'
      },
      {
        title: 'Students',
        value: stats.totalStudents.toLocaleString(),
        change: `${stats.pendingAdmissions} pending admissions`,
        icon: GraduationCap,
        color: 'bg-green-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600'
      },
      {
        title: 'Monthly Revenue',
        value: `₹${stats.monthlyRevenue.toLocaleString()}`,
        change: `${stats.totalDonations} total donations`,
        icon: DollarSign,
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600'
      },
      {
        title: 'Teachers',
        value: stats.totalTeachers.toLocaleString(),
        change: `${stats.upcomingEvents} upcoming events`,
        icon: BookOpen,
        color: 'bg-orange-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600'
      }
    ];
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <UserPlus className="h-5 w-5 text-green-600" />;
      case 'donation_received':
        return <DollarSign className="h-5 w-5 text-purple-600" />;
      case 'assignment_submitted':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'attendance_marked':
        return <CheckCircle className="h-5 w-5 text-teal-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const quickStats = [
    { label: 'Students', value: '856', color: 'text-blue-600' },
    { label: 'Teachers', value: '45', color: 'text-green-600' },
    { label: 'Parents', value: '346', color: 'text-purple-600' },
    { label: 'Courses', value: '28', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className={`
        min-h-screen transition-all duration-300
        ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-16'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 space-y-4 lg:space-y-0">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm flex-1 lg:mr-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-4">
              Welcome back, {user.name} | System Administrator
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">System Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-blue-600 font-medium">All Services Running</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-sm">
            <button className="relative p-3 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-white/50 rounded-xl">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-white/50 rounded-xl">
              <Settings className="h-6 w-6" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <StatsLoading count={4} />
          ) : (
            getDashboardCards().map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:bg-white/80 transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-1">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                      <p className={`text-sm font-medium ${card.textColor}`}>{card.change}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className={`h-7 w-7 ${card.textColor}`} />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${card.bgColor.replace('bg-', 'bg-gradient-to-r from-').replace('-100', '-400 to-').replace('-100', '-600')} rounded-full transition-all duration-1000 ease-out`} style={{width: '75%'}}></div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <div className="p-2 bg-green-100 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-200 border border-gray-100/50 hover:shadow-md">
                      <div className="flex-shrink-0 mt-1 p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 mb-1">{activity.message}</p>
                        <p className="text-sm text-gray-600 mb-1">{formatTimeAgo(activity.timestamp)}</p>
                        {activity.user && (
                          <p className="text-xs text-green-600 font-medium">by {activity.user}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gray-100 rounded-2xl w-fit mx-auto mb-4">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <p className="text-gray-500 font-medium">No recent activities</p>
                    <p className="text-sm text-gray-400 mt-1">Activities will appear here as they occur</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Stats</h2>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="space-y-6">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-100/50">
                    <span className="text-gray-700 font-medium">{stat.label}</span>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <div className="p-3 bg-green-100 rounded-2xl w-fit mx-auto mb-3">
                    <Shield className="h-8 w-8 text-green-600 mx-auto" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">System Status</p>
                  <p className="text-xs text-green-600 font-semibold">All systems operational</p>
                  <div className="flex items-center justify-center mt-2 space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="mt-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span>Quick Actions</span>
              <div className="ml-3 p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                <Layers className="h-5 w-5 text-green-600" />
              </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/admin/users')}
                className="flex items-center space-x-3 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/50 hover:shadow-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
              >
                <div className="p-2 bg-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Manage Users</span>
              </button>
              <button
                onClick={() => router.push('/admin/courses')}
                className="flex items-center space-x-3 p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200/50 hover:shadow-lg hover:from-green-100 hover:to-green-200 transition-all duration-300 group"
              >
                <div className="p-2 bg-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Manage Courses</span>
              </button>
              <button
                onClick={() => router.push('/admin/reports')}
                className="flex items-center space-x-3 p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200/50 hover:shadow-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group"
              >
                <div className="p-2 bg-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Reports</span>
              </button>
              <button
                onClick={() => router.push('/admin/settings')}
                className="flex items-center space-x-3 p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200/50 hover:shadow-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-300 group"
              >
                <div className="p-2 bg-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Settings</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

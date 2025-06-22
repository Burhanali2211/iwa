'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Header from '@/components/admin/dashboard/Header';
import StatCard from '@/components/admin/dashboard/StatCard';
import ProjectAnalytics from '@/components/admin/dashboard/ProjectAnalytics';
import Reminders from '@/components/admin/dashboard/Reminders';
import ProjectList from '@/components/admin/dashboard/ProjectList';
import RecentRegistrations from '@/components/admin/dashboard/RecentRegistrations';
import ProjectProgress from '@/components/admin/dashboard/ProjectProgress';
import TimeTracker from '@/components/admin/dashboard/TimeTracker';

// Define interfaces for our data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  activeUsers: number;
  pendingAdmissions: number;
  recentActivities: any[];
  activeUsersPercentage: number;
  upcomingEvents: any[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData) as User;
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
  }, [router]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/stats');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading || !stats || !user) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div>
      <Header user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-[192px] gap-6">
        <div className="lg:col-span-1 lg:row-span-1">
            <StatCard 
            title="Total Students" 
            value={stats.totalStudents.toString()}
            change="+5.2%"
            isHighlighted 
            />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
            <StatCard 
            title="Total Teachers" 
            value={stats.totalTeachers.toString()}
            change="+1.2%"
            />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
            <StatCard 
            title="Active Users" 
            value={stats.activeUsers.toString()}
            change="+2.8%"
            />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
            <StatCard 
            title="Pending Admissions" 
            value={stats.pendingAdmissions.toString()}
            change="Needs review"
            />
        </div>

        <div className="lg:col-span-2 lg:row-span-2">
            <RecentRegistrations teamMembers={stats.recentActivities.slice(0, 4)} />
        </div>

        <div className="lg:col-span-2 lg:row-span-2">
            <ProjectList />
        </div>
        
        <div className="lg:col-span-2 lg:row-span-2">
            <ProjectAnalytics />
        </div>
        
        <div className="lg:col-span-1 lg:row-span-1">
            <ProjectProgress 
                percentage={stats.activeUsersPercentage}
                title="Active User Rate"
            />
        </div>
        <div className="lg:col-span-1 lg:row-span-1">
          <TimeTracker />
        </div>
      </div>
    </div>
  );
}

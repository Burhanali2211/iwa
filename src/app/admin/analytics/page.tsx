'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Users, DollarSign, BookOpen, Activity, ArrowUp, ArrowDown } from 'lucide-react';

// A more visually appealing, CSS-based bar chart component
const BarChart = ({ data }: { data: { name: string, value: number }[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="h-80 w-full flex items-end justify-around gap-4 p-4">
      {data.map(d => (
        <div key={d.name} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all"
            style={{ height: `${(d.value / maxValue) * 100}%` }}
          />
          <span className="text-xs font-medium text-text-muted">{d.name}</span>
        </div>
      ))}
    </div>
  );
};

const RoleDistribution = ({ stats }: { stats: any }) => {
    const roles = [
        { name: 'Students', value: stats.totalStudents, color: 'bg-blue-500' },
        { name: 'Teachers', value: stats.totalTeachers, color: 'bg-green-500' },
        { name: 'Parents', value: stats.totalParents, color: 'bg-purple-500' },
    ];
    const total = roles.reduce((acc, role) => acc + role.value, 0);

    return (
        <div>
            <div className="flex w-full h-8 rounded-full overflow-hidden mb-4">
                {roles.map(role => (
                    <div key={role.name} className={`${role.color}`} style={{ width: `${(role.value / total) * 100}%`}} />
                ))}
            </div>
            <div className="space-y-2">
                {roles.map(role => (
                    <div key={role.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${role.color}`} />
                            <span className="text-text-secondary">{role.name}</span>
                        </div>
                        <span className="font-semibold text-foreground">{role.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                if (!response.ok) throw new Error('Failed to fetch stats');
                const data = await response.json();
                setStats(data.stats);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading || !stats) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }
    
    const userTrendData = [
        { name: 'Jan', value: 50 }, { name: 'Feb', value: 75 }, { name: 'Mar', value: 120 },
        { name: 'Apr', value: 90 }, { name: 'May', value: 150 }, { name: 'Jun', value: 130 },
        { name: 'Jul', value: 180 },
    ];

    const overviewCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: Users, change: stats.userGrowth, trend: 'up' },
        { title: 'Monthly Revenue', value: `₹${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, change: stats.revenueGrowth, trend: 'up' },
        { title: 'Total Articles', value: stats.totalArticles, icon: BookOpen, change: 5, trend: 'down' },
        { title: 'Upcoming Events', value: stats.upcomingEvents, icon: Activity, change: 2, trend: 'up' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-text-secondary">In-depth analysis of website data and user engagement.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 auto-rows-[192px]">
                <div className="lg:col-span-4 lg:row-span-2 bg-surface p-6 rounded-2xl shadow-md flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-4">User Registration Trend</h3>
                    <div className="flex-grow">
                        <BarChart data={userTrendData} />
                    </div>
                </div>

                <div className="lg:col-span-2 lg:row-span-1 bg-surface p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Total Users</h3>
                    <p className="text-4xl font-bold text-foreground">{stats.totalUsers}</p>
                    <div className={`mt-2 flex items-center text-sm ${stats.userGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stats.userGrowth > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        <span>{stats.userGrowth}% from last month</span>
                    </div>
                </div>

                <div className="lg:col-span-2 lg:row-span-1 bg-surface p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Revenue</h3>
                     <p className="text-4xl font-bold text-foreground">₹{stats.monthlyRevenue.toLocaleString()}</p>
                    <div className={`mt-2 flex items-center text-sm ${stats.revenueGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stats.revenueGrowth > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        <span>{stats.revenueGrowth}% from last month</span>
                    </div>
                </div>
                
                <div className="lg:col-span-3 lg:row-span-2 bg-surface p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-4">User Role Distribution</h3>
                    <RoleDistribution stats={stats} />
                </div>

                <div className="lg:col-span-3 lg:row-span-2 bg-surface p-6 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h3>
                     <ul className="space-y-4">
                        {stats.recentActivities.slice(0, 5).map((activity: any) => (
                            <li key={activity.id} className="flex items-center gap-4 text-sm">
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    {activity.type === 'user_registered' ? <Users className="h-4 w-4 text-blue-500" /> : <DollarSign className="h-4 w-4 text-green-500" />}
                                </div>
                                <span className="text-text-secondary flex-1">{activity.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
} 
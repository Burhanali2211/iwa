import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

// GET - Fetch dashboard statistics (Admin only)
export async function GET(request: NextRequest) {
  try {
    console.log('Admin stats API called');
    
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      console.log('Auth failed:', authResult.error);
      return authResult.error;
    }

    console.log('Auth successful, user:', authResult.user);

    // Get current date for monthly calculations
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    console.log('Fetching database statistics...');

    // Fetch all statistics in parallel
    const [
      totalUsersResult,
      totalStudentsResult,
      totalTeachersResult,
      totalParentsResult,
      activeUsersResult,
      totalDonationsResult,
      monthlyDonationsResult,
      totalEventsResult,
      upcomingEventsResult,
      recentRegistrationsResult,
      pendingAdmissionsResult,
    ] = await Promise.all([
      // Total users count
      supabase.from('users').select('id', { count: 'exact', head: true }),
      
      // Total students count
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'STUDENT'),
      
      // Total teachers count
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'TEACHER'),
      
      // Total parents count
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'PARENT'),
      
      // Active users count
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('is_active', true),
      
      // Total donations count
      supabase.from('donations').select('id', { count: 'exact', head: true }),
      
      // Monthly donations (current month)
      supabase.from('donations')
        .select('amount')
        .gte('created_at', firstDayOfMonth.toISOString())
        .lte('created_at', lastDayOfMonth.toISOString())
        .eq('status', 'COMPLETED'),
      
      // Total events count
      supabase.from('events').select('id', { count: 'exact', head: true }),
      
      // Upcoming events count
      supabase.from('events')
        .select('id', { count: 'exact', head: true })
        .gte('start_date', now.toISOString()),
      
      // Recent registrations (last 30 days)
      supabase.from('users')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      
      // Pending admissions (students with 'Unassigned' class)
      supabase.from('students')
        .select('id', { count: 'exact', head: true })
        .eq('class', 'Unassigned'),
    ]);

    console.log('Database queries completed');

    // Extract counts
    const totalUsers = totalUsersResult.count || 0;
    const totalStudents = totalStudentsResult.count || 0;
    const totalTeachers = totalTeachersResult.count || 0;
    const totalParents = totalParentsResult.count || 0;
    const activeUsers = activeUsersResult.count || 0;
    const totalDonations = totalDonationsResult.count || 0;
    const monthlyDonations = monthlyDonationsResult.data || [];
    const totalEvents = totalEventsResult.count || 0;
    const upcomingEvents = upcomingEventsResult.count || 0;
    const recentRegistrations = recentRegistrationsResult.count || 0;
    const pendingAdmissions = pendingAdmissionsResult.count || 0;

    console.log('Extracted counts:', {
      totalUsers,
      totalStudents,
      totalTeachers,
      totalParents,
      activeUsers,
      totalDonations,
      totalEvents,
      upcomingEvents,
      recentRegistrations,
      pendingAdmissions
    });

    // Calculate monthly revenue
    const monthlyRevenue = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);

    // Get recent activities
    const recentUsersResult = await supabase
      .from('users')
      .select('id, name, role, created_at')
      .gte('created_at', new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(5);

    const recentDonationsResult = await supabase
      .from('donations')
      .select('id, donor_name, amount, donation_type, created_at')
      .gte('created_at', new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .eq('status', 'COMPLETED')
      .order('created_at', { ascending: false })
      .limit(5);

    const recentUsers = recentUsersResult.data || [];
    const recentDonations = recentDonationsResult.data || [];

    // Format recent activities
    const recentActivities = [
      ...recentUsers.map(user => ({
        id: `user-${user.id}`,
        type: 'user_registered' as const,
        message: `New ${user.role.toLowerCase()} registration: ${user.name}`,
        timestamp: user.created_at,
        user: user.name,
      })),
      ...recentDonations.map(donation => ({
        id: `donation-${donation.id}`,
        type: 'donation_received' as const,
        message: `Donation received: ₹${donation.amount.toLocaleString()} for ${donation.donation_type}`,
        timestamp: donation.created_at,
        user: donation.donor_name,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

    // Calculate growth percentages (mock data for now - you can implement actual calculations)
    const stats = {
      totalUsers,
      totalStudents,
      totalTeachers,
      totalParents,
      activeUsers,
      totalDonations,
      monthlyRevenue,
      totalEvents,
      upcomingEvents,
      totalArticles: 0, // Not implemented yet
      recentRegistrations,
      pendingAdmissions,
      
      // Growth percentages (you can calculate these based on previous month data)
      userGrowth: Math.floor(Math.random() * 20) + 5, // Mock data
      studentGrowth: Math.floor(Math.random() * 15) + 3, // Mock data
      revenueGrowth: Math.floor(Math.random() * 25) + 10, // Mock data
      
      // Recent activities
      recentActivities,
      
      // Additional metrics
      averageDonation: monthlyDonations.length > 0 ? monthlyRevenue / monthlyDonations.length : 0,
      activeUsersPercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
    };

    console.log('Returning stats:', stats);

    return NextResponse.json({
      success: true,
      stats,
    });

  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Additional endpoint for real-time metrics
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const { metric, timeRange = '7d' } = body;

    const whereClause: { createdAt?: { gte: Date } } = {};
    const now = new Date();
    
    // Set time range
    switch (timeRange) {
      case '24h':
        whereClause.createdAt = {
          gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        };
        break;
      case '7d':
        whereClause.createdAt = {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      case '30d':
        whereClause.createdAt = {
          gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        };
        break;
      case '1y':
        whereClause.createdAt = {
          gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        };
        break;
    }

    let result;

    switch (metric) {
      case 'user_registrations':
        result = await supabase.from('users').select('id', { count: 'exact', head: true }).eq('created_at', whereClause.createdAt);
        break;
        
      case 'donations':
        result = await supabase.from('donations').select('id', { count: 'exact', head: true }).eq('created_at', whereClause.createdAt).eq('status', 'COMPLETED');
        break;
        
      case 'attendance':
        result = await supabase.from('attendances').select('id', { count: 'exact', head: true }).eq('created_at', whereClause.createdAt);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid metric requested' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      metric,
      timeRange,
      data: result,
    });

  } catch (error) {
    console.error('Get metric data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metric data' },
      { status: 500 }
    );
  }
}

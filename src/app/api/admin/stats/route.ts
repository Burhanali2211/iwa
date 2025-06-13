import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch dashboard statistics (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    // Get current date for monthly calculations
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Fetch all statistics in parallel
    const [
      totalUsers,
      totalStudents,
      totalTeachers,
      totalParents,
      activeUsers,
      totalDonations,
      monthlyDonations,
      totalEvents,
      upcomingEvents,
      totalArticles,
      recentRegistrations,
      pendingAdmissions,
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),
      
      // Total students count
      prisma.user.count({
        where: { role: 'STUDENT' }
      }),
      
      // Total teachers count
      prisma.user.count({
        where: { role: 'TEACHER' }
      }),
      
      // Total parents count
      prisma.user.count({
        where: { role: 'PARENT' }
      }),
      
      // Active users count
      prisma.user.count({
        where: { isActive: true }
      }),
      
      // Total donations count
      prisma.donation.count(),
      
      // Monthly donations (current month)
      prisma.donation.findMany({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          status: 'COMPLETED',
        },
        select: {
          amount: true,
        },
      }),
      
      // Total events count
      prisma.event.count(),
      
      // Upcoming events count
      prisma.event.count({
        where: {
          startDate: {
            gte: now,
          },
        },
      }),
      
      // Total articles count
      prisma.article.count(),
      
      // Recent registrations (last 30 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // Pending admissions (students with 'Unassigned' class)
      prisma.student.count({
        where: {
          class: 'Unassigned',
        },
      }),
    ]);

    // Calculate monthly revenue
    const monthlyRevenue = monthlyDonations.reduce((sum, donation) => sum + donation.amount, 0);

    // Get recent activities
    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        id: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    const recentDonations = await prisma.donation.findMany({
      where: {
        createdAt: {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        id: true,
        donorName: true,
        amount: true,
        donationType: true,
        createdAt: true,
      },
    });

    // Format recent activities
    const recentActivities = [
      ...recentUsers.map(user => ({
        id: `user-${user.id}`,
        type: 'user_registered' as const,
        message: `New ${user.role.toLowerCase()} registration: ${user.name}`,
        timestamp: user.createdAt.toISOString(),
        user: user.name,
      })),
      ...recentDonations.map(donation => ({
        id: `donation-${donation.id}`,
        type: 'donation_received' as const,
        message: `Donation received: ₹${donation.amount.toLocaleString()} for ${donation.donationType}`,
        timestamp: donation.createdAt.toISOString(),
        user: donation.donorName,
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
      totalArticles,
      recentRegistrations,
      pendingAdmissions,
      
      // Growth percentages (you can calculate these based on previous month data)
      userGrowth: Math.floor(Math.random() * 20) + 5, // Mock data
      studentGrowth: Math.floor(Math.random() * 15) + 3, // Mock data
      revenueGrowth: Math.floor(Math.random() * 25) + 10, // Mock data
      
      // Recent activities
      recentActivities,
      
      // Additional metrics
      averageDonation: totalDonations > 0 ? monthlyRevenue / monthlyDonations.length : 0,
      activeUsersPercentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
    };

    return NextResponse.json({
      success: true,
      stats,
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
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
        result = await prisma.user.groupBy({
          by: ['role'],
          where: whereClause,
          _count: {
            id: true,
          },
        });
        break;
        
      case 'donations':
        result = await prisma.donation.groupBy({
          by: ['donationType'],
          where: {
            ...whereClause,
            status: 'COMPLETED',
          },
          _sum: {
            amount: true,
          },
          _count: {
            id: true,
          },
        });
        break;
        
      case 'attendance':
        result = await prisma.attendance.groupBy({
          by: ['status'],
          where: whereClause,
          _count: {
            id: true,
          },
        });
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

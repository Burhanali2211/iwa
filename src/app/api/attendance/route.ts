import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const markAttendanceSchema = z.object({
  userId: z.string(),
  date: z.string(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY']),
  remarks: z.string().optional(),
});

const bulkAttendanceSchema = z.object({
  date: z.string(),
  attendanceRecords: z.array(z.object({
    userId: z.string(),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY']),
    remarks: z.string().optional(),
  })),
});

// GET - Fetch attendance records
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return authResult.error;
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const whereClause: { userId?: string; date?: { gte: Date; lte: Date } } = {};

    // If user is a student, only show their attendance
    if (authResult.user.role === 'STUDENT') {
      whereClause.userId = authResult.user.userId;
    } else if (userId) {
      // Teachers/Admin can filter by user
      whereClause.userId = userId;
    }

    // Date filtering
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (month && year) {
      const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0);
      whereClause.date = {
        gte: startOfMonth,
        lte: endOfMonth,
      };
    }

    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          }
        },
        student: {
          select: {
            rollNumber: true,
            class: true,
            section: true,
          }
        },
        teacher: {
          select: {
            employeeId: true,
            department: true,
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    // Calculate attendance statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'PRESENT').length;
    const absentDays = attendance.filter(a => a.status === 'ABSENT').length;
    const lateDays = attendance.filter(a => a.status === 'LATE').length;
    const halfDays = attendance.filter(a => a.status === 'HALF_DAY').length;
    
    const attendancePercentage = totalDays > 0 ? ((presentDays + (halfDays * 0.5)) / totalDays) * 100 : 0;

    return NextResponse.json({
      success: true,
      attendance,
      statistics: {
        totalDays,
        presentDays,
        absentDays,
        lateDays,
        halfDays,
        attendancePercentage: Math.round(attendancePercentage * 100) / 100,
      }
    });

  } catch (error) {
    console.error('Get attendance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

// POST - Mark attendance (Teachers and Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['TEACHER', 'ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    
    // Check if it's bulk attendance or single attendance
    if (body.attendanceRecords) {
      // Bulk attendance
      const validatedData = bulkAttendanceSchema.parse(body);
      
      const attendanceRecords = [];
      
      for (const record of validatedData.attendanceRecords) {
        // Check if attendance already exists for this user and date
        const existingAttendance = await prisma.attendance.findUnique({
          where: {
            userId_date: {
              userId: record.userId,
              date: new Date(validatedData.date),
            }
          }
        });

        if (existingAttendance) {
          // Update existing attendance
          const updated = await prisma.attendance.update({
            where: { id: existingAttendance.id },
            data: {
              status: record.status,
              remarks: record.remarks,
            },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          });
          attendanceRecords.push(updated);
        } else {
          // Create new attendance record
          const created = await prisma.attendance.create({
            data: {
              userId: record.userId,
              date: new Date(validatedData.date),
              status: record.status,
              remarks: record.remarks,
            },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                }
              }
            }
          });
          attendanceRecords.push(created);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Bulk attendance marked successfully',
        attendanceRecords,
      });

    } else {
      // Single attendance
      const validatedData = markAttendanceSchema.parse(body);

      // Check if attendance already exists
      const existingAttendance = await prisma.attendance.findUnique({
        where: {
          userId_date: {
            userId: validatedData.userId,
            date: new Date(validatedData.date),
          }
        }
      });

      let attendance;

      if (existingAttendance) {
        // Update existing attendance
        attendance = await prisma.attendance.update({
          where: { id: existingAttendance.id },
          data: {
            status: validatedData.status,
            remarks: validatedData.remarks,
          },
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        });
      } else {
        // Create new attendance record
        attendance = await prisma.attendance.create({
          data: {
            userId: validatedData.userId,
            date: new Date(validatedData.date),
            status: validatedData.status,
            remarks: validatedData.remarks,
          },
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Attendance marked successfully',
        attendance,
      });
    }

  } catch (error) {
    console.error('Mark attendance error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}

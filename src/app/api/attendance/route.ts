import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

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

    let query = supabase
      .from('attendances')
      .select('*, users(name, email, role), students(roll_number, class, section), teachers(employee_id, department)');

    // If user is a student, only show their attendance
    if (authResult.user.role === 'STUDENT') {
      query = query.eq('user_id', authResult.user.userId);
    } else if (userId) {
      // Teachers/Admin can filter by user
      query = query.eq('user_id', userId);
    }

    // Date filtering
    if (startDate && endDate) {
      query = query.gte('date', startDate).lte('date', endDate);
    } else if (month && year) {
      const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1).toISOString().slice(0, 10);
      const endOfMonth = new Date(parseInt(year), parseInt(month), 0).toISOString().slice(0, 10);
      query = query.gte('date', startOfMonth).lte('date', endOfMonth);
    }

    const { data: attendance, error } = await query.order('date', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch attendance' },
        { status: 500 }
      );
    }

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
        const { data: existingAttendance } = await supabase
          .from('attendances')
          .select('id')
          .eq('user_id', record.userId)
          .eq('date', validatedData.date)
          .single();

        if (existingAttendance) {
          // Update existing attendance
          const { data: updated } = await supabase
            .from('attendances')
            .update({
              status: record.status,
              remarks: record.remarks,
            })
            .eq('id', existingAttendance.id)
            .select('*, users(name, email)')
            .single();
          attendanceRecords.push(updated);
        } else {
          // Create new attendance record
          const { data: created } = await supabase
            .from('attendances')
            .insert({
              user_id: record.userId,
              date: validatedData.date,
              status: record.status,
              remarks: record.remarks,
            })
            .select('*, users(name, email)')
            .single();
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
      const { data: existingAttendance } = await supabase
        .from('attendances')
        .select('id')
        .eq('user_id', validatedData.userId)
        .eq('date', validatedData.date)
        .single();

      if (existingAttendance) {
        // Update existing attendance
        const { data: updated } = await supabase
          .from('attendances')
          .update({
            status: validatedData.status,
            remarks: validatedData.remarks,
          })
          .eq('id', existingAttendance.id)
          .select('*, users(name, email)')
          .single();
        return NextResponse.json({
          success: true,
          message: 'Attendance updated successfully',
          attendance: updated,
        });
      } else {
        // Create new attendance record
        const { data: created } = await supabase
          .from('attendances')
          .insert({
            user_id: validatedData.userId,
            date: validatedData.date,
            status: validatedData.status,
            remarks: validatedData.remarks,
          })
          .select('*, users(name, email)')
          .single();
        return NextResponse.json({
          success: true,
          message: 'Attendance marked successfully',
          attendance: created,
        });
      }
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

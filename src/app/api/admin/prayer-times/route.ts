import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get prayer times configuration from Supabase
    const { data: prayerTimes, error } = await supabase
      .from('prayer_times')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch prayer times' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: prayerTimes
    });
  } catch (error) {
    console.error('Prayer times GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prayer times' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, latitude, longitude, timezone, calculationMethod, adjustments } = body;

    const { data: prayerTimes, error } = await supabase
      .from('prayer_times')
      .insert({
        location,
        latitude,
        longitude,
        timezone,
        calculation_method: calculationMethod,
        adjustments: JSON.stringify(adjustments)
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create prayer times configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: prayerTimes
    });
  } catch (error) {
    console.error('Prayer times POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create prayer times configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, location, latitude, longitude, timezone, calculationMethod, adjustments } = body;

    const { data: prayerTimes, error } = await supabase
      .from('prayer_times')
      .update({
        location,
        latitude,
        longitude,
        timezone,
        calculation_method: calculationMethod,
        adjustments: JSON.stringify(adjustments)
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update prayer times configuration' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: prayerTimes
    });
  } catch (error) {
    console.error('Prayer times PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update prayer times configuration' },
      { status: 500 }
    );
  }
} 
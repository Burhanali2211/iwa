import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('islamic_events')
      .select('*')
      .order('gregorian_date', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch Islamic events' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Islamic events GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Islamic events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, hijriDate, gregorianDate, eventType, isPublic, notifications } = body;

    const { data: event, error } = await supabase
      .from('islamic_events')
      .insert({
        title,
        description,
        hijri_date: hijriDate,
        gregorian_date: gregorianDate,
        event_type: eventType,
        is_public: isPublic,
        notifications
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create Islamic event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Islamic events POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create Islamic event' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, hijriDate, gregorianDate, eventType, isPublic, notifications } = body;

    const { data: event, error } = await supabase
      .from('islamic_events')
      .update({
        title,
        description,
        hijri_date: hijriDate,
        gregorian_date: gregorianDate,
        event_type: eventType,
        is_public: isPublic,
        notifications
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update Islamic event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Islamic events PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update Islamic event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('islamic_events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete Islamic event' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Islamic event deleted successfully'
    });
  } catch (error) {
    console.error('Islamic events DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete Islamic event' },
      { status: 500 }
    );
  }
} 
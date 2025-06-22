import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Optional: Protect this route if needed
    // const authResult = await requireAuth(request, ['ADMIN']);
    // if ('error' in authResult) {
    //   return authResult.error;
    // }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true })
      .range(from, to);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }
    
    const { count: totalCount, error: countError } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        page,
        limit,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date string",
  }),
  event_type: z.enum(['SCHOOL', 'RELIGIOUS', 'COMMUNITY']),
  description: z.string().optional(),
  end_date: z.string().optional(),
  location: z.string().optional(),
  is_public: z.boolean().optional(),
  image_url: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth(request, ['ADMIN']);
        if ('error' in authResult) {
            return authResult.error;
        }

        const body = await request.json();
        const validatedData = createEventSchema.parse(body);

        const { data: newEvent, error } = await supabase
            .from('events')
            .insert({
                ...validatedData,
                created_by: authResult.user.userId,
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to create event' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 
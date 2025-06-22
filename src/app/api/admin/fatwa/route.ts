import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: fatwas, error } = await supabase
      .from('fatwas')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch fatwas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fatwas
    });
  } catch (error) {
    console.error('Fatwas GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fatwas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      question, 
      answer, 
      questioner, 
      mufti, 
      date, 
      category, 
      language, 
      status, 
      tags, 
      references, 
      isPublic, 
      priority, 
      attachments 
    } = body;

    const { data: fatwa, error } = await supabase
      .from('fatwas')
      .insert({
        question,
        answer,
        questioner,
        mufti,
        date,
        category,
        language,
        status,
        tags: JSON.stringify(tags),
        references: JSON.stringify(references),
        is_public: isPublic,
        priority,
        attachments: JSON.stringify(attachments)
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create fatwa' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fatwa
    });
  } catch (error) {
    console.error('Fatwas POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create fatwa' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      question, 
      answer, 
      questioner, 
      mufti, 
      date, 
      category, 
      language, 
      status, 
      tags, 
      references, 
      isPublic, 
      priority, 
      attachments 
    } = body;

    const { data: fatwa, error } = await supabase
      .from('fatwas')
      .update({
        question,
        answer,
        questioner,
        mufti,
        date,
        category,
        language,
        status,
        tags: JSON.stringify(tags),
        references: JSON.stringify(references),
        is_public: isPublic,
        priority,
        attachments: JSON.stringify(attachments)
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update fatwa' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fatwa
    });
  } catch (error) {
    console.error('Fatwas PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update fatwa' },
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
        { success: false, error: 'Fatwa ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('fatwas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete fatwa' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Fatwa deleted successfully'
    });
  } catch (error) {
    console.error('Fatwas DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete fatwa' },
      { status: 500 }
    );
  }
} 
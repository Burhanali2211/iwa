import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: khutbas, error } = await supabase
      .from('khutbas')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch khutbas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: khutbas
    });
  } catch (error) {
    console.error('Khutbas GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch khutbas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      content, 
      speaker, 
      date, 
      duration, 
      language, 
      category, 
      attachments, 
      isPublished, 
      summary, 
      keywords, 
      audience, 
      mosque 
    } = body;

    const { data: khutba, error } = await supabase
      .from('khutbas')
      .insert({
        title,
        content,
        speaker,
        date,
        duration,
        language,
        category,
        attachments: JSON.stringify(attachments),
        is_published: isPublished,
        summary,
        keywords: JSON.stringify(keywords),
        audience,
        mosque
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create khutba' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: khutba
    });
  } catch (error) {
    console.error('Khutbas POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create khutba' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      title, 
      content, 
      speaker, 
      date, 
      duration, 
      language, 
      category, 
      attachments, 
      isPublished, 
      summary, 
      keywords, 
      audience, 
      mosque 
    } = body;

    const { data: khutba, error } = await supabase
      .from('khutbas')
      .update({
        title,
        content,
        speaker,
        date,
        duration,
        language,
        category,
        attachments: JSON.stringify(attachments),
        is_published: isPublished,
        summary,
        keywords: JSON.stringify(keywords),
        audience,
        mosque
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update khutba' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: khutba
    });
  } catch (error) {
    console.error('Khutbas PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update khutba' },
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
        { success: false, error: 'Khutba ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('khutbas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete khutba' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Khutba deleted successfully'
    });
  } catch (error) {
    console.error('Khutbas DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete khutba' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: quranContent, error } = await supabase
      .from('quran_content')
      .select('*')
      .order('surah', { ascending: true })
      .order('ayah', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch Quran content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: quranContent
    });
  } catch (error) {
    console.error('Quran content GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Quran content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      surah, 
      ayah, 
      arabicText, 
      translation, 
      transliteration, 
      tafsir, 
      category, 
      tags, 
      isPublished, 
      language, 
      translator 
    } = body;

    const { data: content, error } = await supabase
      .from('quran_content')
      .insert({
        surah,
        ayah,
        arabic_text: arabicText,
        translation,
        transliteration,
        tafsir,
        category,
        tags: JSON.stringify(tags),
        is_published: isPublished,
        language,
        translator
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create Quran content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Quran content POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create Quran content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      surah, 
      ayah, 
      arabicText, 
      translation, 
      transliteration, 
      tafsir, 
      category, 
      tags, 
      isPublished, 
      language, 
      translator 
    } = body;

    const { data: content, error } = await supabase
      .from('quran_content')
      .update({
        surah,
        ayah,
        arabic_text: arabicText,
        translation,
        transliteration,
        tafsir,
        category,
        tags: JSON.stringify(tags),
        is_published: isPublished,
        language,
        translator
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update Quran content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Quran content PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update Quran content' },
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
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('quran_content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete Quran content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Quran content deleted successfully'
    });
  } catch (error) {
    console.error('Quran content DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete Quran content' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Validation schema for hero content
const heroContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subtitle: z.string().min(1, 'Subtitle is required').max(300, 'Subtitle too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  primaryButtonText: z.string().max(50, 'Button text too long').optional(),
  primaryButtonLink: z.string().max(500, 'Link too long').optional(),
  secondaryButtonText: z.string().max(50, 'Button text too long').optional(),
  secondaryButtonLink: z.string().max(500, 'Link too long').optional(),
  backgroundImage: z.string().url('Invalid image URL').optional().or(z.literal('')),
  overlayOpacity: z.number().min(0).max(100),
  isActive: z.boolean()
});

// GET /api/cms/home/hero - Get hero section content
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    // Mock data - replace with database query
    const heroContent = {
      id: 'hero',
      title: 'Welcome to Our Islamic Center',
      subtitle: 'Building Faith, Knowledge, and Community',
      description: 'Join our vibrant Islamic community dedicated to spiritual growth, education, and service. Discover a place where faith meets learning and community bonds are strengthened.',
      primaryButtonText: 'Explore Programs',
      primaryButtonLink: '/school',
      secondaryButtonText: 'Join Community',
      secondaryButtonLink: '/contact',
      backgroundImage: '/images/mosque-hero.jpg',
      overlayOpacity: 60,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: heroContent
    });

  } catch (error) {
    console.error('Get hero content error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/home/hero - Update hero section content
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = heroContentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Here you would update the database
    // For now, we'll simulate the update
    const updatedContent = {
      id: 'hero',
      ...validatedData,
      lastModified: new Date().toISOString()
    };

    // Simulate database save delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Hero section updated successfully',
      data: updatedContent
    });

  } catch (error) {
    console.error('Update hero content error:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/home/hero - Create hero section content
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();

    // Validate the request body
    const validationResult = heroContentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Here you would create in the database
    const newContent = {
      id: 'hero',
      ...validatedData,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Hero section created successfully',
      data: newContent
    }, { status: 201 });

  } catch (error) {
    console.error('Create hero content error:', error);
    return NextResponse.json(
      { error: 'Failed to create hero content' },
      { status: 500 }
    );
  }
}

// DELETE /api/cms/home/hero - Reset hero section to default
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    // Reset to default content
    const defaultContent = {
      id: 'hero',
      title: 'Welcome to Our Islamic Center',
      subtitle: 'Building Faith, Knowledge, and Community',
      description: 'Join our vibrant Islamic community dedicated to spiritual growth, education, and service.',
      primaryButtonText: 'Explore Programs',
      primaryButtonLink: '/school',
      secondaryButtonText: 'Join Community',
      secondaryButtonLink: '/contact',
      backgroundImage: '/images/mosque-hero.jpg',
      overlayOpacity: 60,
      isActive: true,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Hero section reset to default',
      data: defaultContent
    });

  } catch (error) {
    console.error('Reset hero content error:', error);
    return NextResponse.json(
      { error: 'Failed to reset hero content' },
      { status: 500 }
    );
  }
}

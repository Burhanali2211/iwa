import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

// GET /api/cms/home - Get all home page content
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    // For now, return mock data. Later we'll implement database storage
    const homeContent = {
      hero: {
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
        lastModified: new Date().toISOString()
      },
      features: {
        id: 'features',
        title: 'Our Services',
        subtitle: 'Comprehensive Islamic Education and Community Services',
        items: [
          {
            id: 'education',
            title: 'Islamic Education',
            description: 'Comprehensive Islamic studies for all ages',
            icon: 'BookOpen',
            link: '/school'
          },
          {
            id: 'prayer',
            title: 'Prayer Services',
            description: 'Daily prayers and Friday Jummah',
            icon: 'Mosque',
            link: '/religious'
          },
          {
            id: 'community',
            title: 'Community Events',
            description: 'Regular community gatherings and celebrations',
            icon: 'Users',
            link: '/events'
          },
          {
            id: 'library',
            title: 'Islamic Library',
            description: 'Extensive collection of Islamic books and resources',
            icon: 'Library',
            link: '/library'
          }
        ],
        isActive: true,
        lastModified: new Date().toISOString()
      },
      stats: {
        id: 'stats',
        title: 'Our Impact',
        subtitle: 'Serving the Community with Excellence',
        items: [
          {
            id: 'students',
            label: 'Students Enrolled',
            value: '500+',
            description: 'Active learners in our programs'
          },
          {
            id: 'years',
            label: 'Years of Service',
            value: '25+',
            description: 'Serving the community since 1999'
          },
          {
            id: 'programs',
            label: 'Programs Offered',
            value: '15+',
            description: 'Diverse educational and community programs'
          },
          {
            id: 'families',
            label: 'Families Served',
            value: '200+',
            description: 'Families part of our community'
          }
        ],
        isActive: true,
        lastModified: new Date().toISOString()
      },
      testimonials: {
        id: 'testimonials',
        title: 'Community Voices',
        subtitle: 'What Our Community Says About Us',
        items: [
          {
            id: 'testimonial1',
            name: 'Ahmed Hassan',
            role: 'Parent',
            content: 'The Islamic education my children receive here is exceptional. The teachers are knowledgeable and caring.',
            rating: 5,
            image: '/images/testimonials/ahmed.jpg'
          },
          {
            id: 'testimonial2',
            name: 'Fatima Al-Zahra',
            role: 'Student',
            content: 'This center has helped me grow spiritually and academically. The community is like a second family.',
            rating: 5,
            image: '/images/testimonials/fatima.jpg'
          },
          {
            id: 'testimonial3',
            name: 'Omar Abdullah',
            role: 'Community Member',
            content: 'The programs and events here bring our community together. It&apos;s a place of learning and brotherhood.',
            rating: 5,
            image: '/images/testimonials/omar.jpg'
          }
        ],
        isActive: true,
        lastModified: new Date().toISOString()
      },
      dailyContent: {
        id: 'daily-content',
        title: 'Daily Islamic Content',
        prayerTimes: {
          fajr: '05:30',
          dhuhr: '12:45',
          asr: '15:30',
          maghrib: '18:15',
          isha: '19:45'
        },
        verseOfDay: {
          arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
          translation: 'And whoever fears Allah - He will make for him a way out.',
          reference: 'Quran 65:2'
        },
        hadithOfDay: {
          text: 'The best of people are those who benefit others.',
          narrator: 'Prophet Muhammad (PBUH)',
          source: 'Sahih Bukhari'
        },
        islamicDate: {
          day: 15,
          month: 'Rajab',
          year: 1445
        },
        isActive: true,
        lastModified: new Date().toISOString()
      }
    };

    return NextResponse.json({
      success: true,
      data: homeContent
    });

  } catch (error) {
    console.error('Get home content error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}

// PUT /api/cms/home - Update home page content
export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const { section, content } = body;

    if (!section || !content) {
      return NextResponse.json(
        { error: 'Section and content are required' },
        { status: 400 }
      );
    }

    // Validate section type
    const validSections = ['hero', 'features', 'stats', 'testimonials', 'dailyContent'];
    if (!validSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section type' },
        { status: 400 }
      );
    }

    // Here you would save to database
    // For now, we'll just return success
    const updatedContent = {
      ...content,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: `${section} section updated successfully`,
      data: updatedContent
    });

  } catch (error) {
    console.error('Update home content error:', error);
    return NextResponse.json(
      { error: 'Failed to update home content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/home - Create new home page section
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request, ['ADMIN']);
    if ('error' in authResult) {
      return authResult.error;
    }

    const body = await request.json();
    const { section, content } = body;

    if (!section || !content) {
      return NextResponse.json(
        { error: 'Section and content are required' },
        { status: 400 }
      );
    }

    // Here you would create in database
    const newContent = {
      id: section,
      ...content,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: `${section} section created successfully`,
      data: newContent
    }, { status: 201 });

  } catch (error) {
    console.error('Create home content error:', error);
    return NextResponse.json(
      { error: 'Failed to create home content' },
      { status: 500 }
    );
  }
}

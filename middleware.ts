import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/auth';

// Define protected routes and their required roles
const protectedRoutes = {
  '/admin': ['ADMIN'],
  '/school/teacher': ['TEACHER', 'ADMIN'],
  '/school/student': ['STUDENT', 'ADMIN'],
  '/school/admissions': ['ADMIN', 'TEACHER'],
  '/school/fees': ['STUDENT', 'PARENT', 'ADMIN'],
  '/donations/history': ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'],
  '/profile': ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'],
};

// Routes that require authentication but no specific role
const authRequiredRoutes = [
  '/profile',
  '/donations/history',
];

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/donations',
  '/donations/donate',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/religious',
  '/library',
  '/events',
];

export async function middleware(request: NextRequest) {
  // Skip authentication in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Skip middleware for static files and ALL API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token
    const user = await verifyToken(token);

    if (!user) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      
      // Clear invalid token
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });
      
      return response;
    }

    // Check if route requires specific role
    const requiredRoles = protectedRoutes[pathname as keyof typeof protectedRoutes];
    
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      // User doesn't have required role
      const unauthorizedUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    // Add user info to headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user.userId);
    requestHeaders.set('x-user-role', user.role);
    requestHeaders.set('x-user-email', user.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Middleware auth error:', error);
    
    // Token verification failed, redirect to login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    
    // Clear invalid token
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

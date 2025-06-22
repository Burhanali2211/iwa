import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { supabase } from './supabase';

export interface AuthUser {
  userId: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'PARENT';
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || 'fallback-secret'
    ) as AuthUser;
    
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Try to get token from cookie first
    let token = request.cookies.get('auth-token')?.value;
    
    // If no cookie, try Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return null;
    }

    return await verifyToken(token);
  } catch (error) {
    console.error('Auth user extraction failed:', error);
    return null;
  }
}

export async function requireAuth(
  request: NextRequest,
  allowedRoles?: string[]
): Promise<{ user: AuthUser; error?: never } | { user?: never; error: Response }> {
  const user = await getAuthUser(request);

  if (!user) {
    return {
      error: new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    };
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return {
      error: new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    };
  }

  return { user };
}

export async function getUserWithProfile(userId: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select(`
      *,
      students(*),
      teachers(*)
    `)
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return user;
}

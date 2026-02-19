import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/privacy', '/terms', '/landing', '/manifest', '/auth/callback']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public routes bypass auth
  if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Skip auth if Supabase not configured
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.next()
  }

  // Dynamic import to prevent Turbopack static resolution issues
  const { updateSession } = await import('./lib/supabase/middleware')
  return updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json|ico)$).*)',
  ],
}

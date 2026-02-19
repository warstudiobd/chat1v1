import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/privacy', '/terms', '/landing', '/manifest', '/auth', '/admin', '/api']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public routes bypass auth
  if (PUBLIC_PATHS.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Skip auth if Supabase not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  // Check for Supabase auth cookies (sb-*-auth-token)
  const cookies = request.cookies.getAll()
  const hasAuthCookie = cookies.some(c =>
    c.name.includes('-auth-token') || c.name.includes('sb-') 
  )

  if (!hasAuthCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json|ico|mp3|glb|gltf)$).*)',
  ],
}

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const defaultResponse = NextResponse.next({ request })
  const path = request.nextUrl.pathname

  // 1. Public routes - no auth needed
  if (
    path.startsWith('/privacy') ||
    path.startsWith('/terms') ||
    path.startsWith('/landing') ||
    path.startsWith('/manifest')
  ) {
    return defaultResponse
  }

  // 2. Guard: skip auth if Supabase env vars are missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[v0] Supabase env vars missing, skipping auth middleware')
    return defaultResponse
  }

  // 3. Create Supabase client with cookie handling
  let response = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // 4. Get user session
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthPage = path.startsWith('/auth')
  const isAdminPage = path.startsWith('/admin')

  // Allow auth callback through always
  if (path.startsWith('/auth/callback')) return response

  // Logged in user trying to access auth pages -> redirect to app
  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Not logged in, not on auth or admin page -> redirect to login
  if (!user && !isAuthPage && !isAdminPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return response
}

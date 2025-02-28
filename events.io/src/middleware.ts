/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const routeRules = {
  public: [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/'
  ],
  static: ['/favicon.ico', '/_next/static', '/_next/image', '/api/auth/check'],
  organizerOnly: ['/dashboard/events/create', '/dashboard/events/[id]/edit'],
  adminOnly: ['/admin', '/admin/users']
}

const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some(route => {
    if (route.includes('[id]')) {
      const pattern = new RegExp(`^${route.replace('[id]', '[^/]+')}$`)
      return pattern.test(pathname)
    }
    return pathname === route || pathname.startsWith(route)
  })

interface TokenPayload {
  userId: string
  role?: string
  [key: string]: any
}

export async function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes to prevent conflicts with client-side auth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Skip static routes
  if (matchesRoute(pathname, routeRules.static)) {
    return NextResponse.next()
  }

  // Get auth-token from cookies
  const authToken = request.cookies.get('auth-token')?.value

  // Verify token server-side (minimal validation)
  let userPayload: TokenPayload | null = null
  let isAuthenticated = false

  if (authToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(authToken, secret)
      userPayload = payload as TokenPayload
      isAuthenticated = !!userPayload.userId
    } catch (error: any) {
      console.error('Token verification failed:', error.code || error.message)
      // Don't clear cookies here - let API handle token refreshing
    }
  }

  // Create response
  const response = NextResponse.next()

  // Set headers for downstream use only (not for client-side access)
  // These are safe to expose since they don't contain sensitive data
  response.headers.set('x-is-authenticated', isAuthenticated.toString())
  if (isAuthenticated && userPayload?.userId) {
    response.headers.set('x-user-id', userPayload.userId)
    response.headers.set('x-user-role', userPayload?.role || '')
  }

  // Public routes: allow access regardless of authentication
  if (matchesRoute(pathname, routeRules.public)) {
    return response
  }

  // If not authenticated and not a public route, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access control (use token payload)
  const role = userPayload?.role

  if (
    matchesRoute(pathname, routeRules.organizerOnly) &&
    role !== 'organizer' &&
    role !== 'admin'
  ) {
    // Redirect to dashboard instead of returning 403 JSON for better UX
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (matchesRoute(pathname, routeRules.adminOnly) && role !== 'admin') {
    // Redirect to dashboard instead of returning 403 JSON for better UX
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except specific exclusions
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}

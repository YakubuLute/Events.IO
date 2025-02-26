/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import User from '@/models/models'

// Define route access rules
const routeRules = {
  public: [
    'auth/login',
    'auth/register',
    'auth/forgot-password',
    'auth/reset-password',
    '/'
  ],
  static: ['/favicon.ico', '/_next/static', '/_next/image'],
  organizerOnly: ['/dashboard/events/create', '/dashboard/events/[id]/edit'],
  adminOnly: ['/admin', '/admin/users']
}

// Utility to check if a path matches a route or pattern
const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some(route => {
    console.log('Get current route: ', route)
    if (route.includes('[id]')) {
      const pattern = new RegExp(`^${route.replace('[id]', '[^/]+')}$`)
      return pattern.test(pathname)
    }
    return pathname === route || pathname.startsWith(route)
  })

export async function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static routes
  if (matchesRoute(pathname, routeRules.static)) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value

  // Verify token and get user data
  const userPayload = token ? await verifyToken(token) : null
  const isAuthenticated = !!userPayload

  // Fetch user from DB if authenticated (optional, for role check)
  let user = null
  if (isAuthenticated && userPayload?.userId) {
    user = await User?.findById(userPayload.userId).select('role')
  }

  // Public routes: redirect authenticated users to dashboard
  if (matchesRoute(pathname, routeRules.public)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // If not authenticated and not a public route, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access control
  const role = user?.role || userPayload?.role // Fallback to payload if no DB fetch
  if (
    matchesRoute(pathname, routeRules.organizerOnly) &&
    role !== 'organizer' &&
    role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url)) // Or 403 page
  }
  if (matchesRoute(pathname, routeRules.adminOnly) && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url)) // Or 403 page
  }

  // Attach user data to request headers for API routes or pages
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', userPayload?.userId || '')
  requestHeaders.set('x-user-role', role || '')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

async function verifyToken (token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    return payload as { userId: string; role?: string; [key: string]: any }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Configure matcher
export const config = {
  matcher: [
    // Apply to all routes except specific exclusions
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
}

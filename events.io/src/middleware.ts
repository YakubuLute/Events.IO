/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import User from '@/models/models'
import connectDB from '@/lib/mongoose'

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
      console.error('Token verification failed:', error)
      if (error.code === 'ERR_JWT_EXPIRED') {
        isAuthenticated = false // Treats expired token as unauthenticated
      }
    }
  }

  // Create response
  const response = NextResponse.next()

  // Set headers for downstream use
  response.headers.set('x-is-authenticated', isAuthenticated.toString())
  response.headers.set('x-user-id', userPayload?.userId || '')
  response.headers.set('x-user-role', userPayload?.role || '')

  // Inject auth state into HTML for client-side access
  if (typeof window === 'undefined') {
    // Server-side only
    response.headers.set(
      'x-html-inject',
      `<script>document.documentElement.setAttribute('data-authenticated', '${isAuthenticated}')</script>`
    )
  }

  // Public routes: allow access regardless of authentication, but don’t redirect authenticated users away
  if (matchesRoute(pathname, routeRules.public)) {
    return response // Allow public routes to proceed, even for authenticated users
  }

  // If not authenticated and not a public route, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access control (use token payload first for efficiency)
  const role = userPayload?.role
  if (
    matchesRoute(pathname, routeRules.organizerOnly) &&
    role !== 'organizer' &&
    role !== 'admin'
  ) {
    return NextResponse.json(
      { error: 'Forbidden: Organizer access required' },
      { status: 403 }
    )
  }
  if (matchesRoute(pathname, routeRules.adminOnly) && role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    )
  }

  // Optionally fetch full user details from DB for more accurate role checks (if token payload lacks full role info)
  if (userPayload?.userId) {
    try {
      await connectDB()
      const user = await User.findById(userPayload.userId).select('role')
      if (user?.role) {
        if (
          matchesRoute(pathname, routeRules.organizerOnly) &&
          user.role !== 'organizer' &&
          user.role !== 'admin'
        ) {
          return NextResponse.json(
            { error: 'Forbidden: Organizer access required' },
            { status: 403 }
          )
        }
        if (
          matchesRoute(pathname, routeRules.adminOnly) &&
          user.role !== 'admin'
        ) {
          return NextResponse.json(
            { error: 'Forbidden: Admin access required' },
            { status: 403 }
          )
        }
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      return NextResponse.redirect(new URL('/auth/login', request.url)) // Fallback to login on DB error
    }
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except specific exclusions
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
}

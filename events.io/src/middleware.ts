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

  const authToken = request.cookies.get('auth-token')?.value

  let userPayload: TokenPayload | null = null
  if (authToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(authToken, secret)
      userPayload = payload as TokenPayload
    } catch (error) {
      console.error('Token verification failed:', error)
    }
  }

  const isAuthenticated = !!userPayload?.userId

  // Public routes: redirect authenticated users to dashboard
  if (matchesRoute(pathname, routeRules.public)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // If not authenticated and not a public route, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access control (use token payload for now; fetch full user if needed)
  const role = userPayload?.role
  if (
    matchesRoute(pathname, routeRules.organizerOnly) &&
    role !== 'organizer' &&
    role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url)) // Or return 403 (e.g., NextResponse.json({ error: 'Forbidden' }, { status: 403 }))
  }
  if (matchesRoute(pathname, routeRules.adminOnly) && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url)) // Or return 403
  }

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
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if (
          matchesRoute(pathname, routeRules.adminOnly) &&
          user.role !== 'admin'
        ) {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      // Fallback to token payload role or redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Attach user data to request headers for API routes or pages
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', userPayload?.userId || '')
  requestHeaders.set('x-user-role', role || '')

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
}

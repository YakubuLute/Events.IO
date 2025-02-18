// src/middleware.ts
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Define routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password']

// Define routes that are always public (like images, favicon, etc)
const staticRoutes = ['/favicon.ico', '/_next', '/api/public']

export async function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is static/public
  if (staticRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')

  // Check if user is authenticated
  const isAuthenticated = token && (await verifyToken(token.value))

  // If the route is public and user is authenticated,
  // redirect to dashboard
  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the route is protected and user is not authenticated,
  // redirect to login
  if (!publicRoutes.includes(pathname) && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

async function verifyToken (token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return verified.payload
  } catch (error) {
    return null
  }
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    // Apply to all routes except api routes that handle auth
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
}

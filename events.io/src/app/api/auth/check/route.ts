/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/check/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import User from '@/models/models'
import connectDB from '@/lib/mongoose'

interface TokenPayload {
  userId: string
  role?: string
  [key: string]: any
}

export async function GET (req: NextRequest) {
  await connectDB()

  try {
    const authToken = req.cookies.get('auth-token')?.value

    if (!authToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    let userPayload: TokenPayload | null = null
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(authToken, secret)
      userPayload = payload as TokenPayload
    } catch (error) {
      console.error('Token validation failed:', error)
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    const isAuthenticated = !!userPayload?.userId
    if (!isAuthenticated) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    // Optionally fetch full user details (minimal for performance)
    const user = await User.findById(userPayload.userId).select('role')
    return NextResponse.json(
      {
        isAuthenticated: true,
        user: {
          id: userPayload.userId,
          role: user?.role || userPayload.role
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error checking auth:', error)
    return NextResponse.json(
      { isAuthenticated: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'

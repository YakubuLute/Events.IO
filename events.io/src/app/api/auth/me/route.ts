/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/models'
import connectDB from '@/lib/mongoose'
import { jwtVerify } from 'jose'
import { IUser } from '@/interface/interface'

export async function GET (req: NextRequest) {
  await connectDB()

  try {
    // Get auth-token from cookies
    const authToken = req.cookies.get('auth-token')?.value

    if (!authToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Validate the auth token
    let payload
    try {
      const result = await jwtVerify(
        authToken,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      )
      payload = result.payload
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Invalid or expired token', details: `${error.message}` },
        { status: 401 }
      )
    }

    // Extract userId from the token payload
    const userId = payload.userId as string
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 401 }
      )
    }

    // Fetch user details from the database
    const user = (await User.findById(userId)) as IUser | null
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user details (excluding sensitive fields like passwordHash)
    return NextResponse.json(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        role: user.role,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'

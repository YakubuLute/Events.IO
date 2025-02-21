// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { SignJWT } from 'jose'
import { z } from 'zod'
import { User } from '@/models/models'
import { IUser } from '@/interface/interface'

// Define the signup schema based on IUser
const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(1, 'Phone number is required'),
    role: z
      .enum(['user', 'organizer', 'admin', 'vendor'])
      .optional()
      .default('user')
  })
  .strict()

export async function POST (req: Request) {
  try {
    const body = await req.json()

    // Validate input
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, password, phone, role } = result.data

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone already exists' },
        { status: 409 }
      )
    }

    // Hash the password
    const passwordHash = await hash(password, 12)

    // Create new user
    const user = (await User.create({
      name,
      email,
      passwordHash,
      phone,
      role: role || 'user',
      isAdmin: false,
      isVerified: false,
      createdAt: new Date()
    })) as IUser

    // Create JWT token
    const token = await new SignJWT({
      userId: user?._id?.toString() || user?.id?.toString(),
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    // Create refresh token
    const refreshToken = await new SignJWT({
      userId: user?._id?.toString() || user?.id?.toString()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    // Prepare response with cookies
    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user?._id?.toString() || user?.id?.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isAdmin: user.isAdmin
        },
        token,
        refreshToken
      },
      { status: 201 }
    )

    // Set cookies on the response
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

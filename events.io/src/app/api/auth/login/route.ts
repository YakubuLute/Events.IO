// src/app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { SignJWT } from 'jose'
import { z } from 'zod'
import { User } from '@/models/models'
import { IUser } from '@/interface/interface'

// Login schema logic
const loginSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    password: z.string().min(1, 'Password is required')
  })
  .refine(data => data.email || data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone']
  })

export async function POST (req: Request) {
  try {
    const body = await req.json()

    // Validate input
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { email, phone, password } = result.data

    // Find user by email or phone
    const user = (await User.findOne({
      $or: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])]
    })) as IUser

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token with additional user data
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
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user?._id?.toString() || user?.id?.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        isAdmin: user.isAdmin
      },
      token,
      refreshToken
    })

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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

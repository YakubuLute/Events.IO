// src/app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { SignJWT } from 'jose'
import { z } from 'zod'
import { User } from '@/models/models'
import { IUser } from '@/interface/interface'
import { connectDB } from '@/utils/db/connection'

const loginSchema = z
  .object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    countryCode: z.string().optional(),
    password: z.string().min(1, 'Password is required')
  })
  .refine(data => data.email || (data.phoneNumber && data.countryCode), {
    message:
      'Either email or both phoneNumber and countryCode must be provided',
    path: ['email', 'phoneNumber', 'countryCode']
  })

export async function POST (req: Request) {
  try {
    await connectDB() // This might throw an error

    const body = await req.json()
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { email, phoneNumber, countryCode, password } = result.data

    const user = (await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phoneNumber && countryCode ? [{ phoneNumber, countryCode }] : [])
      ]
    })) as IUser

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isPasswordValid = await compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = await new SignJWT({
      userId: user?._id?.toString(),
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const refreshToken = await new SignJWT({ userId: user?._id?.toString() })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user?._id?.toString(),
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        role: user.role,
        isAdmin: user.isAdmin
      },
      token,
      refreshToken
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    })
    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

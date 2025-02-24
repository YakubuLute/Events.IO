// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { SignJWT } from 'jose'
import { z } from 'zod'
import { User, getMongooseStatus } from '@/models/models'
import { IUser } from '@/interface/interface'
import { connectDB } from '@/lib/mongoose'

const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    countryCode: z.string().min(1, 'Country code is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z
      .enum(['user', 'organizer', 'admin', 'vendor'])
      .optional()
      .default('user')
  })
  .strict()

export async function POST (req: Request) {
  await connectDB()
  getMongooseStatus()

  try {
    const body = await req.json()
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phoneNumber, countryCode, password, role } =
      result.data

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber: `${countryCode}${phoneNumber}` }]
    })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or phone number already exists' },
        { status: 409 }
      )
    }

    const passwordHash = await hash(password, 12)
    const user = (await User.create({
      name,
      email,
      phoneNumber,
      countryCode,
      passwordHash,
      role: role || 'user',
      isAdmin: false,
      isVerified: false,
      createdAt: new Date()
    })) as IUser

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

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user?._id?.toString(),
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          role: user.role,
          isAdmin: user.isAdmin
        },
        token,
        refreshToken
      },
      { status: 201 }
    )

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
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

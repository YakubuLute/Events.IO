// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import User from '@/models/models'
import { IUser } from '@/interface/interface'
import connectDB from '@/lib/mongoose'
import crypto from 'crypto'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

// Validation schema for forgot password request
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
})

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    const result = forgotPasswordSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Find user by email
    const user = (await User.findOne({ email })) as IUser

    // Don't reveal if user exists or not for security reasons
    if (!user) {
      return NextResponse.json(
        { success: true, message: 'If your email is registered, you will receive password reset instructions' },
        { status: 200 }
      )
    }

    // Generate a random 6-digit OTP
    const resetPasswordOTP = Math.floor(100000 + Math.random() * 900000)
    
    // Set OTP expiration time (15 minutes from now)
    const resetPasswordOTPExpires = new Date(Date.now() + 15 * 60 * 1000)

    // Generate a random reset token as a backup method
    const resetPasswordToken = crypto.randomBytes(32).toString('hex')
    const resetPasswordTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Update user with reset token and OTP
    await User.updateOne(
      { _id: user._id },
      {
        resetPasswordOTP,
        resetPasswordOTPExpires,
        resetPasswordToken,
        resetPasswordTokenExpiration
      }
    )

    // In a real application, you would send an email with the OTP and/or reset link
    // For now, we'll just log it to the console (in production, you'd use a proper email service)
    console.log(`Reset password OTP for ${email}: ${resetPasswordOTP}`)
    console.log(`Reset password token for ${email}: ${resetPasswordToken}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'If your email is registered, you will receive password reset instructions',
        // Include these fields only in development environment
        ...(process.env.NODE_ENV === 'development' && {
          _dev_only_otp: resetPasswordOTP,
          _dev_only_token: resetPasswordToken
        })
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import User from '@/models/models'
import { IUser } from '@/interface/interface'
import connectDB from '@/lib/mongoose'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'

// Validation schema for reset password request
const resetPasswordSchema = z.object({
  // Allow either OTP or token-based reset
  otp: z.number().optional(),
  token: z.string().optional(),
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
}).refine(data => data.otp || data.token, {
  message: 'Either OTP or reset token must be provided',
  path: ['otp', 'token']
})

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    const result = resetPasswordSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      )
    }

    const { email, otp, token, newPassword } = result.data

    // Find user by email
    const user = (await User.findOne({ email })) as IUser

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset credentials' },
        { status: 400 }
      )
    }

    // Check if reset is via OTP or token
    let isValidReset = false;

    if (otp && user.resetPasswordOTP) {
      // Validate OTP
      isValidReset = 
        user.resetPasswordOTP === otp && 
        user.resetPasswordOTPExpires && 
        user.resetPasswordOTPExpires > new Date();
    } else if (token && user.resetPasswordToken) {
      // Validate token
      isValidReset = 
        user.resetPasswordToken === token && 
        user.resetPasswordTokenExpiration && 
        user.resetPasswordTokenExpiration > new Date();
    }

    if (!isValidReset) {
      return NextResponse.json(
        { error: 'Invalid or expired reset credentials' },
        { status: 400 }
      )
    }

    // Hash the new password
    const passwordHash = await hash(newPassword, 12)

    // Update user with new password and clear reset fields
    await User.updateOne(
      { _id: user._id },
      {
        passwordHash,
        resetPasswordOTP: null,
        resetPasswordOTPExpires: null,
        resetPasswordToken: null,
        resetPasswordTokenExpiration: null
      }
    )

    return NextResponse.json(
      { success: true, message: 'Password has been reset successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

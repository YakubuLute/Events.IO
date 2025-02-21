// src/app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import { User } from '@/models/models'

export async function POST (req: Request) {
  try {
    const { refreshToken } = await req.json()
    if (!refreshToken)
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      )

    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    )
    const user = await User.findById(payload.userId)
    if (!user)
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      )

    const newToken = await new SignJWT({
      userId: user?._id?.toString() || user?.id?.toString(),
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const newRefreshToken = await new SignJWT({
      userId: user?._id?.toString() || user?.id?.toString()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const response = NextResponse.json({
      token: newToken,
      refreshToken: newRefreshToken
    })
    response.cookies.set('auth-token', newToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24
    })
    response.cookies.set('refresh-token', newRefreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
    })
    return response
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid refresh token ${error}` },
      { status: 401 }
    )
  }
}

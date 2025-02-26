import { NextResponse, NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

export async function POST (req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh-token')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      )
    }

    // Validate the refresh token (jwtVerify handles expiration automatically)
    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    )

    if (!payload.userId || typeof payload.userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid refresh token payload' },
        { status: 401 }
      )
    }

    const newAccessToken = await new SignJWT({
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
      isAdmin: payload.isAdmin as boolean
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const newRefreshToken = await new SignJWT({
      userId: payload.userId as string
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const response = NextResponse.json(
      { token: newAccessToken, refreshToken: newRefreshToken },
      { status: 200 }
    )

    response.cookies.set('auth-token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24
    })

    response.cookies.set('refresh-token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    })

    return response
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 401 }
    )
  }
}

export const runtime = 'nodejs'

import { NextResponse } from 'next/server'

export async function POST () {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  })
  response.cookies.set('refresh-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  })
  return response
}

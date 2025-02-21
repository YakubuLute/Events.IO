import { Document, Schema } from 'mongoose'

// custom error interface
export interface CustomError extends Error {
  code?: number
  keyPattern?: { [key: string]: number }
  message: string
}

// TokenPayload interface implementation
export interface TokenPayload {
  userId: string
  email: string
  isAdmin: boolean
}

// Define interface for User document
export interface IUser extends Document {
  id?: Schema.Types.ObjectId
  name: string
  email: string
  passwordHash: string
  isAdmin: boolean
  resetPasswordOTP?: number
  resetPasswordOTPExpires?: Date
  resetPasswordToken?: string
  resetPasswordTokenExpiration?: Date
  isVerified: boolean
  paymentCustomerId?: string
  accountVerificationOTP?: string
  accountVerificationOTPExpiration?: Date
  verifyToken?: string
  verificationTokenExpiration?: Date
  phone: string
  street?: string
  apartment?: string
  city?: string
  postalCode?: string
  country?: string
  createdAt: Date
  updatedAt?: Date
  event: IEvent[]
}

export interface ITokenSchema extends Document {
  userId: Schema.Types.ObjectId
  refreshToken?: string
  accessToken?: string
  createdAt?: Date
  expiresAt?: Date
}

export interface IEventSchema extends Document {
  _id: Schema.Types.ObjectId
  title: string
  description: string
  price: number
  date: Date
  location: string
  image: string[]
  creator: IUser
  createdAt: Date
  updatedAt: Date
  tickets: ITicket[]
  attendees: IAttendee[]
  attendeeCount: number
  totalRevenue: number
  checkInStats: ICheckInStats
  checkInList: ICheckInList[]
  isCancelled: boolean
  cancellationReason: string
  cancellationDate: Date
  cancellationBy: IUser
}

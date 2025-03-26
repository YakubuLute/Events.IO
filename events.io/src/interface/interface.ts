import { Document, Schema } from 'mongoose'

// Custom error interface
export interface CustomError extends Error {
  code?: number
  keyPattern?: { [key: string]: number }
  message: string
}

// Token payload interface
export interface TokenPayload {
  userId: string
  email: string
  isAdmin: boolean
  role?: string
}

// User interface
export interface IUser extends Document {
  id?: Schema.Types.ObjectId
  
  name: string
  email: string
  passwordHash: string
  password?: string
  isAdmin: boolean
  role: 'user' | 'organizer' | 'admin' | 'vendor'
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
  phoneNumber: string
  photoURL?: string
  displayName?: string
  firstName?: string
  lastName?: string
  address?: string

  street?: string
  apartment?: string
  city?: string
  postalCode?: string
  countryCode: string
  country?: string
  createdAt: Date
  updatedAt?: Date
  eventsOrganized: IEvent[]
  eventsAttended: IEvent[]
  paymentMethods?: IPaymentMethod[]
  notifications?: INotification[]
}

// Token schema interface
export interface ITokenSchema extends Document {
  userId: Schema.Types.ObjectId
  refreshToken?: string
  accessToken?: string
  createdAt?: Date
  expiresAt?: Date
}

// Event interface
export interface IEvent extends Document {
  videos: string[]
  _id: Schema.Types.ObjectId
  title: string
  description: string
  category: string[]
  tags: string[]
  organizer: IUser
  ticketTypes: ITicketType[]
  schedule: ISchedule
  venue: IVenue
  images: string[]
  bannerImage?: string
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  visibility: 'public' | 'private' | 'unlisted'
  capacity: number
  attendees: IAttendee[]
  attendeeCount: number
  vendors?: IVendor[]
  sponsors?: ISponsor[]
  checkInStats: ICheckInStats
  checkInList: ICheckInList[]
  totalRevenue: number
  createdAt: Date
  updatedAt: Date
  cancellation?: ICancellation
  settings: IEventSettings
  reviews?: IReview[]
}

// Ticket type interface
export interface ITicketType {
  _id: Schema.Types.ObjectId
  name: string
  price: number
  quantity: number
  available: number
  description?: string
  saleStart?: Date
  saleEnd?: Date
  minPurchase?: number
  maxPurchase?: number
}

// Schedule interface
export interface ISchedule {
  startDate: Date
  endDate: Date
  timezone: string
  sessions?: ISession[]
}

// Session interface
export interface ISession {
  _id: Schema.Types.ObjectId
  title: string
  description?: string
  startTime: Date
  endTime: Date
  speakers?: ISpeaker[]
  location?: string
}

// Venue interface
export interface IVenue {
  name: string
  address: string
  city: string
  state?: string
  country: string
  postalCode: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  capacity: number
}

// Attendee interface
export interface IAttendee {
  user: IUser
  ticket: ITicketType
  purchaseDate: Date
  checkInStatus: boolean
  checkInTime?: Date
  orderId: string
}

// Vendor interface
export interface IVendor {
  _id: Schema.Types.ObjectId
  name: string
  contact: string
  services: string[]
  status: 'pending' | 'confirmed' | 'rejected'
}

// Sponsor interface
export interface ISponsor {
  _id: Schema.Types.ObjectId
  name: string
  logo: string
  website?: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
}

// Check-in stats interface
export interface ICheckInStats {
  totalCheckedIn: number
  lastCheckIn?: Date
  peakCheckInHour?: number
}

// Check-in list interface
export interface ICheckInList {
  attendeeId: Schema.Types.ObjectId
  timestamp: Date
  method: 'qr' | 'manual' | 'nfc'
}

// Cancellation interface
export interface ICancellation {
  reason: string
  date: Date
  cancelledBy: IUser
  refundStatus: 'none' | 'partial' | 'full'
}

// Event settings interface
export interface IEventSettings {
  allowRefunds: boolean
  refundDeadline?: Date
  requireApproval: boolean
  guestCheckIn: boolean
  ticketTransfer: boolean
}

// Payment method interface
export interface IPaymentMethod {
  _id: Schema.Types.ObjectId
  type: 'card' | 'paypal' | 'bank'
  last4?: string
  expiry?: string
  isDefault: boolean
}

// Notification interface
export interface INotification {
  _id: Schema.Types.ObjectId
  type: 'event_update' | 'ticket_purchase' | 'reminder' | 'cancellation'
  message: string
  read: boolean
  createdAt: Date
}

// Speaker interface
export interface ISpeaker {
  _id: Schema.Types.ObjectId
  name: string
  bio?: string
  photo?: string
  contact?: string
}

// Review interface
export interface IReview {
  _id: Schema.Types.ObjectId
  user: IUser
  rating: number
  comment?: string
  createdAt: Date
}

export interface RegisterFormValues {
  email: string
  name: string
  phoneNumber: string
  countryCode: string
  password: string
  terms: boolean
}

export interface LoginFormValues {
  email: string
  phoneNumber: string
  countryCode: string
  password: string
}

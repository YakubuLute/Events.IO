// src/models/models.ts
import mongoose, { Schema, model, Model } from 'mongoose'
import {
  IUser,
  IEvent,
  ITicketType,
  IAttendee,
  ICheckInStats,
  ICheckInList,
  ICancellation,
  IEventSettings,
  IVenue,
  ISchedule,
  ISession,
  IVendor,
  ISponsor,
  IReview,
  ITokenSchema
} from '@/interface/interface'
import { UserRole } from '@/enums/shared'
import connectDB from '@/lib/mongoose'

// User Schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER
    },
    resetPasswordOTP: Number,
    resetPasswordOTPExpires: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
    isVerified: { type: Boolean, default: false },
    paymentCustomerId: String,
    accountVerificationOTP: String,
    accountVerificationOTPExpiration: Date,
    verifyToken: String,
    verificationTokenExpiration: Date,
    phoneNumber: { type: String, required: true },
    countryCode: { type: String, required: true },
    street: String,
    apartment: String,
    city: String,
    postalCode: String,
    country: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    eventsOrganized: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ['card', 'paypal', 'bank'],
          required: true
        },
        last4: String,
        expiry: String,
        isDefault: { type: Boolean, default: false }
      }
    ],
    notifications: [
      {
        type: {
          type: String,
          enum: ['event_update', 'ticket_purchase', 'reminder', 'cancellation'],
          required: true
        },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
)

// Token Schema
const TokenSchema = new Schema<ITokenSchema>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: String,
  accessToken: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
})

// Ticket Type Schema
const TicketTypeSchema = new Schema<ITicketType>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  available: { type: Number, required: true },
  description: String,
  saleStart: Date,
  saleEnd: Date,
  minPurchase: Number,
  maxPurchase: Number
})

// Venue Schema
const VenueSchema = new Schema<IVenue>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  capacity: { type: Number, required: true }
})

// Session Schema
const SessionSchema = new Schema<ISession>({
  title: { type: String, required: true },
  description: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  speakers: [
    {
      name: { type: String, required: true },
      bio: String,
      photo: String,
      contact: String
    }
  ],
  location: String
})

// Schedule Schema
const ScheduleSchema = new Schema<ISchedule>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  timezone: { type: String, required: true },
  sessions: [SessionSchema]
})

// Vendor Schema
const VendorSchema = new Schema<IVendor>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  services: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  }
})

// Sponsor Schema
const SponsorSchema = new Schema<ISponsor>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: String,
  tier: {
    type: String,
    enum: ['platinum', 'gold', 'silver', 'bronze'],
    required: true
  }
})

// Attendee Schema
const AttendeeSchema = new Schema<IAttendee>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ticket: TicketTypeSchema,
  purchaseDate: { type: Date, default: Date.now },
  checkInStatus: { type: Boolean, default: false },
  checkInTime: Date,
  orderId: { type: String, required: true }
})

// Check-in Stats Schema
const CheckInStatsSchema = new Schema<ICheckInStats>({
  totalCheckedIn: { type: Number, default: 0 },
  lastCheckIn: Date,
  peakCheckInHour: Number
})

// Check-in List Schema
const CheckInListSchema = new Schema<ICheckInList>({
  attendeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  method: { type: String, enum: ['qr', 'manual', 'nfc'], required: true }
})

// Cancellation Schema
const CancellationSchema = new Schema<ICancellation>({
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
  cancelledBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refundStatus: {
    type: String,
    enum: ['none', 'partial', 'full'],
    default: 'none'
  }
})

// Event Settings Schema
const EventSettingsSchema = new Schema<IEventSettings>({
  allowRefunds: { type: Boolean, default: true },
  refundDeadline: Date,
  requireApproval: { type: Boolean, default: false },
  guestCheckIn: { type: Boolean, default: false },
  ticketTransfer: { type: Boolean, default: true }
})

// Review Schema
const ReviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
})

// Event Schema
const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }],
    tags: [String],
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ticketTypes: [TicketTypeSchema],
    schedule: ScheduleSchema,
    venue: VenueSchema,
    images: [{ type: String, required: true }],
    bannerImage: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
      default: 'draft'
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'unlisted'],
      default: 'public'
    },
    capacity: { type: Number, required: true },
    attendees: [AttendeeSchema],
    attendeeCount: { type: Number, default: 0 },
    vendors: [VendorSchema],
    sponsors: [SponsorSchema],
    checkInStats: CheckInStatsSchema,
    checkInList: [CheckInListSchema],
    totalRevenue: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    cancellation: CancellationSchema,
    settings: EventSettingsSchema,
    reviews: [ReviewSchema]
  },
  { timestamps: true }
)

await connectDB()

let UserModel: Model<IUser>
let EventModel: Model<IEvent>
let TokenModel: Model<ITokenSchema>

export const getUserModel = async (): Promise<Model<IUser>> => {
  if (!UserModel) {
    await connectDB()
    UserModel = mongoose.models.User || model<IUser>('User', UserSchema)
  }
  return UserModel
}

export const getEventModel = async (): Promise<Model<IEvent>> => {
  if (!EventModel) {
    await connectDB() // Ensure connection before defining model
    EventModel = mongoose.models.Event || model<IEvent>('Event', EventSchema)
  }
  return EventModel
}

export const getTokenModel = async (): Promise<Model<ITokenSchema>> => {
  if (!TokenModel) {
    await connectDB() // Ensure connection before defining model
    TokenModel =
      mongoose.models.Token || model<ITokenSchema>('Token', TokenSchema)
  }
  return TokenModel
}
export const User =
  mongoose.models.User ||
  (mongoose.modelNames().includes('User')
    ? mongoose.model<IUser>('User')
    : mongoose.model<IUser>('User', UserSchema))

export const Event =
  mongoose.models.Event || model<IEvent>('Event', EventSchema)
export const Token =
  mongoose.models.Token || model<ITokenSchema>('Token', TokenSchema)

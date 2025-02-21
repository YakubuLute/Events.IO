export enum FileUploadPrefixes {
  VOICE_NOTE = 'voice-note',
  MESSAGE_ATTACHMENT = 'message-attachment',
  ANY = 'any',
  EVENTS = 'events',
  DOCUMENT_SAMPLE = 'document-sample',
  BUSINESS_CARD_ORDERS = 'business_card_orders',
  INTERVIEW_RESPONSE = 'interview-response',
}

export enum EventTypes {
  VIRTUAL = 'virtual',
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
}

export enum EventRegistrationStatus {
  NOT_STARTED = 'not_started',
  ONGOING = 'ongoing',
  ENDED = 'ended',
}

export enum EventAttendeeRegistrationStatus {
  PENDING_PAYMENT = 'pending_payment',
  COMPLETED = 'completed',
}

export enum EventCouponTargetGroupCategories {
  PAST_EMPLOYEES = 'past_employees',
  CURRENT_EMPLOYEES = 'current_employees',
  PAST_STUDENTS = 'past_students',
  CURRENT_STUDENTS = 'current_students',
}
export enum UniversityTargetGrpCategories {
  PAST_STUDENTS = 'past students',
  CURRENT_STUDENTS = 'current students',
  BOTH = 'both',
}
export enum EmployerTargetGrpCategories {
  PAST_EMPLOYEES = 'past employees',
  CURRENT_EMPLOYEES = 'current employees',
  BOTH = 'both',
}

export enum EventCouponTargetGroups {
  PUBLIC = 'public',
  CANDIDATES = 'candidates',
  UNIVERSITIES = 'universities',
  EMPLOYERS = 'employers',
}

export enum EventPackages {
  STANDARD = 'standard',
  VIP = 'vip',
  EXECUTIVE = 'executive',
  FREE = 'free',
}

export enum EventStatus {
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
  ENDED = 'ended',
  UNKNOWN = 'unknwon',
}

export enum EventSteps {
  EVENT_DETAILS_CREATION = 'event_details_creation',
  TICKET_CREATION = 'ticket_creation',
  PREVIEW = 'preview',
  PUBLISHED = 'published',
}
export enum ValueTypes {
  PERCENTAGE = 'percentage',
  AMOUNT = 'amount',
}

export enum EventAttendeesRoles {
  SPEAKER = 'speaker',
  MEMBER = 'member',
  DELEGATE = 'delegate',
  EXHIBITOR = 'exhibitor',
}

export enum EventCheckInTimes {
  FIVE_MINS = '5_mins',
  TEN_MINS = '10_mins',
  TWENTY_MINS = '20_mins',
  FORTY_MINS = '40_mins',
  ONE_HOUR = '1_hour',
  TWO_HOURS = '2_hours',
  FIVE_HOURS = '5_hours',
}

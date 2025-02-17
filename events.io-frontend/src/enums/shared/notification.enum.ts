export enum NotificationTypes {
  GENERAL = 0, // Do nothing
  INTERVIEW_REQUEST_ACCEPTED = 1,
  INTERVIEW_REQUEST_DECLINED = 2, // Do nothing
  NEW_INTERVIEW_REQUEST = 3, // only Candidate

  OFFER_ACCEPTED = 4, // only candidate
  OFFER_DECLINED = 5, // only candidate
  NEW_OFFER = 6, // only candidate
  NEW_MESSAGE = 7,
  NEW_JOB_MATCH = 8, // only candidate
  TOKEN_RECEIVED = 9, // Do nothing
  KYC_VERIFICATION_SUCCESSFUL = 10,  // DO nothing
  KYC_VERIFICATION_FAILED = 11, // DO nothing
  WORK_EXPERIENCE_ADDED = 12, // DO nothing
  WORK_EXPERIENCE_DELETED = 13, // DO nothing
  EDUCATION_UPDATED = 14, // DO nothing
  EDUCATION_DELETED = 15, // DO nothing
  REFERRAL = 16,
  WALLET_TRANSACTION = 17, // DO nothing

  // explicit notifications
  FACE_VERIFICATION_FAILED = 18, // Only candidate?tab=personal
  FACE_VERIFICATION_SUCCESSFUL = 19, // Only candidate?tab=personal
  ADDRESS_VERIFICATION_SUCCESSFUL = 20, // Only candidate?tab=personal
  ADDRESS_VERIFICATION_FAILED = 21, // Only candidate?tab=personal
  IDENTITY_VERIFICATION_SUCCESSFUL = 22, // Only candidate?tab=personal
  IDENTITY_VERIFICATION_FAILED = 23, // Only candidate?tab=personal

  APPOINTMENT_REQUEST_CREATED = 24,
  APPOINTMENT_REQUEST_ACCEPTED = 25,
  APPOINTMENT_REQUEST_DECLINED = 26, // DO nothing
  WORK_EXPERIENCE_VERIFICATION_CREATED = 27, // only employer 
  WORK_EXPERIENCE_VERIFICATION_SUCCESSFUL = 28, // Only candidate ?tab=work
  WORK_EXPERIENCE_VERIFICATION_FAILED = 29, // Only candidate ?tab=work
  EDUCATION_CREDENTIAL_VERIFICATION_CREATED = 30, // only univercity
  EDUCATION_CREDENTIAL_VERIFICATION_SUCCESSFUL = 31, // only candidate ?tab=education
  EDUCATION_CREDENTIAL_VERIFICATION_FAILED = 32, // only candidate ?tab=education
  INTERVIEW_REQUEST_REJECTED = 33,

  OFFER_TERMINATED = 34, // only candidate ?tab=previous
  NEW_DEBIT_CARD_ADDED = 35, // only Employer, University
  WALLET_CREDIT = 36, // ?tab=earning
  WALLET_DEBIT = 37, // ?tab=withdrawal
  WALLET_FUNDED = 38, // ?tab=earning
  SUPPORT_TICKET_CREATED = 39, // DO nothing
  SUPPORT_TICKET_RESOLVED = 40, // DO nothing
  SUPPORT_TICKET_CLOSED = 41, // DO nothing
  CANDIDATE_SHORTLISTED = 42, // only Candidate
  CANDIDATE_BOOKMARKED = 43, // only candidate
  NEW_INTERESTED_CANDIDATE_FOR_POSITION = 44, // only employer
}

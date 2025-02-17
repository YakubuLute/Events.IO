export enum ErrorCodes {
  GENERAL = 'ERR0000',
  JWT_EXPIRED = 'ERR0001',
  INSTITUTION_NOT_ONBOARD = 'ERR0002',
  EMPLOYER_NOT_ONBOARD = 'ERR0003',
  DEVICE_INFO_HEADERS_MISSING = 'ERR0004',
  DEVICE_NOT_RECOGNIZED = 'ERR0005',
  ALREADY_ON_WAITLIST = 'ERR0006',
  ORGANIZATION_ALREADY_TAKEN = 'ERR0007',
  ORGANIZATION_NOT_VERIFIED = 'ERR0008',
  EMAIL_NOT_VERIFIED = 'ERR0009',
  PROFILE_NOT_VISIBLE = 'ERR0010',
  PHONE_NOT_VERIFIED = 'ERR0011',
  UNRECOGNIZED_INTERNAL_TESTER = 'ERR0012',
  IDENTITY_NOT_VERIFIED = 'ERR0013',
  ADDRESS_NOT_VERIFIED = 'ERR0014',
  SELFIE_NOT_VERIFIED = 'ERR0015',
  USER_NO_LONGER_EXISTS = 'ERR0016',
}

import { UserTypes } from "@/@types/shared/type";
import { NotificationDTO } from "@/hooks/shared/dtos";
import { NotificationTypes } from "@/enums/shared";

import {
  TabAppointmentOptions,
  TabHiresOptions,
  TabInterviewOptions,
  TabVerificationOptions,
  TabWalletOptions
} from '@/hooks/candidate/dtos';
import { OfferStatusOptions } from "@/hooks/employer/dtos";

interface NotificationAction {
  urlPath: string;
  text: string;
}

export const handleNotificationType = (notification: NotificationDTO): NotificationAction | null => {
  const userType = notification?.metadata?.userType;

  const handlePage = (userType: UserTypes) => {
    switch (userType) {
      case UserTypes.CANDIDATE:
        return `/candidate`;
      case UserTypes.STAFF:
        return `/university`;
      case UserTypes.EMPLOYEE:
        return `/employer`;
      default:
        return null;
    }
  }

  const getAction = (urlPath: string, text: string): NotificationAction => ({
    urlPath,
    text,
  });

  switch (notification?.type) {
    // Interviews
    case NotificationTypes.INTERVIEW_REQUEST_ACCEPTED:
      return getAction(
        `${handlePage(userType)}/interviews?tab=${TabInterviewOptions.SCHEDULED}&interviewId=${notification.metadata?.interviewRequestId}`,
        'View Scheduled Interviews'
      );
    // case NotificationTypes.INTERVIEW_REQUEST_DECLINED:
    //   return `${handlePage(userType)}/interviews?tab=${TabInterviewOptions.REJECTED}&interviewId=${notification.metadata?.interviewRequestId}`;
    case NotificationTypes.NEW_INTERVIEW_REQUEST:
      // return `${handlePage(userType)}/interviews?tab=${TabInterviewOptions.PENDING}&interviewId=${notification.metadata?.interviewRequestId}`;
      return getAction(
        `${handlePage(userType)}/interviews/${notification.metadata?.interviewRequestId}`,
        'View New Interview Request'
      );
    case NotificationTypes.INTERVIEW_REQUEST_REJECTED:
      return getAction(
        `${handlePage(userType)}/interviews?tab=${TabInterviewOptions.REJECTED}&interviewId=${notification.metadata?.interviewRequestId}`,
        'View Rejected Interview'
      );

    // Job Offers
    case NotificationTypes.OFFER_ACCEPTED:
      return getAction(
        `${handlePage(userType)}/offers?tab=${OfferStatusOptions.HIRED}&offerId=${notification.metadata?.offerId}`,
        'View Accepted Offer'
      );
    case NotificationTypes.OFFER_DECLINED:
      return getAction(
        `${handlePage(userType)}/offers?tab=${OfferStatusOptions.DECLINED}&offerId=${notification.metadata?.offerId}`,
        'View Declined Offer'
      );
    case NotificationTypes.NEW_OFFER:
      return getAction(
        `${handlePage(userType)}/offers?tab=${OfferStatusOptions.PENDING}&offerId=${notification.metadata?.offerId}`,
        'View New Offer'
      );
    case NotificationTypes.OFFER_TERMINATED:
      return getAction(
        `${handlePage(userType)}/hire?tab=${TabHiresOptions.PREVIOUS}&offerId=${notification.metadata?.offerId}`,
        'View Terminated Offer'
      );

    // Messages
    case NotificationTypes.NEW_MESSAGE:
      return getAction(`${handlePage(userType)}/messages`, 'View New Message');
    case NotificationTypes.NEW_JOB_MATCH:
      return getAction(`${handlePage(userType)}/matches`, 'View New Job Match');
    // case NotificationTypes.TOKEN_RECEIVED:
    // case NotificationTypes.KYC_VERIFICATION_SUCCESSFUL:
    // case NotificationTypes.KYC_VERIFICATION_FAILED:
    // case NotificationTypes.WORK_EXPERIENCE_ADDED:
    // case NotificationTypes.WORK_EXPERIENCE_DELETED:
    // case NotificationTypes.EDUCATION_UPDATED:
    // case NotificationTypes.EDUCATION_DELETED:
    case NotificationTypes.REFERRAL:
      return getAction(
        `${handlePage(userType)}/referrals`,
        'View Referral'
      );
    // case NotificationTypes.WALLET_TRANSACTION:

    // Candidate Verification 
    case NotificationTypes.FACE_VERIFICATION_FAILED:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Face Verification'
      );
    case NotificationTypes.FACE_VERIFICATION_SUCCESSFUL:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Face Verification'
      );
    case NotificationTypes.ADDRESS_VERIFICATION_SUCCESSFUL:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Address Verification'
      );
    case NotificationTypes.ADDRESS_VERIFICATION_FAILED:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Address Verification'
      );
    case NotificationTypes.IDENTITY_VERIFICATION_SUCCESSFUL:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Personal Verification'
      );
    case NotificationTypes.IDENTITY_VERIFICATION_FAILED:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.PERSONAL}`, 'View Personal Verification'
      );

    // Appointment
    case NotificationTypes.APPOINTMENT_REQUEST_CREATED:
      return getAction(
        `${handlePage(userType)}/appointments?tab=${TabAppointmentOptions.PENDING}&appointmentId=${notification.metadata?.appointmentId}`,
        'View New Appointment Request'
      );
    case NotificationTypes.APPOINTMENT_REQUEST_ACCEPTED:
      return getAction(
        `${handlePage(userType)}/appointments?tab=${TabAppointmentOptions.UPCOMING}&appointmentId=${notification.metadata?.appointmentId}`,
        'View Accepted Appointment'
      );
    // case NotificationTypes.APPOINTMENT_REQUEST_DECLINED:
    //   return `${handlePage(userType)}/appointments?tab=${TabAppointmentOptions.PENDING}&appointmentId=${notification.metadata?.appointmentId}`;

    // Employer Verification
    case NotificationTypes.WORK_EXPERIENCE_VERIFICATION_CREATED:
      // return `${handlePage(userType)}/verification`;
      return getAction(`${handlePage(userType)}/verification`, 'View Work Experience Verification');
    // University Verification
    case NotificationTypes.EDUCATION_CREDENTIAL_VERIFICATION_CREATED:
      return getAction(`${handlePage(userType)}/verification`, 'View Education Verification');
    // Candidate Verification
    case NotificationTypes.WORK_EXPERIENCE_VERIFICATION_SUCCESSFUL:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.WORK}`, 'View Work Experience Verification'
      );
    case NotificationTypes.WORK_EXPERIENCE_VERIFICATION_FAILED:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.WORK}`, 'View Work Experience Verification'
      );
    case NotificationTypes.EDUCATION_CREDENTIAL_VERIFICATION_SUCCESSFUL:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.EDUCATION}`, 'View Education Verification'
      );
    case NotificationTypes.EDUCATION_CREDENTIAL_VERIFICATION_FAILED:
      return getAction(
        `${handlePage(userType)}/verification?tab=${TabVerificationOptions.EDUCATION}`, 'View Education Verification'
      );

    case NotificationTypes.NEW_DEBIT_CARD_ADDED:
      // return `${handlePage(userType)}/billing`;
      return getAction(`${handlePage(userType)}/billing`, 'View New Debit Card');
    case NotificationTypes.WALLET_CREDIT:
      return getAction(`${handlePage(userType)}/wallet?tab=${TabWalletOptions.EARNING}`, 'View Wallet Credit');
    case NotificationTypes.WALLET_DEBIT:
      return getAction(`${handlePage(userType)}/wallet?tab=${TabWalletOptions.WITHDRAWAL}`, 'View Wallet Debit');
    case NotificationTypes.WALLET_FUNDED:
      return getAction(`${handlePage(userType)}/wallet?tab=${TabWalletOptions.EARNING}`, 'View Wallet Funded');
    // case NotificationTypes.SUPPORT_TICKET_CREATED:
    // case NotificationTypes.SUPPORT_TICKET_RESOLVED:
    // case NotificationTypes.SUPPORT_TICKET_CLOSED:
    case NotificationTypes.CANDIDATE_SHORTLISTED:
      return getAction(`${handlePage(userType)}/shortlisted`, 'View Shortlisted');
    case NotificationTypes.CANDIDATE_BOOKMARKED:
      return getAction(`${handlePage(userType)}/favorited`, 'View Favorited');
    case NotificationTypes.NEW_INTERESTED_CANDIDATE_FOR_POSITION: // TODO: Remember to update this tabs
      return getAction(
        `${handlePage(userType)}/positions-search-result?position=${notification.metadata?.appointmentId}&tab=1`,
        'View New Interested Candidate'
      );
    default:
      return null;
  }
}
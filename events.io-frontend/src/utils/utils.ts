import { ChangeEvent } from 'react';
import is from 'date-fns/esm/locale/is/index';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import moment from 'moment';

import { TCandidateSocialLink } from '@/@types/candidate/auth/candidate-auth';
import { InterviewStageStatus } from '@/@types/employer/employer';
import { IMessage } from '@/@types/shared/chat';
import {
  PasswordStrengthClass,
  TUser,
  UserTypes,
  YearOption,
} from '@/@types/shared/type';
import { SocialIcons } from '@/constants/shared/shared-constants';
import decodeJwt from './jwtDecode';
import { COOKIES_KEY } from './setCookies';

/**
 * @description check if an email is valid using regex
 * @param email
 * @returns
 */
export const isValidEmail = (email: string): boolean => {
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(email);
};

export const truncateWord = (word: string, length: number) => {
  if (typeof word !== 'string' || typeof length !== 'number') {
    throw new Error(
      'Invalid input. Please provide a valid word (string) and length (number).'
    );
  }

  if (length >= 0) {
    if (word.length > length) {
      return word.slice(0, length) + '...';
    } else {
      return word;
    }
  } else {
    throw new Error('Invalid length. Please provide a non-negative length.');
  }
};

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const isValidFileType = (fileType: string) => {
  const allowedTypes = ['application/pdf', 'image/', 'video/', 'audio/'];
  return allowedTypes.some((type) => fileType.includes(type));
};

export const formatTime = (date: string) => {
  let result = moment(date).fromNow();
  const now = moment();
  const days = now.diff(date, 'days');
  const weeks = now.diff(date, 'weeks');
  if (days >= 7) {
    if (days <= 13) {
      result = `1 week ago`;
    } else if (days > 13 && days <= 25) {
      result = `${weeks} weeks ago`;
    }
  }
  return result;
};

export const timeDiff = (date: string, startTime: string, endTime: string) => {
  const startDate = moment(`${date} ${startTime}`);
  const endDate = moment(`${date} ${endTime}`);
  return endDate.diff(startDate, 'minutes') < 59
    ? `${endDate.diff(startDate, 'minutes')} mins`
    : `${endDate.diff(startDate, 'hours')} hrs`;
};

export const formatString = (str: string) => {
  if (str) {
    const rep = str.replace(/\s/g, '_');
    const res = rep.charAt(0).toUpperCase() + rep.slice(1);
    return res.replace(/\_/g, ' ');
  } else {
    return '';
  }
};

export const formatName = (name: string) => {
  if (name) {
    const nameArr = name.split(' ');
    const res =
      nameArr[0].charAt(0).toUpperCase() +
      nameArr[0].slice(1) +
      ' ' +
      nameArr[1].charAt(0).toUpperCase() +
      nameArr[1].slice(1);
    return res.replace(/\_/g, ' ');
  }
};

export const getFirstCharactersNames = (name: string) => {
  if (name) {
    const nameArr = name.split(' ');
    let nameCharacters = '';
    for (let index = 0; index < nameArr.length; index++) {
      const firstCharacter = nameArr[index][0];
      nameCharacters = nameCharacters + firstCharacter.toUpperCase();
    }

    return nameCharacters;
  }
};

export function truncateString(str: string, n: number) {
  if (!str) return str;
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}

export function formatReadableDate(inputDate: any) {
  const date = new Date(inputDate);
  const options = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    second: 'numeric' as const,
    timeZoneName: 'short' as const,
  };

  return date.toLocaleString('en-US', options);
}

export function sortMessagesByDate(messages: IMessage[]): IMessage[] {
  // Convert timestamps to Date objects for proper comparison
  const messagesWithDate = messages.map((message) => ({
    ...message,
    dateObject: new Date(message.timestamp),
  }));

  // Sort messages by date in descending order
  const sortedMessages = messagesWithDate.sort(
    (a, b) => a.dateObject.getTime() - b.dateObject.getTime()
  );

  // Remove the temporary dateObject property
  const finalSortedMessages = sortedMessages.map(({ dateObject, ...rest }) => {
    const _d = dateObject;
    return rest;
  });

  return finalSortedMessages;
}

/**
 * @description this returns the base path for every route.
 * - if user type == candidate, it'll return candidate,
 * - if user type == employee, it'll return employer,
 * - if user type == staff, it'll return university
 * ...etc
 */
export const getBasePath = () => {
  const user = getCurrentUser();

  switch (user?.userType) {
    case UserTypes.EMPLOYEE:
      return 'employer';
    case UserTypes.CANDIDATE:
      return 'candidate';
    case UserTypes.STAFF:
      return 'university';
    default:
      return 'shared'; // or whatever it should be for shared routes
  }
};

export const getCurrentUser = (): TUser => {
  const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
  const currentUser = decodeJwt(String(token)) as TUser;
  return currentUser;
};

export const validateEmail = (email: string) => {
  return String(email)
    ?.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const handlePasswordStrength = (
  e: ChangeEvent<HTMLInputElement>,
  setStrenghClass: (value: PasswordStrengthClass) => void,
  setStrengthLabel: (value: string) => void
) => {
  const password = e.target.value;
  let strength = 0;
  if (!password) strength = 0;
  if (password.length > 7) strength += 1;
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
    strength += 1;
  if (strength === 0) {
    setStrenghClass('none');
    setStrengthLabel('None');
  } else if (strength === 1) {
    setStrenghClass('too_short');
    setStrengthLabel('Too Short');
  } else if (strength === 2) {
    setStrenghClass('weak');
    setStrengthLabel('Weak');
  } else if (strength === 3) {
    setStrenghClass('fair');
    setStrengthLabel('Fair');
  } else if (strength === 4) {
    setStrenghClass('good');
    setStrengthLabel('Good');
  } else if (strength === 5) {
    setStrenghClass('strong');
    setStrengthLabel('Strong');
  }
};

export function validateDate(date: Date | string) {
  return dayjs(date).isValid();
}

export function translateInterviewAvailability(availability: string) {
  switch (availability) {
    case 'yes':
      return 'Available';
    case 'no':
      return 'Unavailable';
    case 'unknown':
      return 'Maybe';
  }
}

export const getSocialLink = (
  social: string,
  socialLinks: TCandidateSocialLink[]
) => {
  const link = socialLinks?.find((item) => item?.network === social);
  return { link: link?.url, Icon: SocialIcons[social.toUpperCase()] };
};

export const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop();
};

export function blobToFile(theBlob: Blob, fileName: string, type: string) {
  return new File([theBlob], fileName, { type });
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export function dataURLtoBlob(dataURL: string) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

export function isURL(url: string) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

export function isValidCreditCardNumber(cardNumber: string) {
  const creditCardRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return creditCardRegex.test(cardNumber);
}

export function isValidCVV(cvv: string) {
  const cvvRegex3Digit = /^[0-9]{3}$/;
  const cvvRegex4Digit = /^[0-9]{4}$/;
  return cvvRegex3Digit.test(cvv) || cvvRegex4Digit.test(cvv);
}

export function isValidExpiryDate(expiryDate: string) {
  const expiryDateRegexMMYY = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

  if (expiryDateRegexMMYY.test(expiryDate)) {
    const today = new Date();
    const parts = expiryDate.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    if (year >= today.getFullYear() % 100) {
      if (year === today.getFullYear() % 100) {
        return month >= today.getMonth() + 1;
      }
      return true;
    }
  }

  return false;
}

export function isSocialProfileLink(link: string) {
  const regex = /https:\/\/media\.licdn\.com/;
  if (regex.test(link)) {
    return true;
  } else {
    return false;
  }
}

export function capitalizeFirstLetter(str: string) {
  if (str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return str;
  }
}

export function formatNumberWithCommas(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  return formatter.format(number);
}

export function capitalizeWords(str: string) {
  if (str) {
    const words = str.split(' ');
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' ');
  }
  return str;
}

export function kebabToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function shuffleArray(array: string[]) {
  // Loop through the array from the last element to the first
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function isYouTubeUrl(url: string) {
  // Define a regular expression for YouTube URL patterns
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/;

  // Test the URL against the regular expression
  return youtubeRegex.test(url);
}

export function getYouTubeVideoID(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
}

/**
 * @description count number of words in a string
 * @param value
 * @returns
 */
export function countWords(value: string): number {
  return value ? value?.trim().split(/\s+/).length : 0;
}

/**
 * @description generate years
 * @param totalYearsToThePast the total years to generate going backward from the current date
 * @param futureYears the totals years to add going forward from the current date
 * @returns
 */
export function generateYears(
  totalYearsToThePast = 50,
  futureYears = 10
): YearOption[] {
  const currentYear = new Date().getFullYear();
  const totalYears = totalYearsToThePast;

  // Calculate the starting year
  const startYear = currentYear - (totalYears - futureYears - 1);

  // Generate the years array
  const years: YearOption[] = [];
  for (let i = 0; i < totalYears; i++) {
    const year = startYear + i;
    years.push({ value: year.toString(), label: year.toString() });
  }

  return years?.reverse();
}

export function getInterviewStageStatusName(
  status: `${InterviewStageStatus}`,
  isLastStage?: boolean
) {
  switch (status) {
    case InterviewStageStatus.COMPLETED:
      return {
        name: isLastStage ? 'Accepted' : 'Approved for Next Stage',
        color: 'success',
      };
    case InterviewStageStatus.HIRED:
      return {
        name: 'Hired',
        color: 'success',
      };
    case InterviewStageStatus.REJECTED:
      return {
        name: 'Rejected',
        color: 'error',
      };
    case InterviewStageStatus.AWAITING_EMPLOYER_RESPONSE:
      return {
        name: 'Awaiting Employer Response',
        color: 'warning',
      };
    case InterviewStageStatus.OFFER_SENT:
      return {
        name: 'Awaiting Acceptance',
        color: 'warning',
      };
    case InterviewStageStatus.AWAITING_CANDIDATE_RESPONSE:
      return {
        name: 'Awaiting Candidate Response',
        color: 'warning',
      };
    case InterviewStageStatus.DECLINED:
      return {
        name: 'Declined',
        color: 'error',
      };
    case InterviewStageStatus.DECLINED_OFFER:
      return {
        name: 'Declined Offer',
        color: 'error',
      };
    case InterviewStageStatus.EXPIRED:
      return {
        name: 'Expired',
        color: 'error',
      };
    case InterviewStageStatus.NOT_STARTED:
      return {
        name: 'Not Started',
        color: 'info',
      };
    case InterviewStageStatus.AWAITING_INTERVIEW_REQUEST:
      return {
        name: 'Awaiting Interview Request',
        color: 'warning',
      };
    default:
      return {
        name: 'Pending',
        color: 'info',
      };
  }
}

export function getTimeDifference(startTime: string, endTime: string) {
  // Parse the input times
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  // Convert both times to minutes
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference in minutes
  let differenceInMinutes = endTotalMinutes - startTotalMinutes;

  // Handle negative differences (if the end time is earlier than start time)
  if (differenceInMinutes < 0) {
    differenceInMinutes += 24 * 60; // Add 24 hours' worth of minutes
  }

  // Return in hours if the difference is 60 minutes or more
  if (differenceInMinutes >= 60) {
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;
    if (minutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${minutes} min`;
  } else {
    return `${differenceInMinutes} min`;
  }
}

export function calculateAnnualFee(amount: number, rate: string) {
  let annualSalary = 0;

  switch (rate.toLowerCase()) {
    case 'hour':
      annualSalary = amount * 40 * 52; // 40 hours per week, 52 weeks per year
      break;
    case 'day':
      annualSalary = amount * 5 * 52; // 5 workdays per week, 52 weeks per year
      break;
    case 'week':
      annualSalary = amount * 52; // 52 weeks per year
      break;
    case 'month':
      annualSalary = amount * 12; // 12 months per year
      break;
    case 'year':
      annualSalary = amount; // already annual
      break;
    default:
      throw new Error(
        "Invalid rate provided. Use 'hour', 'day', 'week', 'month', or 'year'."
      );
  }

  // Calculate 10% of the annual salary
  const tenPercent = annualSalary * 0.1;
  return tenPercent;
}

export async function getLinkMimeType(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Use HEAD to fetch only headers
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.headers.get('Content-Type'); // Returns the MIME type
  } catch (error) {
    console.error('Error fetching MIME type:', error);
    return null;
  }
}

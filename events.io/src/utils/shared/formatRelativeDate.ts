// ------------------------- DATE AGO  ----------------------------

export const formatRelativeDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const currentDate = new Date();
  const timeDifference = Number(currentDate) - Number(date);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} Year${years > 1 ? 's' : ''} Ago`;
  } else if (months > 0) {
    return `${months} Month${months > 1 ? 's' : ''} Ago`;
  } else if (days > 0) {
    return `${days} Day${days > 1 ? 's' : ''} Ago`;
  } else if (hours > 0) {
    return `${hours} Hour${hours > 1 ? 's' : ''} Ago`;
  } else if (minutes > 0) {
    return `${minutes} Minute${minutes > 1 ? 's' : ''} Ago`;
  } else if (seconds > 0) {
    return `${seconds} Second${seconds > 1 ? 's' : ''} Ago`;
  }

  return 'Just Now';
};

// ------------------------- TIME  ----------------------------

export const formatCustomTimeIOS = (isoTime) => {
  const time = new Date(isoTime);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let formattedTime = `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;

  if (hours >= 12) {
    formattedTime += 'PM';
  } else {
    formattedTime += 'AM';
  }

  return formattedTime;
};

export const formatTimeToAMPM = (time: string) => {
  const [hours, minutes] = time.split(':');
  let period = 'am';
  let formattedHours = parseInt(hours, 10);

  if (formattedHours >= 12) {
    period = 'pm';
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  return `${formattedHours}:${minutes} ${period}`;
};

export const formatTimeToHHMM = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// "2023-10-27T07:00:00.000Z"; // Output: "07:00"

export enum DateFormat {
  FullDate,
  YearAndMonth,
  ShortDate,
  CustomFormat,
  TimeFormat,
  NormalDate,
}

// ------------------------- DATE  ----------------------------

export const formatDateToDDMMYYYY = (date, sign = '/') => {
  const [year, month, day] = date.split('-');
  return `${day}${sign}${month}${sign}${year}`;
};

export const formatCustomDateOption = (inputDate, formatOption) => {
  // const date = new Date(inputDate);
  // const day = date.getDate();
  // const month = date.getMonth() + 1; // Months are zero-based
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  let date;

  if (inputDate === null || inputDate === 'present') {
    date = 'Present';
    return date;
  } else {
    date = new Date(inputDate);
    let options = {};

    switch (formatOption) {
      case DateFormat.FullDate:
        options = { year: 'numeric', month: 'long', day: 'numeric' }; // like "April 26, 2023."
        break;
      case DateFormat.YearAndMonth:
        options = { year: 'numeric', month: 'long' }; // like "April 2023."
        break;
      case DateFormat.ShortDate:
        options = { year: '2-digit', month: '2-digit', day: '2-digit' }; // like "04/26/23."
        break;
      // like: 12 Aug 2023
      case DateFormat.NormalDate:
        options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options); // "26 April 2023"
        break;
      case DateFormat.CustomFormat:
        // Define your custom format here
        // Example: "26th April 2023"
        break;
      case DateFormat.TimeFormat:
        options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString(undefined, options); //  in a 12-hour format, like "9:00 AM."
      default:
        break;
    }
    return date.toLocaleDateString(undefined, options);
  }
};

// ------------------------- TIME & DATE  ----------------------------

export const formatCustomTimeDate = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  const year = date.getFullYear() % 100; // Use the last two digits of the year

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  const formattedDate = `${formattedHours}:${minutes}:${seconds}${ampm} - ${month}/${day}/${year}`;

  return formattedDate;
};

// ------------------------- CALCUL DATE DIFFERENCE  ----------------------------

export const calculateDateDifference = (startDate: any, endDate: any) => {
  const start = new Date(startDate);
  let end: any;

  if (endDate === null || endDate === 'present') {
    end = new Date(); // Use the current date if endDate is null or not a string.
  } else {
    end = new Date(endDate);
  }

  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearText = years > 1 ? 'yrs' : 'yr';
  const monthText = months > 1 ? 'mos' : 'mo';

  if (years > 0 && months > 0) {
    return `${years} ${yearText} ${months} ${monthText}`;
  } else if (years > 0 && months === 0) {
    return `${years} ${yearText}`;
  } else if (years === 0 && months === 0) {
    return `${months + 1} ${monthText}`;
  }
  return `${months} ${monthText}`;
};

export const formatTimeZone = (timestamp: string) => {
  return timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;
};

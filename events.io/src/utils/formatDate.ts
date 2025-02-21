import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function formatIsoDate(inputDate: string | Dayjs, dataFormat?:string ): string {
  const formattedDate = dayjs(inputDate).format(dataFormat || 'MM/D/YY');
  return formattedDate;
}

export function getTimeAgo(timestamp:string) {
  const currentTime = new Date().getTime();
  const inputTime = new Date(timestamp).getTime();
  const elapsed = currentTime - inputTime;

  // Calculate time differences in seconds, minutes, hours, days, and years
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 365) {
    return `${days} days ago`;
  } else {
    return `${years} years ago`;
  }
}


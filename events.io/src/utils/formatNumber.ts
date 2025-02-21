export const formatLargeNumber = (num: number) => {
  const roundeNum = Math.round(num);
  if (roundeNum < 1000) return roundeNum;
  if (roundeNum < 1000000) return `${(roundeNum / 1000).toFixed(1)}K`;
  if (roundeNum < 1000000000) return `${(roundeNum / 1000000).toFixed(1)}M`;
  return `${(roundeNum / 1000000000).toFixed(1)}B`;
};

export const roundLargeNumber = (num: number) => {
  const roundedNum = Math.round(num);
  if (roundedNum < 1000) return roundedNum.toString();
  if (roundedNum < 1000000) return `${Math.floor(roundedNum / 1000)}k`;
  if (roundedNum < 1000000000) return `${Math.floor(roundedNum / 1000000)}m`;
  return `${Math.floor(roundedNum / 1000000000)}b`;
};

export const formatCurrency = (
  number: number,
  currencyCode: string,
  rate?: string
) => {
  const options = {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, // ensure that no decimal portion is displayed in
    maximumFractionDigits: 0, // the formatted currency value.
  };

  const formattedAmount = number.toLocaleString('en-US', options);
  return `${formattedAmount} ${rate || ''}`;
};

export const formatNumberWithoutCurrency = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + 'k'
    : Math.sign(num) * Math.abs(num);
};

export const convertDateToString = (date: Date | undefined) => {
  if (!date) return date;

  if (!isValidDate(date as any)) {
    return;
  }

  return date?.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * @description check if input is valid date
 * @param date
 * @returns
 */
export const isValidDate = (date: string) => {
  const dt = new Date(date)?.toDateString();

  return !dt?.toLowerCase()?.includes('invalid');
};

export const convertDateToStringMonthYear = (date: Date | undefined) => {
  return date?.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
  });
};

export const underscoreToSpace = (input: string) => {
  const words = input?.split('_');
  const transformedWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return transformedWords;
};

export const prefixZero = (number: number): string => {
  if (number < 10) {
    return '0' + number;
  } else {
    return number.toString();
  }
};

export const formatJobMatchScore = (score: number, threshold: number) => {
  const diff = threshold - score;
  if (score >= threshold) {
    return 'success';
  } else if (diff >= 10) {
    return 'warning';
  } else {
    return 'error';
  }
};

export function formatDecimalNumber(
  num: number,
  decimal: number = 2,
  round: boolean = true
): number {
  if (num % 1 !== 0) {
    if (round) {
      // Round to specified decimal places
      return parseFloat(num.toFixed(decimal));
    } else {
      // Truncate without rounding
      const factor = Math.pow(10, decimal);
      return Math.floor(num * factor) / factor;
    }
  }
  return num;
}

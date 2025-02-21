// DateDisplay.tsx

import React from 'react';

interface DateDisplayProps {
  timestamp: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ timestamp }) => {
  const dateObject = new Date(timestamp);

  // Format the date as "May 22, 2023"
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const readableDate = dateObject.toLocaleDateString(undefined, options);

  return <span>{readableDate}</span>;
};

export default DateDisplay;

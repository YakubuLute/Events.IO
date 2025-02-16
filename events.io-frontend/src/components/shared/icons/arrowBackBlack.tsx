import React from 'react';

type Props = {
  color?: string;
};

const ArrowBack = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 12H4M4 12L10 18M4 12L10 6"
        stroke={props?.color ? props?.color : '#110C22'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowBack;

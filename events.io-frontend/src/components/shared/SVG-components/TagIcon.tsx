import React from 'react';
import { IconSvgProps } from '.';

const TagIcon: React.FC<IconSvgProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.97703 10.0122C2.87174 9.90678 2.81257 9.76391 2.8125 9.61492V3.09766H9.32977C9.47875 3.09773 9.62162 3.1569 9.72703 3.26219L16.7105 10.2456C16.8159 10.3511 16.8751 10.4941 16.8751 10.6432C16.8751 10.7924 16.8159 10.9354 16.7105 11.0409L10.7578 16.9956C10.6523 17.101 10.5093 17.1602 10.3602 17.1602C10.2111 17.1602 10.0681 17.101 9.96258 16.9956L2.97703 10.0122Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.90625 7.03516C6.37224 7.03516 6.75 6.6574 6.75 6.19141C6.75 5.72542 6.37224 5.34766 5.90625 5.34766C5.44026 5.34766 5.0625 5.72542 5.0625 6.19141C5.0625 6.6574 5.44026 7.03516 5.90625 7.03516Z"
        fill="#0C27BE"
      />
    </svg>
  );
};

export default TagIcon;

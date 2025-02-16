import React from 'react';
import { IconSvgProps } from '.';

const PrinterIcon: React.FC<IconSvgProps> = (
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
        d="M4.5 5.91016V3.09766H13.5V5.91016M4.5 12.6602H1.6875V7.03516C1.6875 6.41359 2.23313 5.91016 2.90602 5.91016H15.094C15.7669 5.91016 16.3125 6.41359 16.3125 7.03516V12.6602H13.5M4.5 10.9727H13.5V15.4727H4.5V10.9727Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2188 9.28516C13.6847 9.28516 14.0625 8.9074 14.0625 8.44141C14.0625 7.97542 13.6847 7.59766 13.2188 7.59766C12.7528 7.59766 12.375 7.97542 12.375 8.44141C12.375 8.9074 12.7528 9.28516 13.2188 9.28516Z"
        fill="#0C27BE"
      />
    </svg>
  );
};

export default PrinterIcon;

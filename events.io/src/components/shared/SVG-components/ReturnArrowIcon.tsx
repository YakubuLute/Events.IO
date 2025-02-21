import React from 'react';
import { IconSvgProps } from '.';

const ReturnArrowIcon: React.FC<IconSvgProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 9.78516L10.5 0.785156M10.5 0.785156H4.5M10.5 0.785156V6.78516"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReturnArrowIcon;

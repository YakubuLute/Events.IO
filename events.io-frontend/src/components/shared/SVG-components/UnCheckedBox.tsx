import React from 'react';

import { IconSvgProps } from '.';

const UnCheckedBoxIcon: React.FC<IconSvgProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default UnCheckedBoxIcon;

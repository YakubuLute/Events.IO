import React from 'react';
import { IconSvgProps } from '.';

const CircleDashedIcon: React.FC<IconSvgProps> = (
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
        d="M7.3125 2.74673C8.41916 2.45942 9.58084 2.45942 10.6875 2.74673M2.49536 7.47872C2.80007 6.37695 3.38089 5.37115 4.18286 4.55653M4.18286 14.0157C3.38069 13.2007 2.79985 12.1944 2.49536 11.0921M10.6875 15.8248C9.58084 16.1121 8.41916 16.1121 7.3125 15.8248M15.5046 11.0927C15.1999 12.1944 14.6191 13.2002 13.8171 14.0149M13.8171 4.5558C14.6193 5.37081 15.2002 6.37712 15.5046 7.47939"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CircleDashedIcon;

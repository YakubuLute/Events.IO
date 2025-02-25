import * as React from 'react';
import { SVGProps } from 'react';
const UserGroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <circle cx={6.333} cy={5} r={3} stroke="#4F4B5C" strokeWidth={1.333} />
    <path
      stroke="#4F4B5C"
      strokeLinecap="round"
      strokeWidth={1.333}
      d="M10.666 7.83a3.001 3.001 0 0 0 0-5.658M1.333 12.925a6.65 6.65 0 0 1 5-2.257 6.65 6.65 0 0 1 5 2.257M14.666 12.923A6.679 6.679 0 0 0 12 11.086"
    />
  </svg>
);
export default UserGroupIcon;

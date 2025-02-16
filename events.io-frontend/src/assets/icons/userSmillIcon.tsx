import * as React from 'react';
import { SVGProps } from 'react';


const UserSmileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#4F4B5C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M5.333 9.332s1 1.333 2.667 1.333c1.667 0 2.667-1.333 2.667-1.333M10 5.999h.007m-4.673 0h1.333m8 2a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Zm-4.333-2a.333.333 0 1 1-.667 0 .333.333 0 0 1 .667 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default UserSmileIcon;

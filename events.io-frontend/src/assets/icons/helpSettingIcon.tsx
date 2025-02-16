import * as React from 'react';
import { SVGProps } from 'react';


const HelpSettingIcon = (props: SVGProps<SVGSVGElement>) => (
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
        d="M6 6.041a2.058 2.058 0 0 1 4 .686C10 8.1 8 8.786 8 8.786v.683M5.29 2.897l-1.05-.035a1.333 1.333 0 0 0-1.377 1.377l.035 1.05c.013.385-.14.756-.422 1.019l-.767.717a1.333 1.333 0 0 0 0 1.948l.767.717c.281.263.435.635.422 1.02l-.035 1.049a1.333 1.333 0 0 0 1.377 1.377l1.05-.035c.385-.013.756.14 1.019.422l.717.767a1.333 1.333 0 0 0 1.948 0l.717-.767a1.333 1.333 0 0 1 1.02-.422l1.049.035a1.333 1.333 0 0 0 1.377-1.377l-.035-1.05c-.013-.384.14-.756.422-1.019l.767-.717a1.333 1.333 0 0 0 0-1.948l-.767-.717a1.333 1.333 0 0 1-.422-1.02l.035-1.049a1.333 1.333 0 0 0-1.377-1.377l-1.05.035a1.333 1.333 0 0 1-1.019-.422l-.717-.767a1.333 1.333 0 0 0-1.948 0l-.717.767a1.333 1.333 0 0 1-1.02.422Z"
      />
      <circle cx={8} cy={11.335} r={0.667} fill="#4F4B5C" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default HelpSettingIcon;

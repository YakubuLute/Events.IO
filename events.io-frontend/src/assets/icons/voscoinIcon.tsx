import * as React from 'react';
import { SVGProps } from 'react';
const VosCoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <circle
        cx={8}
        cy={7.999}
        r={6.667}
        stroke="#4F4B5C"
        strokeWidth={1.333}
      />
      <path
        fill="#4F4B5C"
        d="m4.761 10.508 2.478 1.306a1.65 1.65 0 0 0 1.522 0l2.478-1.306c.47-.248.761-.706.761-1.203v-2.61c0-.497-.29-.955-.761-1.203L8.76 4.186a1.65 1.65 0 0 0-1.522 0L4.76 5.492C4.291 5.74 4 6.198 4 6.695v2.61c0 .497.29.955.761 1.203Zm.484-4.658h5.51c.556 0 .904.55.625.989l-2.754 4.354c-.278.44-.973.44-1.251 0L4.62 6.839c-.278-.44.07-.99.626-.99Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default VosCoinIcon;

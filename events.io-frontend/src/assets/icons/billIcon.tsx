import * as React from 'react';
import { SVGProps } from 'react';

const BillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#4F4B5C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M14.667 6.665H1.333m6 2.667H4M1.333 5.465v5.067c0 .747 0 1.12.146 1.405.128.251.332.455.583.583.285.145.658.145 1.405.145h9.066c.747 0 1.12 0 1.406-.145.25-.128.455-.332.582-.583.146-.285.146-.658.146-1.405V5.465c0-.746 0-1.12-.146-1.405a1.333 1.333 0 0 0-.582-.583c-.285-.145-.659-.145-1.405-.145H3.466c-.747 0-1.12 0-1.405.145-.251.128-.455.332-.583.583-.146.285-.146.659-.146 1.405Z"
    />
  </svg>
);
export default BillIcon;

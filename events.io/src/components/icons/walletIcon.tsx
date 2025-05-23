import * as React from 'react';
import { SVGProps } from 'react';

const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.667 5.332V3c0-.554 0-.831-.117-1.002a.667.667 0 0 0-.438-.28c-.204-.035-.456.081-.959.314L3.239 4.76c-.449.206-.673.31-.838.47a1.333 1.333 0 0 0-.324.508C2 5.955 2 6.203 2 6.697V10m9-.333h.007M2 7.466v4.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145h7.734c.746 0 1.12 0 1.405-.145.25-.128.455-.332.583-.583.145-.285.145-.659.145-1.405v-4.4c0-.747 0-1.12-.145-1.406a1.334 1.334 0 0 0-.583-.582c-.285-.146-.659-.146-1.405-.146H4.133c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 6.345 2 6.72 2 7.466Zm9.333 2.2a.333.333 0 1 1-.666 0 .333.333 0 0 1 .666 0Z"
    />
  </svg>
);
export default WalletIcon;

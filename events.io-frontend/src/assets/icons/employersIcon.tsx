import * as React from 'react';
import { SVGProps } from 'react';

const EmployersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 13H2.5C2.22386 13 2 12.7761 2 12.5V4.5C2 4.22386 2.22386 4 2.5 4H13.5C13.7761 4 14 4.22386 14 4.5V7.66667H2M10.5 4V3C10.5 2.73478 10.3946 2.48043 10.2071 2.29289C10.0196 2.10536 9.76522 2 9.5 2H6.5C6.23478 2 5.98043 2.10536 5.79289 2.29289C5.60536 2.48043 5.5 2.73478 5.5 3V4M10 14C10.2294 13.1375 11.0375 12.5 12 12.5M12 12.5C12.9625 12.5 13.7706 13.1375 14 14M12 12.5C12.8284 12.5 13.5 11.8284 13.5 11C13.5 10.1716 12.8284 9.5 12 9.5C11.1716 9.5 10.5 10.1716 10.5 11C10.5 11.8284 11.1716 12.5 12 12.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmployersIcon;

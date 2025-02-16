import * as React from 'react';
import { SVGProps } from 'react';


const LinkedinOutlinedIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.54294 3.00543C3.54294 3.9255 2.80342 4.67101 1.89068 4.67101C0.977941 4.67101 0.238422 3.9255 0.238422 3.00543C0.238422 2.08603 0.977941 1.33984 1.89068 1.33984C2.80342 1.33984 3.54294 2.08603 3.54294 3.00543ZM3.55626 6.00348H0.225098V16.6632H3.55626V6.00348ZM8.87414 6.00348H5.56429V16.6632H8.87481V11.0675C8.87481 7.95621 12.8915 7.70171 12.8915 11.0675V16.6632H16.2147V9.9136C16.2147 4.66368 10.2706 4.85489 8.87414 7.43921V6.00348Z" fill={props.color || "#A8AFBB"} />
  </svg>

);
export default LinkedinOutlinedIcon;

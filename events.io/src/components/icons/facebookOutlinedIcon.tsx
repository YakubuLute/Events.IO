import * as React from 'react';
import { SVGProps } from 'react';


const FacebookOutlinedIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.27276 16.6615V9.50988H3.87744V6.66797H6.27276V4.42881C6.27276 1.99601 7.75929 0.671875 9.92976 0.671875C10.9697 0.671875 11.8629 0.749949 12.1221 0.784302V3.3264H10.6168C9.43633 3.3264 9.20835 3.88853 9.20835 4.70987V6.66797H11.8722L11.5069 9.50988H9.20835V16.6615" fill={props.color || "#A8AFBB"} />
  </svg>
);
export default FacebookOutlinedIcon;

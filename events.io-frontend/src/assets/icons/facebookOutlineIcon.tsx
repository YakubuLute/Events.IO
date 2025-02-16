import { SVGProps } from 'react';

function FacebookOutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#4F4B5C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
      ></path>
      <path
        stroke="#4F4B5C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.75 8.25h-1.5A2.25 2.25 0 0012 10.5V21M9 13.5h6"
      ></path>
    </svg>
  );
}

export default FacebookOutlineIcon;
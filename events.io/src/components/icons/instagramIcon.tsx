import { SVGProps } from 'react';

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M12 15.375a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z"
      ></path>
      <path
        stroke="#4F4B5C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3z"
      ></path>
      <path
        fill="#4F4B5C"
        d="M16.875 8.625a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      ></path>
    </svg>
  );
}

export default InstagramIcon;
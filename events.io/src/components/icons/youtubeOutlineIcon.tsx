import { SVGProps } from 'react';

function YoutubeOutlineIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M15.375 12l-5.25-3.375v6.75L15.375 12z"
      ></path>
      <path
        stroke="#4F4B5C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.25 12c0 2.804.288 4.448.507 5.294a1.5 1.5 0 00.9 1.027C6.798 19.533 12 19.5 12 19.5s5.201.032 8.344-1.18a1.5 1.5 0 00.903-1.027c.219-.844.507-2.49.507-5.294 0-2.804-.288-4.448-.507-5.294a1.501 1.501 0 00-.903-1.031C17.2 4.467 12 4.5 12 4.5s-5.201-.033-8.344 1.18a1.5 1.5 0 00-.903 1.03c-.215.84-.503 2.486-.503 5.29z"
      ></path>
    </svg>
  );
}

export default YoutubeOutlineIcon;
type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const YouTubeLogo: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M8.96875 7.00005L5.90625 5.0313V8.9688L8.96875 7.00005Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.3125 7.00005C1.3125 8.63575 1.48039 9.59497 1.60836 10.0883C1.6422 10.2224 1.70738 10.3467 1.79855 10.4508C1.88972 10.5549 2.00427 10.6358 2.13281 10.6871C3.96594 11.3942 7 11.3751 7 11.3751C7 11.3751 10.0341 11.3942 11.8672 10.6871C11.9961 10.6361 12.1111 10.5553 12.2027 10.4512C12.2943 10.347 12.3598 10.2227 12.3938 10.0883C12.5218 9.59607 12.6897 8.63575 12.6897 7.00005C12.6897 5.36435 12.5218 4.40513 12.3938 3.91185C12.3602 3.77695 12.2948 3.65201 12.2032 3.5474C12.1116 3.44278 11.9965 3.3615 11.8672 3.31029C10.0341 2.60591 7 2.62505 7 2.62505C7 2.62505 3.96594 2.60591 2.13281 3.31302C2.00355 3.36424 1.88835 3.44552 1.79677 3.55013C1.70518 3.65475 1.63985 3.77968 1.60617 3.91458C1.48039 4.40458 1.3125 5.36435 1.3125 7.00005Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default YouTubeLogo;

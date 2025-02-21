type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const BagAltIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_8634_35975)">
        <path
          opacity="0.2"
          d="M12.625 13.5C9.46521 13.505 6.36027 12.6745 3.625 11.0925V18.75C3.625 18.9489 3.70402 19.1397 3.84467 19.2803C3.98532 19.421 4.17609 19.5 4.375 19.5H20.875C21.0739 19.5 21.2647 19.421 21.4053 19.2803C21.546 19.1397 21.625 18.9489 21.625 18.75V11.0916C18.8899 12.6741 15.7849 13.505 12.625 13.5Z"
          fill="currentColor"
        />
        <path
          d="M11.125 10.5H14.125"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.875 6H4.375C3.96079 6 3.625 6.33579 3.625 6.75V18.75C3.625 19.1642 3.96079 19.5 4.375 19.5H20.875C21.2892 19.5 21.625 19.1642 21.625 18.75V6.75C21.625 6.33579 21.2892 6 20.875 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.375 6V4.5C16.375 4.10218 16.217 3.72064 15.9357 3.43934C15.6544 3.15804 15.2728 3 14.875 3H10.375C9.97718 3 9.59564 3.15804 9.31434 3.43934C9.03304 3.72064 8.875 4.10218 8.875 4.5V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.625 11.0916C18.8899 12.6741 15.7849 13.505 12.625 13.5C9.46521 13.505 6.36027 12.6745 3.625 11.0925"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8634_35975">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.625)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BagAltIcon;

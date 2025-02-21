type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const WarningIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_6272_162898)">
        <path
          d="M10.999 8.83321V12.3888M10.999 15.9443H11.0079M9.76819 4.29252L2.45718 16.9206C2.05167 17.6211 1.84891 17.9713 1.87888 18.2587C1.90502 18.5094 2.03637 18.7373 2.24024 18.8855C2.47398 19.0554 2.87866 19.0554 3.68801 19.0554H18.31C19.1194 19.0554 19.5241 19.0554 19.7578 18.8855C19.9617 18.7373 20.093 18.5094 20.1192 18.2587C20.1491 17.9713 19.9464 17.6211 19.5409 16.9206L12.2299 4.29252C11.8258 3.5946 11.6238 3.24564 11.3602 3.12843C11.1303 3.0262 10.8678 3.0262 10.6379 3.12843C10.3743 3.24564 10.1723 3.5946 9.76819 4.29252Z"
          stroke="currentColor"
          strokeWidth="2.22222"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6272_162898">
          <rect
            width="21.3333"
            height="21.3333"
            fill="white"
            transform="translate(0.333008 0.833313)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WarningIcon;

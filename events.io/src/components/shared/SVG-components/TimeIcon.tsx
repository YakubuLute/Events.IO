type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const TimeIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_77_5257)">
        <path
          d="M7.99967 4.0026V8.0026L10.6663 9.33594M14.6663 8.0026C14.6663 11.6845 11.6816 14.6693 7.99967 14.6693C4.31778 14.6693 1.33301 11.6845 1.33301 8.0026C1.33301 4.32071 4.31778 1.33594 7.99967 1.33594C11.6816 1.33594 14.6663 4.32071 14.6663 8.0026Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_77_5257">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TimeIcon;

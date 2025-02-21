type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ExperienceLevelIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.67702 14.3727L15.1056 7.42709C15.3715 7.14034 15.4077 6.72036 15.1993 6.39306L12.2116 1.7472C12.0454 1.48941 11.7554 1.33301 11.4412 1.33301H4.56246C4.24828 1.33301 3.95525 1.48941 3.79212 1.7472L0.801357 6.39596C0.59291 6.72326 0.629162 7.14324 0.895007 7.42998L7.32363 14.3756C7.68312 14.7637 8.31753 14.7637 8.67702 14.3727Z"
        fill="url(#paint0_linear_1244_66242)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1244_66242"
          x1="4.00033"
          y1="1.33301"
          x2="12.9721"
          y2="10.0179"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.00537634" stopColor={props.color} />
          <stop offset="1" stopColor={props.fill} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ExperienceLevelIcon;

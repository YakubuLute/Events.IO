type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const XIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.4455 7.05566L6.55664 15.9446M6.55664 7.05566L15.4455 15.9446"
        stroke="currentColor"
        strokeWidth="2.22222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default XIcon;

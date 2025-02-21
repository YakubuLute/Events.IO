type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const MaximizeWindowIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M11.6667 8.33333L17.5 2.5M17.5 2.5H12.5M17.5 2.5V7.5M8.33333 11.6667L2.5 17.5M2.5 17.5H7.5M2.5 17.5L2.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MaximizeWindowIcon;

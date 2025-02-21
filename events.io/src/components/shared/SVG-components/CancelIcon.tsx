type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const CancelIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CancelIcon;

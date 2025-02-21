type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ArrowDownIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33203 3.75V14.25M9.33203 14.25L14.582 9M9.33203 14.25L4.08203 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;

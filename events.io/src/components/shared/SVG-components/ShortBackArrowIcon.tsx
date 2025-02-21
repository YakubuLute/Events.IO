type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ShortBackArrowIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.0625 6H2.9375M2.9375 6L6 9.0625M2.9375 6L6 2.9375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShortBackArrowIcon;

type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const VirtualIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 17V1M19 17V1M1.75 3H18.25C18.6642 3 19 3.31603 19 3.70588V14.2941C19 14.684 18.6642 15 18.25 15H1.75C1.33579 15 1 14.684 1 14.2941V3.70588C1 3.31603 1.33579 3 1.75 3ZM13 9L8.5 11.5981L8.5 6.40192L13 9Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VirtualIcon;

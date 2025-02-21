type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ReplyIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H5.2C6.88016 4.5 7.72024 4.5 8.36197 4.82698C8.92646 5.1146 9.3854 5.57354 9.67302 6.13803C10 6.77976 10 7.61984 10 9.3V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReplyIcon;

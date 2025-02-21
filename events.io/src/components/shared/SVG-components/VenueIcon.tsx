type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const VenueIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M1.25 15H18.75M18.75 3.75L1.25 7.5M5.625 15V10H14.375V15M5.625 12.5H14.375M2.5 7.23206V15M17.5 4.01794V15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VenueIcon;

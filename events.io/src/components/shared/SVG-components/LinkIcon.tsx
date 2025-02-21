type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const LinkIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M6.25 10H13.75M8.125 13.75H5C4.00544 13.75 3.05161 13.3549 2.34835 12.6517C1.64509 11.9484 1.25 10.9946 1.25 10C1.25 9.00544 1.64509 8.05161 2.34835 7.34835C3.05161 6.64509 4.00544 6.25 5 6.25H8.125M11.875 6.25H15C15.9946 6.25 16.9484 6.64509 17.6516 7.34835C18.3549 8.05161 18.75 9.00544 18.75 10C18.75 10.9946 18.3549 11.9484 17.6516 12.6517C16.9484 13.3549 15.9946 13.75 15 13.75H11.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkIcon;

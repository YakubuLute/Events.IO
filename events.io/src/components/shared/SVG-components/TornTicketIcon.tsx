type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const TornTicketIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.25 6L7.75 10.5M7.75 6L12.25 10.5M1 16.5V2.25C1 2.05109 1.07902 1.86032 1.21967 1.71967C1.36032 1.57902 1.55109 1.5 1.75 1.5H18.25C18.4489 1.5 18.6397 1.57902 18.7803 1.71967C18.921 1.86032 19 2.05109 19 2.25V16.5L16 15L13 16.5L10 15L7 16.5L4 15L1 16.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TornTicketIcon;

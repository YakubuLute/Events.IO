type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const LockIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M12.75 7.5V6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6V7.5M9 10.875V12.375M6.6 15.75H11.4C12.6601 15.75 13.2902 15.75 13.7715 15.5048C14.1948 15.289 14.539 14.9448 14.7548 14.5215C15 14.0402 15 13.4101 15 12.15V11.1C15 9.83988 15 9.20982 14.7548 8.72852C14.539 8.30516 14.1948 7.96095 13.7715 7.74524C13.2902 7.5 12.6601 7.5 11.4 7.5H6.6C5.33988 7.5 4.70982 7.5 4.22852 7.74524C3.80516 7.96095 3.46095 8.30516 3.24524 8.72852C3 9.20982 3 9.83988 3 11.1V12.15C3 13.4101 3 14.0402 3.24524 14.5215C3.46095 14.9448 3.80516 15.289 4.22852 15.5048C4.70982 15.75 5.33988 15.75 6.6 15.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LockIcon;

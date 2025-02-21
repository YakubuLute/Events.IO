type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const MediumLogo: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M13.125 3.9375V10.0625M11.375 7C11.375 8.69137 10.7874 10.0625 10.0625 10.0625C9.33763 10.0625 8.75 8.69137 8.75 7C8.75 5.30863 9.33763 3.9375 10.0625 3.9375C10.7874 3.9375 11.375 5.30863 11.375 7ZM7 7C7 8.69137 5.62887 10.0625 3.9375 10.0625C2.24613 10.0625 0.875 8.69137 0.875 7C0.875 5.30863 2.24613 3.9375 3.9375 3.9375C5.62887 3.9375 7 5.30863 7 7Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MediumLogo;

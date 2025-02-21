type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const XLogoForLandingPage: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M6.125 7.875L1.75 12.25M12.25 1.75L8.16667 5.83333M1.75 1.75H4.66667L12.25 12.25H9.33333L1.75 1.75Z"
        stroke="#4F4B5C"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default XLogoForLandingPage;

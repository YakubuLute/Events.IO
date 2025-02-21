type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const DashedCircleIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.75 3.27949C11.2255 2.89642 12.7745 2.89642 14.25 3.27949M3.32715 9.58882C3.73342 8.11978 4.50786 6.77872 5.57715 5.69257M5.57715 18.3048C4.50758 17.2181 3.73313 15.8764 3.32715 14.4067M14.25 20.717C12.7745 21.1 11.2255 21.1 9.75 20.717M20.6729 14.4074C20.2666 15.8764 19.4921 17.2175 18.4229 18.3037M18.4229 5.69159C19.4924 6.77827 20.2669 8.12001 20.6729 9.58971"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashedCircleIcon;

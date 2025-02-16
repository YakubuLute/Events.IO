type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const FacebookLogo: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
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
        d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.10051 9.8995 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25ZM7 12.25V6.125C7 5.7769 7.13828 5.44306 7.38442 5.19692C7.63056 4.95078 7.9644 4.8125 8.3125 4.8125H9.1875M5.25 7.875H8.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FacebookLogo;

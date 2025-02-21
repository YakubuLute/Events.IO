type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const VeriticalIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="40"
      viewBox="0 0 2 40"
      fill="none"
      {...props}
    >
      <path
        d="M1 0.5C1 31.4581 1 39.3992 1 39.5"
        stroke="#F3F3F4"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default VeriticalIcon;

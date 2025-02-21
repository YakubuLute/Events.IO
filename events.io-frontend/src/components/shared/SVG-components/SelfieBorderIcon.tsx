type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SelfieBorderIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="169"
      height="171"
      viewBox="0 0 169 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M43 3V3C20.9086 3 3 20.9086 3 43V55M43 168V168C20.9086 168 3 150.091 3 128V116M126 168V168C148.091 168 166 150.091 166 128V116M126 3V3C148.091 3 166 20.9086 166 43V55"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SelfieBorderIcon;

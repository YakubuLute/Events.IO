type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SnapLogo: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M10.3735 6.7025L11.8124 6.12664M3.62633 6.7025L2.1875 6.12664M9.17492 12.221C8.5143 12.39 7.71367 11.8076 7 11.8076C6.28633 11.8076 5.4857 12.39 4.82508 12.221C4.14148 12.046 3.81172 10.9802 3.20797 10.6482C2.59492 10.3108 1.38141 10.5339 0.875 10.0587C0.875 10.0587 3.9375 8.96492 3.9375 4.375C3.9375 3.56277 4.26016 2.78382 4.83449 2.20949C5.40882 1.63516 6.18777 1.3125 7 1.3125C7.81223 1.3125 8.59119 1.63516 9.16552 2.20949C9.73985 2.78382 10.0625 3.56277 10.0625 4.375C10.0625 8.96273 13.125 10.0587 13.125 10.0587C12.6186 10.5339 11.4051 10.3108 10.792 10.6482C10.1883 10.9802 9.85852 12.046 9.17492 12.221Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SnapLogo;

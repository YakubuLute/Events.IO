type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const CustomLinkLogo: React.FC<Props> = (
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
        d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.10051 9.8995 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.04883 8.75007H11.9516M2.04883 5.25007H11.9516M4.81283 7.00007C4.81283 9.04866 5.54181 10.8785 6.68751 12.1128C6.72731 12.1561 6.77566 12.1907 6.82951 12.2143C6.88335 12.2379 6.94152 12.2501 7.00033 12.2501C7.05913 12.2501 7.1173 12.2379 7.17114 12.2143C7.22499 12.1907 7.27334 12.1561 7.31314 12.1128C8.45884 10.8785 9.18783 9.04866 9.18783 7.00007C9.18783 4.95147 8.45884 3.12163 7.31314 1.88733C7.27334 1.84404 7.22499 1.80948 7.17114 1.78585C7.1173 1.76221 7.05913 1.75 7.00033 1.75C6.94152 1.75 6.88335 1.76221 6.82951 1.78585C6.77566 1.80948 6.72731 1.84404 6.68751 1.88733C5.54181 3.12163 4.81283 4.95147 4.81283 7.00007Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CustomLinkLogo;

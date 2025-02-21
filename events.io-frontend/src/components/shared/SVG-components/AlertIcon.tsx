type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const AlertIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12.0098 17C12.562 17 13.0098 16.5523 13.0098 16C13.0098 15.4477 12.5621 15 12.0098 15H11.9998C11.4475 15 10.9998 15.4477 10.9998 16C10.9998 16.5523 11.4475 17 11.9998 17H12.0098ZM11.0098 12C11.0098 12.5523 11.4575 13 12.0098 13C12.5621 13 13.0098 12.5523 13.0098 12L13.0098 8C13.0098 7.44771 12.5621 7 12.0098 7C11.4575 7 11.0098 7.44771 11.0098 8L11.0098 12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AlertIcon;

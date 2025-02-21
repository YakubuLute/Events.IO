type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const AddCircleIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.9974 17.3327C13.5998 17.3327 17.3307 13.6017 17.3307 8.99935C17.3307 4.39698 13.5998 0.666016 8.9974 0.666016C4.39502 0.666016 0.664062 4.39698 0.664062 8.99935C0.664062 13.6017 4.39502 17.3327 8.9974 17.3327ZM8.16406 13.166V9.83268H4.83073V8.16602H8.16406V4.83268H9.83073V8.16602H13.1641V9.83268H9.83073V13.166H8.16406Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AddCircleIcon;

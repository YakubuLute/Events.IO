type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SmileyFaceIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.1875 7.3125C7.73359 8.09727 6.9718 8.625 6 8.625C5.0282 8.625 4.26641 8.09727 3.8125 7.3125M11.25 6C11.25 8.89949 8.89949 11.25 6 11.25C3.1005 11.25 0.75 8.89949 0.75 6C0.75 3.1005 3.1005 0.75 6 0.75C8.89949 0.75 11.25 3.1005 11.25 6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.24935 5.41667C4.57152 5.41667 4.83268 5.1555 4.83268 4.83333C4.83268 4.51117 4.57152 4.25 4.24935 4.25C3.92718 4.25 3.66602 4.51117 3.66602 4.83333C3.66602 5.1555 3.92718 5.41667 4.24935 5.41667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.74935 5.41667C8.07151 5.41667 8.33268 5.1555 8.33268 4.83333C8.33268 4.51117 8.07151 4.25 7.74935 4.25C7.42718 4.25 7.16602 4.51117 7.16602 4.83333C7.16602 5.1555 7.42718 5.41667 7.74935 5.41667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SmileyFaceIcon;

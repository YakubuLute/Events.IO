type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const UserGroupAltIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <circle
        cx="6.33325"
        cy="5"
        r="3"
        stroke="currentColor"
        strokeWidth="1.33333"
      />
      <path
        d="M10.6667 7.83046C11.8319 7.41863 12.6667 6.30739 12.6667 5.00117C12.6667 3.69495 11.8319 2.58371 10.6667 2.17188"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M1.33325 12.9248C2.55482 11.5409 4.34206 10.668 6.33317 10.668C8.32429 10.668 10.1115 11.5409 11.3331 12.9248"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M14.6665 12.923C13.9486 12.1097 13.0353 11.4728 12 11.0859"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserGroupAltIcon;

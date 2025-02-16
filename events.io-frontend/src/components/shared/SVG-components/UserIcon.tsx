type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const UserIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M3 20.0624C5.19883 17.5712 8.41586 16 11.9999 16C15.5839 16 18.8009 17.5712 20.9997 20.0624M16.75 7.25C16.75 9.87335 14.6234 12 12 12C9.37665 12 7.25 9.87335 7.25 7.25C7.25 4.62665 9.37665 2.5 12 2.5C14.6234 2.5 16.75 4.62665 16.75 7.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserIcon;

type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const UserGroupIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M16.5 15.75V14.25C16.5 12.8521 15.5439 11.6775 14.25 11.3445M11.625 2.46807C12.7244 2.91311 13.5 3.99098 13.5 5.25C13.5 6.50902 12.7244 7.58689 11.625 8.03193M12.75 15.75C12.75 14.3522 12.75 13.6533 12.5216 13.1019C12.2172 12.3669 11.6331 11.7828 10.8981 11.4784C10.3467 11.25 9.64783 11.25 8.25 11.25H6C4.60218 11.25 3.90326 11.25 3.35195 11.4784C2.61687 11.7828 2.03284 12.3669 1.72836 13.1019C1.5 13.6533 1.5 14.3522 1.5 15.75M10.125 5.25C10.125 6.90685 8.78185 8.25 7.125 8.25C5.46815 8.25 4.125 6.90685 4.125 5.25C4.125 3.59315 5.46815 2.25 7.125 2.25C8.78185 2.25 10.125 3.59315 10.125 5.25Z"
        stroke="currentColor"
        strokeWidth="1.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserGroupIcon;

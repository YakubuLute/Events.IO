type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SingleTicketIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 3.5V12.5M1.5 10C2.03043 10 2.53914 9.78929 2.91421 9.41421C3.28929 9.03914 3.5 8.53043 3.5 8C3.5 7.46957 3.28929 6.96086 2.91421 6.58579C2.53914 6.21071 2.03043 6 1.5 6V4C1.5 3.86739 1.55268 3.74021 1.64645 3.64645C1.74021 3.55268 1.86739 3.5 2 3.5H14C14.1326 3.5 14.2598 3.55268 14.3536 3.64645C14.4473 3.74021 14.5 3.86739 14.5 4V6C13.9696 6 13.4609 6.21071 13.0858 6.58579C12.7107 6.96086 12.5 7.46957 12.5 8C12.5 8.53043 12.7107 9.03914 13.0858 9.41421C13.4609 9.78929 13.9696 10 14.5 10V12C14.5 12.1326 14.4473 12.2598 14.3536 12.3536C14.2598 12.4473 14.1326 12.5 14 12.5H2C1.86739 12.5 1.74021 12.4473 1.64645 12.3536C1.55268 12.2598 1.5 12.1326 1.5 12V10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SingleTicketIcon;

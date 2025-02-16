type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const AlarmIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M3.75 2.25L1.5 4.5M16.5 4.5L14.25 2.25M4.5 14.25L3 15.75M13.5 14.25L15 15.75M6.75 10.125L8.25 11.625L11.625 8.25M9 15.75C10.5913 15.75 12.1174 15.1179 13.2426 13.9926C14.3679 12.8674 15 11.3413 15 9.75C15 8.1587 14.3679 6.63258 13.2426 5.50736C12.1174 4.38214 10.5913 3.75 9 3.75C7.4087 3.75 5.88258 4.38214 4.75736 5.50736C3.63214 6.63258 3 8.1587 3 9.75C3 11.3413 3.63214 12.8674 4.75736 13.9926C5.88258 15.1179 7.4087 15.75 9 15.75Z"
        stroke="currentColor"
        strokeWidth="1.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AlarmIcon;

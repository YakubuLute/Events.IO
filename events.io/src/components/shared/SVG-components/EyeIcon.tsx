type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const EyeIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <path
        d="M3.59538 15.8503C3.43326 15.5936 3.35219 15.4653 3.30681 15.2673C3.27273 15.1186 3.27273 14.884 3.30681 14.7353C3.35219 14.5374 3.43326 14.409 3.59538 14.1523C4.93515 12.0309 8.92309 6.66797 15.0005 6.66797C21.0779 6.66797 25.0658 12.0309 26.4056 14.1523C26.5677 14.409 26.6488 14.5374 26.6941 14.7353C26.7282 14.884 26.7282 15.1186 26.6941 15.2673C26.6488 15.4653 26.5677 15.5936 26.4056 15.8503C25.0658 17.9717 21.0779 23.3346 15.0005 23.3346C8.9231 23.3346 4.93515 17.9717 3.59538 15.8503Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0005 18.5727C16.9729 18.5727 18.5719 16.9737 18.5719 15.0013C18.5719 13.0289 16.9729 11.4299 15.0005 11.4299C13.028 11.4299 11.4291 13.0289 11.4291 15.0013C11.4291 16.9737 13.028 18.5727 15.0005 18.5727Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeIcon;

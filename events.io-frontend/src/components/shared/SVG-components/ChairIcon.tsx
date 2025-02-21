type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ChairIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.90909 8.66667V13.6667M16.0909 8.66667V13.6667M18.5455 17V22M5.45455 17V22M5.45455 2H18.5455C18.9973 2 19.3636 2.3731 19.3636 2.83333V7.83333C19.3636 8.29357 18.9973 8.66667 18.5455 8.66667H5.45455C5.00268 8.66667 4.63636 8.29357 4.63636 7.83333V2.83333C4.63636 2.3731 5.00268 2 5.45455 2ZM3.81818 13.6667H20.1818C20.6337 13.6667 21 14.0398 21 14.5V16.1667C21 16.6269 20.6337 17 20.1818 17H3.81818C3.36631 17 3 16.6269 3 16.1667V14.5C3 14.0398 3.36631 13.6667 3.81818 13.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChairIcon;

type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const BusinessBagIcon: React.FC<AddProps> = (
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
        d="M14 10.6667V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V10.6667M10 4V2.66667C10 2.29848 9.70152 2 9.33333 2H6.66667C6.29848 2 6 2.29848 6 2.66667V4M8.28924 9.93572L12.9559 8.89869C13.566 8.76312 14 8.22204 14 7.5971V5.33333C14 4.59695 13.403 4 12.6667 4H3.33333C2.59695 4 2 4.59695 2 5.33333V7.5971C2 8.22204 2.43404 8.76312 3.04409 8.89869L7.71076 9.93572C7.90126 9.97806 8.09874 9.97806 8.28924 9.93572Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BusinessBagIcon;

type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const UserCreateIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <path
        opacity="0.2"
        d="M12.8752 15C10.4964 15 8.39483 16.1865 7.12988 18C7.875 20 9.87539 21 12.8752 21C15.875 21 17.875 20 18.6205 18C17.3556 16.1865 15.2539 15 12.8752 15Z"
        fill="currentColor"
      />
      <path
        d="M6.85547 18.6909C7.41976 17.5794 8.28081 16.6459 9.34316 15.9938C10.4055 15.3418 11.6277 14.9966 12.8742 14.9966C14.1207 14.9966 15.3429 15.3418 16.4053 15.9938C17.4676 16.6459 18.3287 17.5794 18.893 18.6909M17.375 5.25H21.875M19.625 3V7.5M21.7509 10.5C22.0673 12.38 21.7781 14.312 20.9249 16.0169C20.0717 17.7217 18.6988 19.1114 17.0043 19.9851C15.3098 20.8588 13.3815 21.1714 11.4979 20.8777C9.61416 20.584 7.87254 19.6992 6.52448 18.3512C5.17641 17.0031 4.29166 15.2615 3.99798 13.3778C3.70429 11.4941 4.01687 9.56581 4.89057 7.87135C5.76428 6.17689 7.1539 4.80395 8.85878 3.95076C10.5637 3.09758 12.4956 2.80832 14.3756 3.12473M16.625 11.25C16.625 13.3211 14.9461 15 12.875 15C10.8039 15 9.125 13.3211 9.125 11.25C9.125 9.17893 10.8039 7.5 12.875 7.5C14.9461 7.5 16.625 9.17893 16.625 11.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserCreateIcon;

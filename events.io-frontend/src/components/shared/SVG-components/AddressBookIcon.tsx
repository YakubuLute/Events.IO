type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const AddressBookIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
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
        d="M12.75 13.5C14.4069 13.5 15.75 12.1569 15.75 10.5C15.75 8.84315 14.4069 7.5 12.75 7.5C11.0931 7.5 9.75 8.84315 9.75 10.5C9.75 12.1569 11.0931 13.5 12.75 13.5ZM12.75 13.5C11.8767 13.5 11.0155 13.7033 10.2344 14.0938C9.45336 14.4844 8.77395 15.0514 8.25 15.75M12.75 13.5C13.6233 13.5 14.4845 13.7033 15.2656 14.0938C16.0466 14.4844 16.726 15.0514 17.25 15.75M3 6.75H5.25M3 12H5.25M3 17.25H5.25M20.25 3.75V20.25C20.25 20.6642 19.9142 21 19.5 21H6C5.58579 21 5.25 20.6642 5.25 20.25V3.75C5.25 3.33579 5.58579 3 6 3H19.5C19.9142 3 20.25 3.33579 20.25 3.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddressBookIcon;

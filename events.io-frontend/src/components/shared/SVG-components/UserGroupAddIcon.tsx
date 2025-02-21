type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const UserGroupAddIcon: React.FC<AddProps> = (
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
        d="M12.6654 14V10M10.6654 12H14.6654M7.9987 10H5.33203C4.08952 10 3.46826 10 2.97821 10.203C2.3248 10.4736 1.80567 10.9928 1.53502 11.6462C1.33203 12.1362 1.33203 12.7575 1.33203 14M10.332 2.19384C11.3093 2.58943 11.9987 3.54754 11.9987 4.66667C11.9987 5.78579 11.3093 6.7439 10.332 7.13949M8.9987 4.66667C8.9987 6.13943 7.80479 7.33333 6.33203 7.33333C4.85927 7.33333 3.66536 6.13943 3.66536 4.66667C3.66536 3.19391 4.85927 2 6.33203 2C7.80479 2 8.9987 3.19391 8.9987 4.66667Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserGroupAddIcon;

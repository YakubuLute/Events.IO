type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const FolderUserIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
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
        d="M18 18.75C19.2426 18.75 20.25 17.7426 20.25 16.5C20.25 15.2574 19.2426 14.25 18 14.25C16.7574 14.25 15.75 15.2574 15.75 16.5C15.75 17.7426 16.7574 18.75 18 18.75ZM18 18.75C16.5563 18.75 15.3441 19.7062 15 21M18 18.75C19.4437 18.75 20.6559 19.7062 21 21M3 7.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H8.68969C8.88834 4.50009 9.07883 4.57899 9.21937 4.71938L12 7.5M3 7.5V18.8081C3.00049 18.9915 3.07355 19.1672 3.20319 19.2968C3.33284 19.4265 3.50853 19.4995 3.69188 19.5H11.3025M3 7.5H20.25C20.4489 7.5 20.6397 7.57902 20.7803 7.71967C20.921 7.86032 21 8.05109 21 8.25V11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FolderUserIcon;

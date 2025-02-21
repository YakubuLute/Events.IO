type UploadProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};
const UploadCloudIcon: React.FC<UploadProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  // const { color="#0C27BE" } = props;

  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 12L9.5 9M9.5 9L12.5 12M9.5 9V15.75M15.5 12.5571C16.4161 11.8005 17 10.656 17 9.375C17 7.09683 15.1532 5.25 12.875 5.25C12.7111 5.25 12.5578 5.1645 12.4746 5.0233C11.4965 3.36363 9.69082 2.25 7.625 2.25C4.5184 2.25 2 4.7684 2 7.875C2 9.42458 2.62659 10.8278 3.64021 11.8451"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadCloudIcon;

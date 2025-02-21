type DeleteIconProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const DeleteIcon: React.FC<DeleteIconProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  // const { fill="none", color="#110C22", width= "20", height= "20" } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 2.5h5M2.5 5h15m-1.667 0-.584 8.766c-.088 1.315-.132 1.973-.416 2.472a2.5 2.5 0 0 1-1.082 1.012c-.516.25-1.175.25-2.493.25H8.742c-1.318 0-1.977 0-2.493-.25a2.5 2.5 0 0 1-1.082-1.012c-.284-.5-.328-1.157-.416-2.472L4.167 5m4.166 3.75v4.167m3.334-4.167v4.167"
        stroke="currentColor"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;

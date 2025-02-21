type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const FileIcon: React.FC<AddProps> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.75 6.75H11.25M6.75 9H11.25M6.75 11.25H9M15.1369 11.2493H11.25V15.1362M11.0173 15.1875H3.375C3.22582 15.1875 3.08274 15.1282 2.97725 15.0227C2.87176 14.9173 2.8125 14.7742 2.8125 14.625V3.375C2.8125 3.22582 2.87176 3.08274 2.97725 2.97725C3.08274 2.87176 3.22582 2.8125 3.375 2.8125H14.625C14.7742 2.8125 14.9173 2.87176 15.0227 2.97725C15.1282 3.08274 15.1875 3.22582 15.1875 3.375V11.0173C15.1874 11.1663 15.1283 11.3091 15.023 11.4145L11.4145 15.023C11.3091 15.1283 11.1663 15.1874 11.0173 15.1875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileIcon;

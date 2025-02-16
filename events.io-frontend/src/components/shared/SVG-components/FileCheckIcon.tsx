type FileCheckProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};


const FileCheckIcon: React.FC<FileCheckProps> = (props: React.SVGProps<SVGSVGElement>) => {
  // const { color="#0BAA60" } = props;

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15 9.375V5.1C15 3.83988 15 3.20982 14.7548 2.72852C14.539 2.30516 14.1948 1.96095 13.7715 1.74524C13.2902 1.5 12.6601 1.5 11.4 1.5H6.6C5.33988 1.5 4.70982 1.5 4.22852 1.74524C3.80516 1.96095 3.46095 2.30516 3.24524 2.72852C3 3.20982 3 3.83988 3 5.1V12.9C3 14.1601 3 14.7902 3.24524 15.2715C3.46095 15.6948 3.80516 16.039 4.22852 16.2548C4.70982 16.5 5.33988 16.5 6.6 16.5H9M10.5 8.25H6M7.5 11.25H6M12 5.25H6M10.875 14.25L12.375 15.75L15.75 12.375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default FileCheckIcon;

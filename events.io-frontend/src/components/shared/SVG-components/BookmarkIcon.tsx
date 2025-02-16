type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const BookmarkIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <path
        d="M14.9993 16.1899V9.04706M11.4279 12.6185H18.5708M23.3327 25.7137V9.99944C23.3327 7.99925 23.3327 6.99916 22.9434 6.23519C22.601 5.56318 22.0547 5.01682 21.3826 4.67442C20.6187 4.28516 19.6186 4.28516 17.6184 4.28516H12.3803C10.3801 4.28516 9.38002 4.28516 8.61605 4.67442C7.94404 5.01682 7.39768 5.56318 7.05528 6.23519C6.66602 6.99916 6.66602 7.99925 6.66602 9.99944V25.7137L14.9993 20.9518L23.3327 25.7137Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkIcon;

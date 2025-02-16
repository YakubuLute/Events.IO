type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const LoadMoreIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.25 7.5C16.25 7.5 14.7463 5.45116 13.5246 4.22868C12.303 3.0062 10.6148 2.25 8.75 2.25C5.02208 2.25 2 5.27208 2 9C2 12.7279 5.02208 15.75 8.75 15.75C11.8273 15.75 14.4237 13.6907 15.2362 10.875M16.25 7.5V3M16.25 7.5H11.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoadMoreIcon;

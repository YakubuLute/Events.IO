type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const BookmarkAltIcon: React.FC<Props> = (
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
        d="M10.4118 11C12.7508 11 14.6471 9.20911 14.6471 7C14.6471 4.79086 12.7508 3 10.4118 3C8.07268 3 6.17647 4.79086 6.17647 7C6.17647 9.20911 8.07268 11 10.4118 11ZM10.4118 11C6.31837 11 3 14.134 3 18V19M10.4118 11C11.5485 11 12.6255 11.2417 13.5882 11.6736M15.3193 15.4151L16.4195 13.2121C16.5607 12.9293 16.9688 12.9293 17.1099 13.2121L18.2101 15.4151L20.6703 15.7706C20.9859 15.8162 21.1117 16.1997 20.8832 16.4198L19.1033 18.1334L19.5234 20.5543C19.5774 20.8652 19.2472 21.1022 18.9647 20.9554L16.7647 19.8118L14.5647 20.9554C14.2822 21.1022 13.9521 20.8652 14.0061 20.5543L14.4261 18.1334L12.6462 16.4198C12.4177 16.1997 12.5435 15.8162 12.8591 15.7706L15.3193 15.4151Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkAltIcon;

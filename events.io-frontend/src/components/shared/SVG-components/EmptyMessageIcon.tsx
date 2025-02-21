type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const EmptyMessageIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="59"
      height="59"
      viewBox="0 0 59 59"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_1703_1837)">
        <path
          d="M41.474 4.41797C41.474 2.20883 39.6831 0.417969 37.474 0.417969H4.35937C2.15023 0.417969 0.359375 2.20883 0.359375 4.41797V26.6755C0.359375 28.3836 1.74402 29.7682 3.45206 29.7682H3.98712C5.39966 29.7682 6.54476 30.9133 6.54476 32.3258C6.54476 34.6044 9.29969 35.7456 10.9109 34.1344L14.1055 30.9398C14.8556 30.1896 15.873 29.7682 16.9339 29.7682H37.474C39.6831 29.7682 41.474 27.9773 41.474 25.7682V4.41797Z"
          fill="#D9D8DC"
        />
        <path
          d="M21.8242 10.3633C19.6151 10.3633 17.8242 12.1541 17.8242 14.3633V35.7135C17.8242 37.9227 19.6151 39.7135 21.8242 39.7135H43.2828C44.3503 39.7135 45.3736 40.1403 46.1248 40.8988L49.0865 43.8892C50.6271 45.4448 53.279 44.3538 53.279 42.1645C53.279 40.8109 54.3763 39.7135 55.73 39.7135H56.1089C57.6718 39.7135 58.9388 38.4465 58.9388 36.8836V14.3633C58.9388 12.1541 57.148 10.3633 54.9388 10.3633H21.8242Z"
          fill="#F3F3F4"
        />
        <path
          d="M23.7383 19.2969C32.8609 19.2969 41.4956 19.2969 50.6183 19.2969"
          stroke="#676472"
          strokeWidth="2.56"
          strokeLinecap="round"
        />
        <path
          d="M23.7383 24.418C30.0373 24.418 35.9993 24.418 42.2983 24.418"
          stroke="#676472"
          strokeWidth="2.56"
          strokeLinecap="round"
        />
        <path
          d="M23.7383 29.5352C31.2319 29.5352 38.3247 29.5352 45.8183 29.5352"
          stroke="#676472"
          strokeWidth="2.56"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1703_1837">
          <rect
            width="58.5792"
            height="47.7042"
            fill="white"
            transform="translate(0.359375 0.417969)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EmptyMessageIcon;

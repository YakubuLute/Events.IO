type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const MapCompassIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M11.8755 11.8763L18.3091 10.0794C18.4352 10.0407 18.5458 9.9632 18.6252 9.85786C18.7045 9.75251 18.7485 9.62476 18.7509 9.4929C18.7532 9.36103 18.7138 9.2318 18.6382 9.1237C18.5626 9.01561 18.4548 8.93419 18.3302 8.8911L4.58015 3.7911C4.46985 3.75358 4.35126 3.74765 4.23776 3.77396C4.12427 3.80027 4.02038 3.85778 3.93784 3.94C3.85529 4.02222 3.79737 4.12588 3.77061 4.23927C3.74386 4.35266 3.74932 4.47128 3.7864 4.58172L8.8864 18.3317C8.92949 18.4564 9.01091 18.5642 9.11901 18.6398C9.2271 18.7153 9.35633 18.7548 9.4882 18.7524C9.62007 18.7501 9.74782 18.7061 9.85316 18.6267C9.95851 18.5474 10.036 18.4367 10.0747 18.3106L11.8755 11.8763Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MapCompassIcon;

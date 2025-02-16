type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const DribbleLogo: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M3.88281 11.2257C4.66175 9.93553 5.76084 8.86853 7.07352 8.12816C8.38621 7.38779 9.86792 6.99917 11.375 7C11.6698 7 11.9618 7.01477 12.25 7.0432M10.2815 2.90335C9.46182 3.9108 8.42779 4.72275 7.25469 5.28007C6.08159 5.83738 4.79896 6.12603 3.50021 6.12499C2.94676 6.12513 2.39452 6.07313 1.85083 5.96968M4.69971 2.28C6.01551 3.05185 7.10653 4.15447 7.86441 5.47837C8.62229 6.80227 9.02068 8.30139 9.02002 9.82687C9.0205 10.5417 8.93364 11.2539 8.76135 11.9477M12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C4.10051 12.25 1.75 9.8995 1.75 7C1.75 4.10051 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7Z"
        stroke="currentColor"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DribbleLogo;

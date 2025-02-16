type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const NotifyBellIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_7901_19592)">
        <path
          d="M9.12719 11.0087C9.37734 11.9423 8.82332 12.9019 7.88975 13.152C6.95619 13.4022 5.9966 12.8482 5.74645 11.9146M1.20023 7.27455C0.973021 6.45895 1.2093 5.57716 1.81386 4.98442M7.08576 3.84895C7.26321 3.52969 7.32167 3.14382 7.21966 2.76314C7.01121 1.98516 6.21155 1.52348 5.43358 1.73194C4.6556 1.9404 4.19392 2.74005 4.40238 3.51802C4.50438 3.89871 4.74794 4.20366 5.06125 4.39141M11.8532 4.42012C11.6421 3.60018 10.9966 2.95467 10.1767 2.74363M10.2033 6.00987C9.99506 5.23279 9.43919 4.58298 8.65794 4.20339C7.8767 3.82379 6.93408 3.74551 6.03745 3.98576C5.14082 4.22601 4.36363 4.76512 3.87685 5.48448C3.39007 6.20384 3.23358 7.04453 3.44179 7.8216C3.7863 9.1073 3.7194 10.133 3.50185 10.9124C3.25389 11.8008 3.12991 12.2449 3.16341 12.3341C3.20173 12.4362 3.22945 12.4642 3.33108 12.5036C3.41992 12.538 3.79312 12.438 4.53952 12.238L11.4608 10.3834C12.2072 10.1834 12.5804 10.0834 12.6401 10.0092C12.7085 9.92428 12.7185 9.88616 12.7006 9.77864C12.685 9.68465 12.3556 9.36198 11.6967 8.71664C11.1186 8.15042 10.5478 7.29557 10.2033 6.00987Z"
          stroke="currentColor"
          strokeWidth="1.71429"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7901_19592">
          <rect
            width="14"
            height="14"
            fill="currentColor"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NotifyBellIcon;

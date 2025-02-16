type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const VerifiedIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2617_51684)">
        <path
          d="M11.368 1.00684L11.4452 1.16098L12.0276 2.70973C12.0734 2.83169 12.1696 2.92793 12.2916 2.97369L13.7869 3.53467C14.4431 3.78085 14.7957 4.48203 14.6208 5.14544L14.5787 5.27747L13.8831 6.81596C13.8292 6.93455 13.8292 7.07065 13.8831 7.18925L14.5438 8.64326C14.8337 9.28133 14.5872 10.0265 13.9945 10.3719L13.8403 10.4491L12.2916 11.0315C12.1696 11.0773 12.0734 11.1735 12.0276 11.2955L11.4666 12.7908C11.2205 13.447 10.5193 13.7996 9.85587 13.6247L9.72383 13.5826L8.18534 12.887C8.06675 12.8331 7.93065 12.8331 7.81205 12.887L6.35804 13.5477C5.71997 13.8376 4.97483 13.5911 4.62937 12.9984L4.55216 12.8442L3.96978 11.2955C3.92402 11.1735 3.82779 11.0773 3.70582 11.0315L2.21052 10.4705C1.55434 10.2244 1.20173 9.52318 1.37658 8.85977L1.41865 8.72774L2.1143 7.18925C2.16819 7.07065 2.16819 6.93455 2.1143 6.81596L1.45364 5.36194C1.16373 4.72388 1.4102 3.97874 2.00294 3.63328L2.15707 3.55607L3.70582 2.97369C3.82779 2.92793 3.92402 2.83169 3.96978 2.70973L4.53077 1.21443C4.77694 0.558247 5.47812 0.205634 6.14153 0.380488L6.27356 0.422558L7.81205 1.11821C7.93065 1.17209 8.06675 1.17209 8.18534 1.11821L9.63936 0.457549C10.2774 0.167632 11.0226 0.414103 11.368 1.00684Z"
          fill="currentColor"
        />
        <path
          d="M6.96418 8.36353L10.1826 4.68534C10.3467 4.4978 10.6317 4.4788 10.8193 4.64289C11.0068 4.80698 11.0258 5.09203 10.8617 5.27957L7.32572 9.32071C7.15385 9.51713 6.85167 9.5272 6.66711 9.34264L5.15168 7.82721C4.97548 7.65101 4.97548 7.36533 5.15168 7.18912C5.32789 7.01292 5.61357 7.01292 5.78977 7.18912L6.96418 8.36353Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2617_51684"
          x="-0.00130212"
          y="0.332031"
          width="16.0026"
          height="16.0026"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1.33333"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_2617_51684"
          />
          <feOffset dy="1.33333" />
          <feGaussianBlur stdDeviation="1.33333" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0470588 0 0 0 0 0.133333 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2617_51684"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2617_51684"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default VerifiedIcon;

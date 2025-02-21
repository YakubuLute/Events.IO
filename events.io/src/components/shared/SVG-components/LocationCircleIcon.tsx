type LocationCircleProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

// currentColor

const LocationCircleIcon: React.FC<LocationCircleProps> = (props: React.SVGProps<SVGSVGElement>) => {
  // const { color="#110C22" } = props;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_15731_110321)">
        <path d="M3.75 10.7148C2.36148 11.3273 1.5 12.1809 1.5 13.125C1.5 14.989 4.85786 16.5 9 16.5C13.1421 16.5 16.5 14.989 16.5 13.125C16.5 12.1809 15.6385 11.3273 14.25 10.7148M13.5 6C13.5 9.04778 10.125 10.5 9 12.75C7.875 10.5 4.5 9.04778 4.5 6C4.5 3.51472 6.51472 1.5 9 1.5C11.4853 1.5 13.5 3.51472 13.5 6ZM9.75 6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25C9.41421 5.25 9.75 5.58579 9.75 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_15731_110321">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LocationCircleIcon;

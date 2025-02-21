type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const PositionLocationIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 1.4578C13.053 1.16035 12.0452 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11C21 9.28467 20.5681 7.67022 19.8071 6.25945M16 4.75H16.005M9.50005 20.8883L9.50016 18.6849C9.50017 18.5656 9.54286 18.4502 9.62053 18.3596L12.1063 15.4594C12.3106 15.2211 12.2473 14.8556 11.9748 14.6999L9.11853 13.0677C9.04093 13.0234 8.97663 12.9591 8.93234 12.8814L7.07046 9.61863C6.97356 9.44882 6.78657 9.35107 6.59183 9.36841L1.06418 9.86074M20 5C20 7.20914 18 9 16 11C14 9 12 7.20914 12 5C12 2.79086 13.7909 1 16 1C18.2091 1 20 2.79086 20 5ZM16.25 4.75C16.25 4.88807 16.1381 5 16 5C15.8619 5 15.75 4.88807 15.75 4.75C15.75 4.61193 15.8619 4.5 16 4.5C16.1381 4.5 16.25 4.61193 16.25 4.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default PositionLocationIcon;

type LinkedInProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const LinkedInLogo: React.FC<LinkedInProps> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.77496 7.77734V10.7023" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.52496 7.77734V10.7023" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.77496 9.35234C7.77496 8.93463 7.9409 8.53402 8.23627 8.23865C8.53164 7.94328 8.93225 7.77734 9.34996 7.77734C9.76768 7.77734 10.1683 7.94328 10.4637 8.23865C10.759 8.53402 10.925 8.93463 10.925 9.35234V10.7023" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.525 6.20234C6.02206 6.20234 6.425 5.7994 6.425 5.30234C6.425 4.80529 6.02206 4.40234 5.525 4.40234C5.02794 4.40234 4.625 4.80529 4.625 5.30234C4.625 5.7994 5.02794 6.20234 5.525 6.20234Z" fill="#040D3F" />
      <path d="M10.7 2.60156H5.29998C3.80881 2.60156 2.59998 3.81039 2.59998 5.30156V10.7016C2.59998 12.1927 3.80881 13.4016 5.29998 13.4016H10.7C12.1911 13.4016 13.4 12.1927 13.4 10.7016V5.30156C13.4 3.81039 12.1911 2.60156 10.7 2.60156Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default LinkedInLogo;

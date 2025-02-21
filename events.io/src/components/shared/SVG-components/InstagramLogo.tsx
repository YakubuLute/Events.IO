type InstagramProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const InstagramLogo: React.FC<InstagramProps> = (props: React.SVGProps<SVGSVGElement>) => {
  // #040D3F
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.99998 10.0266C9.11835 10.0266 10.025 9.11994 10.025 8.00156C10.025 6.88319 9.11835 5.97656 7.99998 5.97656C6.8816 5.97656 5.97498 6.88319 5.97498 8.00156C5.97498 9.11994 6.8816 10.0266 7.99998 10.0266Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.7 2.60156H5.29998C3.80881 2.60156 2.59998 3.81039 2.59998 5.30156V10.7016C2.59998 12.1927 3.80881 13.4016 5.29998 13.4016H10.7C12.1911 13.4016 13.4 12.1927 13.4 10.7016V5.30156C13.4 3.81039 12.1911 2.60156 10.7 2.60156Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.925 5.97578C11.422 5.97578 11.825 5.57284 11.825 5.07578C11.825 4.57872 11.422 4.17578 10.925 4.17578C10.4279 4.17578 10.025 4.57872 10.025 5.07578C10.025 5.57284 10.4279 5.97578 10.925 5.97578Z" fill="#040D3F" />
    </svg>
  )
}

export default InstagramLogo;

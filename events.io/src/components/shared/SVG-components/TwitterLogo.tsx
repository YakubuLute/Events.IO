type TwitterProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const TwitterLogo: React.FC<TwitterProps> = (props: React.SVGProps<SVGSVGElement>) => {
  // #040D3F
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.74999 10.7002C5.74999 10.7002 2.6478 8.90017 3.09386 3.95017C3.09386 3.95017 5.32474 6.20017 7.99999 6.65017V5.75017C7.99999 4.51267 9.01249 3.48498 10.25 3.50017C10.6867 3.50524 11.1129 3.635 11.4783 3.87418C11.8438 4.11335 12.1332 4.45198 12.3127 4.85017H14.3L12.5 6.65017C12.2604 10.4099 9.12049 13.4002 5.29999 13.4002C3.49999 13.4002 3.04999 12.7252 3.04999 12.7252C3.04999 12.7252 4.84999 12.0502 5.74999 10.7002Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default TwitterLogo;

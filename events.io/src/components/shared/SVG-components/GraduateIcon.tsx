type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const GraduateIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.98828 4.08696V9.30435M1.98828 4.08696L8.24915 6.17391L14.51 4.08696L8.24915 2L1.98828 4.08696ZM3.5535 14C4.57741 12.4296 6.23459 11.3913 8.24915 11.3913M8.24915 11.3913C10.2637 11.3913 11.9209 12.4296 12.9448 14M8.24915 11.3913C8.95748 11.3913 9.65054 11.185 10.2439 10.7981C10.8372 10.4112 11.3053 9.86014 11.591 9.21199C11.8767 8.56384 11.9678 7.84659 11.8532 7.1476C11.7385 6.44861 11.4231 5.79804 10.9452 5.27514M8.24915 11.3913C7.54082 11.3913 6.84777 11.185 6.25442 10.7981C5.66107 10.4112 5.19303 9.86014 4.9073 9.21199C4.62157 8.56384 4.53049 7.84659 4.64514 7.1476C4.7598 6.44861 5.07525 5.79804 5.55307 5.27514"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GraduateIcon;

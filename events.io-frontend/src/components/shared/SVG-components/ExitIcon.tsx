type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const ExitIcon: React.FC<AddProps> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33333 9.91667L12.25 7M12.25 7L9.33333 4.08333M12.25 7H5.25M7 9.91667C7 10.4591 7 10.7304 6.94037 10.9529C6.77855 11.5568 6.30684 12.0286 5.70293 12.1904C5.48039 12.25 5.20915 12.25 4.66667 12.25H4.375C3.5596 12.25 3.1519 12.25 2.8303 12.1168C2.4015 11.9392 2.06083 11.5985 1.88321 11.1697C1.75 10.8481 1.75 10.4404 1.75 9.625V4.375C1.75 3.5596 1.75 3.1519 1.88321 2.8303C2.06083 2.4015 2.40151 2.06083 2.8303 1.88321C3.1519 1.75 3.5596 1.75 4.375 1.75H4.66667C5.20915 1.75 5.48039 1.75 5.70293 1.80963C6.30684 1.97145 6.77855 2.44316 6.94037 3.04707C7 3.26961 7 3.54085 7 4.08333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExitIcon;

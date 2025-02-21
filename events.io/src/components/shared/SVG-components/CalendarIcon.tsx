type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const CalendarIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 8.33073H2.5M13.3333 1.66406V4.9974M6.66667 1.66406V4.9974M8.75 11.6641L10 10.8307V14.9974M8.95833 14.9974H11.0417M6.5 18.3307H13.5C14.9001 18.3307 15.6002 18.3307 16.135 18.0582C16.6054 17.8186 16.9878 17.4361 17.2275 16.9657C17.5 16.4309 17.5 15.7309 17.5 14.3307V7.33073C17.5 5.9306 17.5 5.23053 17.2275 4.69575C16.9878 4.22535 16.6054 3.8429 16.135 3.60321C15.6002 3.33073 14.9001 3.33073 13.5 3.33073H6.5C5.09987 3.33073 4.3998 3.33073 3.86502 3.60321C3.39462 3.8429 3.01217 4.22535 2.77248 4.69575C2.5 5.23053 2.5 5.9306 2.5 7.33073V14.3307C2.5 15.7309 2.5 16.4309 2.77248 16.9657C3.01217 17.4361 3.39462 17.8186 3.86502 18.0582C4.3998 18.3307 5.09987 18.3307 6.5 18.3307Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;

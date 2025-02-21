type AddProps = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const AttachIcon: React.FC<AddProps> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.1518 10.899L12.1361 19.9146C10.0859 21.9648 6.76177 21.9648 4.71152 19.9146C2.66126 17.8643 2.66127 14.5402 4.71152 12.49L13.7271 3.47435C15.094 2.10751 17.31 2.10751 18.6769 3.47434C20.0437 4.84118 20.0437 7.05726 18.6769 8.42409L10.0148 17.0862C9.3314 17.7696 8.22336 17.7696 7.53994 17.0862C6.85653 16.4027 6.85653 15.2947 7.53994 14.6113L15.1413 7.00988"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AttachIcon;

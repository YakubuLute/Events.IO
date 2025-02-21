type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const LoveCardIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      {...props}
    >
      <path
        d="M16.8803 3.41853V8.33584C16.8803 9.00257 16.8803 9.33593 17.0101 9.59059C17.1242 9.81459 17.3064 9.99671 17.5304 10.1108C17.785 10.2406 18.1184 10.2406 18.7851 10.2406H23.7024M16.8803 3.09766H10.6899C8.68968 3.09766 7.68959 3.09766 6.92562 3.48692C6.25361 3.82932 5.70725 4.37568 5.36485 5.04769C4.97559 5.81166 4.97559 6.81175 4.97559 8.81194V21.1929C4.97559 23.1931 4.97559 24.1932 5.36485 24.9571C5.70725 25.6292 6.25361 26.1755 6.92562 26.5179C7.68959 26.9072 8.68968 26.9072 10.6899 26.9072H18.3089C20.3091 26.9072 21.3092 26.9072 22.0732 26.5179C22.7452 26.1755 23.2915 25.6292 23.6339 24.9571C24.0232 24.1932 24.0232 23.1931 24.0232 21.1929V10.2405L16.8803 3.09766ZM14.4961 14.8007C13.5441 13.7186 11.9564 13.4275 10.7635 14.4184C9.57065 15.4093 9.40271 17.0661 10.3395 18.2381C11.2763 19.41 14.4961 22.1453 14.4961 22.1453C14.4961 22.1453 17.716 19.41 18.6528 18.2381C19.5896 17.0661 19.4421 15.3989 18.2287 14.4184C17.0153 13.4379 15.4482 13.7186 14.4961 14.8007Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoveCardIcon;

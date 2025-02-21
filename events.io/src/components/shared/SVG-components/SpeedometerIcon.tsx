type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SpeedometerIcon: React.FC<Props> = (
  props: React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 6C8.68629 6 6 8.68629 6 12C6 14.087 7.06551 15.9251 8.6822 17M18 12C18 14.0075 17.0141 15.7848 15.5 16.874M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM14.7187 8.73215L10.8418 10.9475C9.91423 11.4776 9.74456 12.7446 10.5 13.5C11.2554 14.2554 12.5224 14.0858 13.0525 13.1582L15.2678 9.28126C15.4712 8.9254 15.0746 8.5288 14.7187 8.73215Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SpeedometerIcon;

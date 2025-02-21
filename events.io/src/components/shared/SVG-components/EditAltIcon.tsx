type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const EditAltIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M10.625 5L15 9.375M6.79535 17.5H3.15217C2.9792 17.5 2.81332 17.4313 2.69102 17.309C2.56871 17.1867 2.5 17.0208 2.5 16.8478V13.2046C2.50008 13.0319 2.56868 12.8663 2.69076 12.7441L12.7439 2.69086C12.8662 2.56865 13.0321 2.5 13.205 2.5C13.3778 2.5 13.5437 2.56865 13.666 2.69086L17.3091 6.3316C17.4313 6.45389 17.5 6.61971 17.5 6.7926C17.5 6.96549 17.4313 7.13131 17.3091 7.2536L7.25594 17.3092C7.13373 17.4313 6.96809 17.4999 6.79535 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditAltIcon;

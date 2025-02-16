type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const IdCardIcon: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      <path
        d="M17.68 13.2151H22.1443M17.68 16.7866H22.1443M11.43 16.7866C12.9093 16.7866 14.1085 15.5873 14.1085 14.108C14.1085 12.6286 12.9093 11.4294 11.43 11.4294C9.95063 11.4294 8.7514 12.6286 8.7514 14.108C8.7514 15.5873 9.95063 16.7866 11.43 16.7866ZM11.43 16.7866C9.7659 16.7866 8.25474 17.9249 7.85854 19.4651M11.43 16.7866C13.094 16.7866 14.6063 17.9238 15.0014 19.4651M5.17997 6.07227H24.8228C25.3159 6.07227 25.7157 6.47201 25.7157 6.96512V23.0366C25.7157 23.5297 25.3159 23.9294 24.8228 23.9294H5.17997C4.68686 23.9294 4.28711 23.5297 4.28711 23.0366V6.96512C4.28711 6.47201 4.68686 6.07227 5.17997 6.07227Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IdCardIcon;

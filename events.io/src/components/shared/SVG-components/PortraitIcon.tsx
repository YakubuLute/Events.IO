type Props = {
  fill?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const PortraitIcon: React.FC<Props> = (
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
        d="M6.92374 23.9292C7.47683 22.3611 8.50273 21.0032 9.86001 20.0428C11.2173 19.0823 12.8391 18.5665 14.5019 18.5665C16.1646 18.5665 17.7864 19.0823 19.1437 20.0428C20.501 21.0032 21.5269 22.3611 22.08 23.9292M18.9657 14.108C18.9657 16.5735 16.967 18.5723 14.5014 18.5723C12.0358 18.5723 10.0371 16.5735 10.0371 14.108C10.0371 11.6424 12.0358 9.64369 14.5014 9.64369C16.967 9.64369 18.9657 11.6424 18.9657 14.108ZM4.67997 6.07227H24.3228C24.8159 6.07227 25.2157 6.47201 25.2157 6.96512V23.0366C25.2157 23.5297 24.8159 23.9294 24.3228 23.9294H4.67997C4.18686 23.9294 3.78711 23.5297 3.78711 23.0366V6.96512C3.78711 6.47201 4.18686 6.07227 4.67997 6.07227Z"
        stroke="currentColor"
        strokeWidth="1.78571"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PortraitIcon;

import React from 'react';
import { IconSvgProps } from '.';

const CheckedBoxIcon: React.FC<IconSvgProps> = (
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
      <rect x="3" y="3" width="18" height="18" rx="6" fill="#0C27BE" />
      <path
        d="M16.9496 8.87844C17.34 9.26889 17.34 9.90191 16.9496 10.2924L11.2936 15.9492C10.9031 16.3398 10.2699 16.3398 9.87935 15.9492L7.05051 13.1204C6.66004 12.7299 6.66004 12.0969 7.05051 11.7064C7.44097 11.3159 8.07404 11.3159 8.46451 11.7064L10.5865 13.8284L15.5355 8.87851C15.926 8.48798 16.5591 8.48796 16.9496 8.87844Z"
        fill="#F8F8F8"
      />
    </svg>
  );
};

export default CheckedBoxIcon;

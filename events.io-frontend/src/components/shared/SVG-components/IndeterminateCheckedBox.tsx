import React from 'react';
import { IconSvgProps } from '.';

const IndeterminateCheckedBox: React.FC<IconSvgProps> = (
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
      <rect x="3" y="3" width="18" height="18" rx="6" fill="#8593DE" />
      <rect x="8" y="11" width="8" height="2" rx="1" fill="#F8F8F8" />
    </svg>
  );
};

export default IndeterminateCheckedBox;

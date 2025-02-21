import React from 'react';
import { IconSvgProps } from '.';

const MTNMoMoIcon: React.FC<IconSvgProps> = (
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
      <rect width="24" height="24" rx="12" fill="#FFCB00" />
      <path
        d="M12.2423 7.50024C7.41365 7.50024 3.5 9.45853 3.5 11.8714C3.5 14.2843 7.41365 16.2426 12.2423 16.2426C17.071 16.2426 20.9847 14.2843 20.9847 11.8714C20.9847 9.45853 17.071 7.50024 12.2423 7.50024ZM12.2423 15.5519C7.7954 15.5519 4.19064 13.9025 4.19064 11.8714C4.19064 9.84028 7.7954 8.19089 12.2423 8.19089C16.6893 8.19089 20.294 9.83736 20.294 11.8714C20.294 13.9055 16.6893 15.5519 12.2423 15.5519ZM11.1408 11.105V10.4144H13.6061V11.105H12.7173V13.3285H12.0267V11.105H11.1408ZM16.5844 10.4144V13.3285H15.8937L14.6406 11.5946V13.3285H13.95V10.4144H14.6406L15.8937 12.1483V10.4144H16.5844ZM7.87991 13.3285V10.4144H8.57055L9.33696 11.5946L10.1034 10.4144H10.794V13.3285H10.1034V11.6791L9.57884 12.4834H9.09509L8.57055 11.6791V13.3285H7.87991Z"
        fill="black"
      />
    </svg>
  );
};

export default MTNMoMoIcon;

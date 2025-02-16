import { SVGProps } from 'react';
import { IconSvgProps } from '@/components/shared/SVG-components';

const MailIcon: React.FC<IconSvgProps> = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.667 5.836l6.804 4.763c.55.386.826.578 1.126.653.265.066.541.066.806 0 .3-.075.575-.268 1.126-.653l6.804-4.763M5.667 16.669h8.666c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 001.093-1.093c.272-.534.272-1.235.272-2.635V7.336c0-1.4 0-2.1-.272-2.635a2.5 2.5 0 00-1.093-1.093c-.534-.272-1.235-.272-2.635-.272H5.667c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 00-1.093 1.093c-.272.535-.272 1.235-.272 2.635v5.333c0 1.4 0 2.1.272 2.635a2.5 2.5 0 001.093 1.093c.534.272 1.235.272 2.635.272z"
      ></path>
    </svg>
  );
}

export default MailIcon;

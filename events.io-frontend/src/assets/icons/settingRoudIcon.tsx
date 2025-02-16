import * as React from 'react';
import { SVGProps } from 'react';

const SettingRoundIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      stroke="#4F4B5C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="m6.263 12.913.39.876a1.475 1.475 0 0 0 2.696 0l.39-.876a1.617 1.617 0 0 1 1.646-.95l.954.102a1.475 1.475 0 0 0 1.348-2.334l-.564-.776a1.62 1.62 0 0 1-.307-.956c0-.343.108-.676.31-.953l.564-.775a1.474 1.474 0 0 0-1.348-2.335l-.954.101a1.617 1.617 0 0 1-1.647-.953l-.392-.876a1.475 1.475 0 0 0-2.696 0l-.39.877a1.617 1.617 0 0 1-1.646.952l-.957-.101A1.475 1.475 0 0 0 2.312 6.27l.565.775a1.62 1.62 0 0 1 0 1.905l-.565.776a1.474 1.474 0 0 0 1.348 2.335l.954-.102a1.622 1.622 0 0 1 1.65.953Z"
    />
    <path
      stroke="#4F4B5C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 9.999a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </svg>
);
export default SettingRoundIcon;

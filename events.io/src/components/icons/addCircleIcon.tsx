import * as React from 'react';

interface Props {
  color?: string;
}

const AddCircleIcon = ({ color = '#fff', ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M9 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm-.75-3.75v-3h-3v-1.5h3v-3h1.5v3h3v1.5h-3v3h-1.5Z"
      clipRule="evenodd"
    />
  </svg>
);
export default AddCircleIcon;

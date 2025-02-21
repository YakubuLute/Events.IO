import React from 'react';

type Props = {
  className?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
};
const Search: React.FC<Props> = (props: React.SVGProps<SVGSVGElement>) => {
  const { color="#110C22" } = props;

  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.25 14.75L12.6251 12.125M14.5 7.625C14.5 11.1458 11.6458 14 8.125 14C4.60418 14 1.75 11.1458 1.75 7.625C1.75 4.10418 4.60418 1.25 8.125 1.25C11.6458 1.25 14.5 4.10418 14.5 7.625Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Search;

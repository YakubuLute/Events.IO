import React from 'react';

import { useHeaderContext } from '@/contexts/headerContext';
import { IconButton } from '@mui/material';


// type Props = {};

const OpenNav = () => {
  const { sideBarOpen, setSideBarOpen } = useHeaderContext();
  return (
    <IconButton onClick={() => setSideBarOpen(!sideBarOpen)} sx={{
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: '#F8F8F8'
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <path
          d="M5.43172 6.55642L9.87617 11.0009L5.43172 15.4453M11.6539 6.55642L16.0984 11.0009L11.6539 15.4453"
          stroke="#4F4B5C"
          strokeWidth="1.77778"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

export default OpenNav;

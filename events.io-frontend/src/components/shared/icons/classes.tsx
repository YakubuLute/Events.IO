import React from 'react'

// import ClearIcon from '@mui/icons-material/Clear';

import { useHeaderContext } from '@/contexts/headerContext'
import ButtonSpacing from '../Button/ButtonSpacing'

// type Props = {};

const Classes = () => {
  const { sideBarOpen, setSideBarOpen, isLargeScreen } = useHeaderContext()
  return (
    <ButtonSpacing onClick={() => setSideBarOpen(!sideBarOpen)}>
      {sideBarOpen ? null : isLargeScreen ? null : ( // <ClearIcon />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M3 12H21M3 6H21M3 18H15'
            stroke='#4F4B5C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </ButtonSpacing>
  )
}

export default Classes

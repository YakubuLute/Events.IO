import React from 'react'
import { IconButton } from '@mui/material'

import { useHeaderContext } from '@/contexts/headerContext'

// type Props = {};

const CloseNav = () => {
  const { sideBarOpen, setSideBarOpen } = useHeaderContext()
  return (
    <IconButton
      onClick={() => setSideBarOpen(!sideBarOpen)}
      sx={{
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        backgroundColor: '#F8F8F8'
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='22'
        height='22'
        viewBox='0 0 22 22'
        fill='none'
      >
        <path
          d='M16.4372 15.4436L11.9927 10.9991L16.4372 6.55469M10.215 15.4436L5.77051 10.9991L10.215 6.55469'
          stroke='#4F4B5C'
          strokeWidth='1.77778'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </IconButton>
  )
}

export default CloseNav

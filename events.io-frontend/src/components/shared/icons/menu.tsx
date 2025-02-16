import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'

import BriefcaseIcon from '@/components/ui/icons/briefcaseIcon'
import HamburgerIcon from '@/components/ui/icons/hamburgerIcon'
import { useHeaderContext } from '@/contexts/headerContext'
import { getCurrentUser } from '@/utils'

// type Props = {};

const Menu = () => {
  const { headerOpen, setHeaderOpen } = useHeaderContext()
  const user = getCurrentUser()

  return (
    <IconButton
      onClick={() => setHeaderOpen(!headerOpen)}
      sx={{ display: { xs: 'flex', xxl: 'none' } }}
      className='!bg-transparent'
    >
      {headerOpen ? (
        <ClearIcon className='text-black' />
      ) : user ? (
        <BriefcaseIcon />
      ) : (
        <HamburgerIcon />
      )}
    </IconButton>
  )
}

export default Menu

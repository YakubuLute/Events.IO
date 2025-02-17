'use client'

import React from 'react'
// next navigation
import { useRouter } from 'next/navigation'
// MUI imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Stack } from '@mui/material'

import styles from './header.module.scss'
import { useHeaderContext } from '@/contexts/headerContext'
import Menu from '@/components/shared/icons/menu'

// mantime UI
import { Button } from '@mantine/core'

const Header = () => {
  const { screenSize } = useHeaderContext()
  const { sideBarOpen } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'

  const navigate = useRouter()
  // const userType = userDecoded?.userType;
  // const user = getCurrentUser()

  const navItemsComponent = (
    <div className={styles.home_login_button}>
      <Button
        onClick={() => {
          navigate.push('/auth/login')
        }}
      >
        Login
      </Button>

      <Menu />
    </div>
  )
  const logoAndMobileComponent = (
    <Stack
      direction='row'
      display={{ sx: 'flex', xl: '' }}
      width={{ xxl: '240px' }}
      spacing={2}
    ></Stack>
  )

  return (
    <AppBar
      color='inherit'
      component='header'
      // position="sticky"
      classes={{ root: styles.header_container }}
      sx={{
        boxShadow: 'none',
        top: 0,
        position: { xs: 'sticky', xl: 'fixed' }
      }}
    >
      <Toolbar classes={{ root: styles.header_toolbar }}>
        <>{logoAndMobileComponent}</>
        <>{navItemsComponent}</>
      </Toolbar>
    </AppBar>
  )
}

export default Header

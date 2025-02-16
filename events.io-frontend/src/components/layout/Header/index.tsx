'use client'

import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import styles from './header.module.scss'
import { useHeaderContext } from '@/context/headerContext'
import Menu from '@/components/shared/icons/menu'
import { CustomButton } from '@/components/shared'
import { Stack } from '@mui/material'
import { HeaderLogoBurger } from './HeaderLogoBurger'

const Header = () => {
  const { screenSize } = useHeaderContext()
  const { sideBarOpen } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'

  // const userType = userDecoded?.userType;
  // const user = getCurrentUser()
  // const { data: currentUserInfo } = useGetCurrentUserBasicInfo()
  const rightContentData = (
    <div className={styles.home_login_button}>
      <CustomButton
        label='Login'
        href='/candidate/signin'
        type={'button'}
        buttonClass='login_button'
        hasLink
      />
      <Menu />
    </div>
  )
const leftContentData = (
  <Stack
    direction='row'
    display={{ sx: 'flex', xl: '' }}
    width={{ xxl: '240px' }}
    spacing={2}
  >
    <HeaderLogoBurger haveSidebar platform='employer' />
  </Stack>
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
        <>{leftContentData}</>
        <>{rightContentData}</>
      </Toolbar>
      <>Mobile</>
    </AppBar>
  )
}

export default Header

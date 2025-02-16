'use client'

import React from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import styles from './header.module.scss'
import { useHeaderContext } from '@/context/headerContext'

const Header = () => {
  const { screenSize } = useHeaderContext()
  const { sideBarOpen } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'

  // const userType = userDecoded?.userType;
  // const user = getCurrentUser()
  // const { data: currentUserInfo } = useGetCurrentUserBasicInfo()
let rightContentData = (
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
        <>Hello world</>
      </Toolbar>
      <>Mobile</>
    </AppBar>
  )
}

export default Header

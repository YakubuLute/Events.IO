'use client'

import React from 'react'
// next navigation
import { useRouter } from 'next/navigation'
// MUI imports
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import styles from './header.module.scss'
// import Menu from '@/components/shared/icons/menu'

// mantime UI
import { Button } from '@mantine/core'

const Header = () => {
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
      <Toolbar className={styles.header}>
        <a href='/login' className='nav_item_link'>
          Login
        </a>
        <a href='/register'>Login</a>
      </Toolbar>
    </AppBar>
  )
}

export default Header

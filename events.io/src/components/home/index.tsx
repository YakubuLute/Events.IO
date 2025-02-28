'use client'

import React from 'react'
import { Box, Container } from '@mantine/core'
import Header from '@/components/layout/Header/'
import styles from './landing.module.scss'
import LandingMain from './main'
import Footer from '../layout/Footer'

export default function LandingComponent () {
  return (
    <Box className={styles.mainLandingWrapper}>
      <Header />
      <Box className='min-h-screen md:min-h-[100vh] flex flex-col'>
        <LandingMain />
        <Footer />
      </Box>
    </Box>
  )
}

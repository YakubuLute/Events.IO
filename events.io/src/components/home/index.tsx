'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container } from '@mantine/core'
import Header from '@/components/layout/Header/'
import styles from './landing.module.scss'
import LandingMain from './main'
import Footer from '../layout/Footer'

export default function LandingComponent () {
  const router = useRouter()

  return (
    <Box className={styles.mainLandingWrapper}>
      <Header />
      <Box className='min-h-screen md:min-h-[100vh] flex flex-col'>
        <Container className='max-w-[1208px]'>
          <LandingMain />
        </Container>
        <Footer/>
      </Box>
    </Box>
  )
}

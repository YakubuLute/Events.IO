'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container } from '@mantine/core'

import Header from '@/components/layout/Header/'
import { getCurrentUser } from '@/utils'
import styles from './landing.module.scss'
import LandingFooter from './landingFooter'
import LandingMain from './landingMain'

export default function LandingComponent () {
  // const user = getCurrentUser()
  const router = useRouter()

  return (
    <Box className={styles.mainLandingWrapper}>
      <Header />
      <Box className='min-h-screen md:min-h-[100vh] flex flex-col'>
        <Container className='max-w-[1208px]'>
          <LandingMain />
        </Container>
        <LandingFooter />
      </Box>
    </Box>
  )
}

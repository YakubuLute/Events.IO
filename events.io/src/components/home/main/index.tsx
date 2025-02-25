'use client'

import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import styles from './landing-main.module.scss'

export default function LandingMain () {
  return (
    <Box className={styles.landingPageContainer}>
      <Typography component='h1' className={styles.landingPageTitle}>
        Landing Page Main Content
      </Typography>
    </Box>
  )
}

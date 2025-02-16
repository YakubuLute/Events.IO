'use client'

import React from 'react'
import { Grid,  Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { TPlatformData, platformData } from './constants'
import styles from './landing-main.module.scss'

export default function LandingMain () {
  return (
    <Box className={styles.landingPageContainer}>
      <Typography component='h1' className={styles.landingPageTitle}>
        Empowering Employers, Candidates and Universities - The ultimate
        recruitment and network solution.
      </Typography>

      <Grid container spacing={3} paddingBottom={'8rem'}>
        <Grid item xs={12} md={12}>
          <PlatformCard extend={true} item={platformData[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlatformCard item={platformData[1]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlatformCard item={platformData[2]} />
        </Grid>
      </Grid>
    </Box>
  )
}

const PlatformCard = ({}: { extend?: boolean; item: TPlatformData }) => {
  return <>Main landinf page</>
}

import React from 'react'
import Link from 'next/link'
import {  Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function LandingFooter () {
  return (
    <Box className='fixed bottom-0 left-0 py-3 mt-2 w-full border-t border-t-[#ECECED] bg-white'>
      <Box className='flex flex-col md:flex-row justify-between items-center  w-[90%] mx-auto'>
        <Typography className='text-[#4F4B5C] text-[13px] font-semibold'>
          © {new Date().getFullYear()} Vaurse
        </Typography>

        <Box className='flex items-center gap-2'>
          <Link href='https://vaurse.com/privacy-policy' target='_blank'>
            <Typography className='text-[#4F4B5C] font-semibold text-[13px] hover:text-primary'>
              Privacy policy
            </Typography>
          </Link>
          <Link href='https://vaurse.com/terms-of-service' target='_blank'>
            <Typography className='text-[#4F4B5C] text-[13px] font-semibold hover:text-primary'>
              Terms of use
            </Typography>
          </Link>
          <Link href='https://vaurse.com/referral-terms' target='_blank'>
            <Typography className='text-[#4F4B5C] text-[13px] font-semibold hover:text-primary'>
              Referral terms
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

import React from 'react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function LandingFooter () {
  return (
    <Box className='flex fixed bottom-0 left-0 py-3 mt-2 w-full border-t border-t-[#ECECED] bg-white'>
      <Box className='flex flex-col md:flex-row justify-between items-center  w-[90%] mx-auto'>
        <Typography className='text-[#4F4B5C] text-[13px] font-semibold'>
          © {new Date().getFullYear()} Events.IO
        </Typography>
      </Box>
    </Box>
  )
}

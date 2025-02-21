"use client"
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface CircularProgressBarProps{
  color?:"primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined,
  variant?:"determinate" | "indeterminate" | undefined,
  value?:number | undefined
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ color, variant, value }) => {
  return (
    <Box sx={{ display: 'flex' }}>

    <CircularProgress
     color={color}
     variant={variant}
     value={value}
    />
    </Box>
  );
};

export default CircularProgressBar;

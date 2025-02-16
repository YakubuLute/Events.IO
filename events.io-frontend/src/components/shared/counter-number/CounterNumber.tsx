"use client"
import React from 'react';
import { Box } from '@mui/material';
import styles from "./CounterNumber.module.scss";

interface CounterNumberProps {
    value?:number | undefined
}

const CounterNumber: React.FC<CounterNumberProps> = ({ value }) => {
  return (
    <Box className={styles.counterNumberBox}>
        {value}
    </Box>
  );
};

export default CounterNumber;

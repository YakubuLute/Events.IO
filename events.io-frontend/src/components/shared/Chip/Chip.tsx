'use client';
import React from 'react';
import { Box } from '@mui/material';
import styles from './Chip.module.scss';

interface CustomChipProps {
  label?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | string; // TODO:: It will remove later
}

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  color = 'default',
}) => {
  return (
    <Box
      className={styles.chipItem}
      color={`${[color]}.main`}
      bgcolor={`${[color]}.light`} // TODO:: Lighter theming color need to add
    >
      {label}
    </Box>
  );
};

export default CustomChip;

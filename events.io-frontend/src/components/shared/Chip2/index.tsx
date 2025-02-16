'use client';
import React from 'react';
import { Chip, ChipOwnProps, ChipTypeMap } from '@mui/material';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import styles from './chip2.module.scss';

const Chip2: OverridableComponent<ChipTypeMap> = (props: ChipOwnProps) => {
  return (
    <Chip {...props} className={styles[props.color || 'default']}></Chip>
  )
};

export default Chip2;

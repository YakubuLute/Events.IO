import React from 'react';
import { Typography } from '@mui/material';

import styles from './count-indicator.module.scss';

type CountProps = {
  value: string | undefined | null;
  maxLength: number;
  isCharacter?: boolean;
};

export const CountIndicator = ({
  value,
  maxLength,
  isCharacter,
}: CountProps) => {
  const words = value ? value?.trim().split(/\s+/).length : 0;
  const charCount = value ? value.trim().length : 0;
  return (
    <>
      <Typography variant="body2" component="p" className={styles.count}>
        <span className={(words || charCount) > maxLength ? styles.error : ''}>
          {isCharacter ? charCount : words}
        </span>
        /{maxLength}
      </Typography>
    </>
  );
};

import React from 'react';
import { Typography } from '@mui/material';

import styles from './styles.module.scss';

const DeviceError = () => {
  return (
    <div className={styles.messageBox}>
      <Typography className={styles.message}>
        This page can only be accessed using a mobile device.
      </Typography>
    </div>
  );
};

export default DeviceError;

import React from 'react';
import { Typography } from '@mui/material';

import EmptyMessageIcon from '../SVG-components/EmptyMessageIcon';
import StarsIcon from '../SVG-components/Stars';
import styles from './styles.module.scss';

const EmptyRequests = () => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconBox}>
        <StarsIcon />
        <EmptyMessageIcon />
      </div>
      <Typography component="h2">No Pending Request!</Typography>
      <Typography component="p">
        Pending requests sent by other candidates will show here
      </Typography>
    </div>
  );
};

export default EmptyRequests;

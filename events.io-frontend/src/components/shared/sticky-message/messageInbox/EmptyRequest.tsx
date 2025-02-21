/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import styles from './index.module.scss';

function EmptyRequests() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyBox}>
        <Image
          width={70}
          height={70}
          src={'/assets/images/chat-empty-state.png'}
          alt="empty"
        />
        <Typography className={styles.emptyTitle}>
          No Pending Request
        </Typography>
        <Typography className={styles.emptyDesc}>
          Pending requests sent by other candidates will show here
        </Typography>
      </div>
    </div>
  );
}

export default EmptyRequests;

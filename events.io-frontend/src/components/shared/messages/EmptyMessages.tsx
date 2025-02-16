import React from 'react';
import { Typography } from '@mui/material';

import EmptyMessageIcon from '../SVG-components/EmptyMessageIcon';
import StarsIcon from '../SVG-components/Stars';
import styles from './styles.module.scss';

const EmptyMessages = () => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconBox}>
        <StarsIcon />
        <EmptyMessageIcon />
      </div>
      <Typography component="h2">No Messages Yet!</Typography>
      <Typography component="p">
        Your message center where you can interact, ask questions, and receive
        updates. Feel free to reach out and let&apos;s get the conversation
        rolling!
      </Typography>
    </div>
  );
};

export default EmptyMessages;

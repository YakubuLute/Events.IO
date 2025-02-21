import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import styles from './empty.module.scss';

const EmptyBox = ({ message, title }: { message?: string; title?: string }) => {
  return (
    <div className={styles.emptyBox}>
      <Image
        src="/assets/icons/empty-icon.svg"
        alt="empty-icon"
        width={70}
        height={70}
      />
      <Typography variant="h1" className={styles.title}>
        {title ?? "It's Empty Here!"}
      </Typography>
      <Typography variant="body2" className={styles.desc}>
        {message}
      </Typography>
    </div>
  );
};

export default EmptyBox;

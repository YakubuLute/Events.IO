import React from 'react';
import { Typography } from '@mui/material';

import { CustomSkeleton } from '../skeleton/Skeleton';
import styles from './styles.module.scss';

const UserWrapperRequestsSkeleton = () => {
  return (
    <div
      className={[styles.userWrapper].join(' ')}
      role="button"
      aria-label="Click to chat with user"
    >
      <div className={styles.userBox}>
        <div className={styles.profileBoxRequest}>
          <CustomSkeleton variant="rounded" width={48} height={48} />
          <div className={styles.nameBox}>
            <div className={styles.box}>
              <CustomSkeleton
                variant="rounded"
                width={120}
                height={10}
                sx={{ marginBottom: 1 }}
              />
              <CustomSkeleton
                width={70}
                height={15}
                variant="rounded"
                sx={{ marginBottom: 1, borderRadius: 5 }}
              />
            </div>
            <Typography className={styles.msgText}>
              <CustomSkeleton
                variant="rounded"
                width={150}
                height={10}
                sx={{ marginBottom: 1 }}
              />
            </Typography>
            <CustomSkeleton
              width={100}
              height={15}
              variant="rounded"
              sx={{ borderRadius: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWrapperRequestsSkeleton;

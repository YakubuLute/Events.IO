import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const SingleEventWrapperSkeleton = () => {
  return (
    <div className={styles.eventContainer}>
      <CustomSkeleton
        variant="rounded"
        width={'100%'}
        height={320}
        sx={{ borderRadius: 2 }}
      />
      <CustomSkeleton variant="rounded" width={'40%'} height={15} />
      <div className={styles.eventDateBox}>
        <div className={styles.dateBox}>
          <CustomSkeleton variant="rounded" width={15} height={15} />
          <CustomSkeleton variant="rounded" width={200} height={15} />
        </div>
        <div className={styles.dateBox}>
          <CustomSkeleton variant="rounded" width={15} height={15} />
          <CustomSkeleton variant="rounded" width={200} height={15} />
        </div>
        <div className={styles.dateBox}>
          <CustomSkeleton variant="rounded" width={15} height={15} />
          <CustomSkeleton variant="rounded" width={200} height={15} />
        </div>
      </div>
      {Array.from({ length: 10 })
        .fill('')
        .map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
    </div>
  );
};

export default SingleEventWrapperSkeleton;

import React from 'react';

import { CustomSkeleton } from '../skeleton/Skeleton';
import styles from './styles.module.scss';

const AttendeeCardSkeleton = () => {
  return (
    <div className={styles.attendeeCard}>
      <CustomSkeleton
        width={48}
        height={48}
        variant="rounded"
        sx={{ borderRadius: 3 }}
      />
      <div className={styles.userDetailsBox}>
        <CustomSkeleton
          width={200}
          height={15}
          variant="rounded"
          sx={{ marginBottom: 0.5 }}
        />
        <div className={styles.item}>
          <CustomSkeleton
            width={15}
            height={15}
            variant="rounded"
            sx={{ marginBottom: 0.5 }}
          />
          <CustomSkeleton
            width={100}
            height={15}
            variant="rounded"
            sx={{ marginBottom: 0.5 }}
          />
        </div>
        <div className={styles.item}>
          <CustomSkeleton width={15} height={15} variant="rounded" />
          <CustomSkeleton width={100} height={15} variant="rounded" />
        </div>
      </div>
    </div>
  );
};

export default AttendeeCardSkeleton;

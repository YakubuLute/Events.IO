import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const UniUpdateCardSkeleton = () => {
  return (
    <div className={styles.updateCard}>
      <div className={styles.dividerBox}>
        <div className={styles.typeWrapper}>
          <CustomSkeleton variant="circular" width={8} height={8} />
          <CustomSkeleton variant="rounded" width={50} height={10} />
        </div>
        <CustomSkeleton variant="rounded" width={100} height={10} />
      </div>
      <div className={styles.contentWrapper}>
        <CustomSkeleton
          variant="rounded"
          width={'100%'}
          height={10}
          sx={{ marginBottom: 0.5 }}
        />
        <CustomSkeleton variant="rounded" width={'40%'} height={10} />
        {Array.from({ length: 10 })
          .fill('')
          .map((_, idx) => (
            <CustomSkeleton
              variant="text"
              width={'100%'}
              height={10}
              key={idx}
            />
          ))}
      </div>
    </div>
  );
};

export default UniUpdateCardSkeleton;

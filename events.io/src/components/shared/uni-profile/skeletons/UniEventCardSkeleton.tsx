import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const UniEventCardSkeleton = () => {
  return (
    <div className={styles.updateCard}>
      <div className={styles.uniWrapper}>
        <div className={styles.uniProfileBox}>
          <CustomSkeleton variant="rounded" width={45} height={45} />
          <div className={styles.eventLocBox}>
            <CustomSkeleton
              variant="rounded"
              width={100}
              height={10}
              sx={{ marginBottom: 1 }}
            />
            <div className={styles.locBox}>
              <CustomSkeleton variant="rounded" width={10} height={10} />
              <CustomSkeleton variant="rounded" width={100} height={10} />
            </div>
          </div>
        </div>
        <CustomSkeleton variant="rounded" width={20} height={20} />
      </div>
      <div className={styles.eventDateBox}>
        <div className={styles.dateBox}>
          <CustomSkeleton variant="rounded" width={10} height={10} />
          <CustomSkeleton variant="rounded" width={150} height={10} />
        </div>
        <div className={styles.dateBox}>
          <CustomSkeleton variant="rounded" width={10} height={10} />
          <CustomSkeleton variant="rounded" width={150} height={10} />
        </div>
      </div>
      {Array.from({ length: 10 })
        .fill('')
        .map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
      <div className={styles.eventFooterBox}>
        <CustomSkeleton variant="rounded" width={80} height={30} />
        <div className={styles.attendBox}>
          <CustomSkeleton variant="rounded" width={10} height={10} />
          <CustomSkeleton variant="rounded" width={150} height={10} />
        </div>
      </div>
    </div>
  );
};

export default UniEventCardSkeleton;

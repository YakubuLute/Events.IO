import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const EmReviewCardSkeleton = () => {
  return (
    <div className={styles.emReviewCard}>
      <CustomSkeleton variant="rounded" width={200} height={20} />
      <div className={styles.expressionWrapper}>
        <div className={styles.ratingWrapper}>
          <CustomSkeleton variant="rounded" width={130} height={15} />
          <CustomSkeleton variant="rounded" width={80} height={15} />
        </div>
        <CustomSkeleton variant="rounded" width={300} height={15} />
      </div>
      <div className={styles.contentBox}>
        <CustomSkeleton variant="rounded" width={60} height={15} />
        {Array.from({ length: 3 }).map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
      </div>
      <div className={styles.contentBox}>
        <CustomSkeleton variant="rounded" width={60} height={15} />
        {Array.from({ length: 3 }).map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
      </div>
      <div className={styles.contentBox}>
        <CustomSkeleton variant="rounded" width={60} height={15} />
        {Array.from({ length: 3 }).map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
      </div>
      <div className={styles.divider}></div>
      <CustomSkeleton variant="text" width={200} height={10} />
      <div className={styles.btnGroup}>
        <div className={styles.subBtnGroup}>
          <CustomSkeleton variant="rounded" width={60} height={30} />
          <CustomSkeleton variant="rounded" width={60} height={30} />
        </div>
        <CustomSkeleton variant="rounded" width={60} height={30} />
      </div>
    </div>
  );
};

export default EmReviewCardSkeleton;

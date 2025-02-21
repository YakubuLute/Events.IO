import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const UniUpdateCommentCardSkeleton = () => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.userSection}>
        <div className={styles.commenterBox}>
          <CustomSkeleton variant="circular" width={35} height={35} />
          <CustomSkeleton variant="rounded" width={100} height={10} />
        </div>
        <div className={styles.actionBox}>
          <CustomSkeleton variant="rounded" width={50} height={10} />
          <CustomSkeleton variant="rounded" width={5} height={30} />
        </div>
      </div>
      {Array.from({ length: 5 })
        .fill('')
        .map((_, idx) => (
          <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
        ))}
      <div className={styles.commentFooter}>
        <div className={styles.likeBox}>
          <div className={styles.likeWrapper}>
            <CustomSkeleton variant="rounded" width={20} height={20} />
            <CustomSkeleton variant="rounded" width={10} height={10} />
          </div>
          <div className={styles.likeWrapper}>
            <CustomSkeleton variant="rounded" width={20} height={20} />
            <CustomSkeleton variant="rounded" width={10} height={10} />
          </div>
        </div>
        <CustomSkeleton variant="rounded" width={50} height={15} />
      </div>
    </div>
  );
};

export default UniUpdateCommentCardSkeleton;

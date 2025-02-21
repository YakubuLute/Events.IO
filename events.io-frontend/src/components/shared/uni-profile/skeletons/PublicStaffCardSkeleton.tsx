import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const PublicStaffCardSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <CustomSkeleton variant="rounded" width={48} height={48} />
      <div className={styles.userWrapper}>
        <div className={styles.box}>
          <CustomSkeleton
            variant="rounded"
            width={100}
            height={10}
            sx={{ marginBottom: 1 }}
          />
          <CustomSkeleton
            variant="rounded"
            width={100}
            height={20}
            sx={{ borderRadius: 2, marginBottom: 1 }}
          />
        </div>
        <div className={styles.box}>
          <CustomSkeleton variant="rounded" width={20} height={20} />
          <CustomSkeleton variant="rounded" width={100} height={5} />
        </div>
      </div>
    </div>
  );
};

export default PublicStaffCardSkeleton;

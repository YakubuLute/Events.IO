import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from './styles.module.scss';

const NetworkCardSkeleton = () => {
  return (
    <div className={styles.networkCard}>
      <CustomSkeleton variant="rounded" width={'100%'} height={217} />
      <CustomSkeleton variant="rounded" width={'60%'} height={15} />
      <div className={styles.iconTextBox}>
        <CustomSkeleton variant="rounded" width={15} height={15} />
        <CustomSkeleton variant="rounded" width={150} height={15} />
      </div>
      <div className={styles.iconTextBox}>
        <CustomSkeleton variant="rounded" width={15} height={15} />
        <CustomSkeleton variant="rounded" width={100} height={15} />
      </div>
      <div className={styles.dividedBox}>
        <CustomSkeleton variant="rounded" width={70} height={20} />
        <div className={styles.durationBox}>
          <CustomSkeleton variant="rounded" width={15} height={15} />
          <CustomSkeleton variant="rounded" width={50} height={15} />
        </div>
      </div>
      <div className={styles.btnGroup}>
        <CustomSkeleton
          variant="rounded"
          width={40}
          height={30}
          sx={{ flexShrink: 0, borderRadius: 2 }}
        />
        <CustomSkeleton
          variant="rounded"
          width={'100%'}
          height={30}
          sx={{ borderRadius: 2 }}
        />
      </div>
    </div>
  );
};

export default NetworkCardSkeleton;

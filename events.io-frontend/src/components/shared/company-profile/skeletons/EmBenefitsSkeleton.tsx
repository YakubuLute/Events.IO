import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const EmBenefitsSkeleton = () => {
  return (
    <div className={styles.overviewWrapper}>
      <CustomSkeleton variant="rounded" width={'40%'} height={15} />
      {Array.from({ length: 7 }).map((_, idx) => (
        <CustomSkeleton variant="text" width={'100%'} height={10} key={idx} />
      ))}
    </div>
  );
};

export default EmBenefitsSkeleton;

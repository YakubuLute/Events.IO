import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const CommenterSkeleton = () => {
  return (
    <div className={styles.commenterBox}>
      <CustomSkeleton width={35} height={35} variant="circular" />
      <CustomSkeleton width={130} height={10} variant="rounded" />
    </div>
  );
};

export default CommenterSkeleton;

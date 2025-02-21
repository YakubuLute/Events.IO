import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const UniProfileInfoSkeleton = () => {
  return (
    <>
      <div className={styles.infoContainer}>
        <CustomSkeleton width={'50%'} height={25} />
        <div className={styles.infoWrapper}>
          <div className={styles.infoItem}>
            <CustomSkeleton width={25} height={25} />
            <CustomSkeleton width={250} height={25} />
          </div>
          <div className={styles.infoItem}>
            <CustomSkeleton width={25} height={25} />
            <CustomSkeleton width={250} height={25} />
          </div>
          <div className={styles.infoItem}>
            <CustomSkeleton width={25} height={25} />
            <CustomSkeleton width={250} height={25} />
          </div>
          <div className={styles.infoItem}>
            <CustomSkeleton width={25} height={25} />
            <CustomSkeleton width={250} height={25} />
          </div>
          <div className={styles.socialBox}>
            <CustomSkeleton width={'50%'} height={25} />
            <div className={styles.socialWrapper}>
              <CustomSkeleton
                width={25}
                height={25}
                sx={{ marginRight: 0.5 }}
              />
              <CustomSkeleton
                width={25}
                height={25}
                sx={{ marginRight: 0.5 }}
              />
              <CustomSkeleton
                width={25}
                height={25}
                sx={{ marginRight: 0.5 }}
              />
              <CustomSkeleton width={25} height={25} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <CustomSkeleton width={'30%'} height={25} />
        <div className={styles.infoWrapper}>
          {Array.from({ length: 10 })
            .fill('')
            .map((_, idx) => (
              <CustomSkeleton key={idx} variant="text" height={10} />
            ))}
        </div>
      </div>
    </>
  );
};

export default UniProfileInfoSkeleton;

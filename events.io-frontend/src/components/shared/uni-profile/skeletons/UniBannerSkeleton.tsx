import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import { useHeaderContext } from '@/contexts/headerContext';
import styles from '../styles.module.scss';

const UniBannerSkeleton = () => {
  const { screenSize } = useHeaderContext();
  const isLargeScreen = screenSize === 'desktop';
  const isTabletScreen = screenSize === 'tablet' || screenSize === 'laptop';

  return (
    <div className={styles.bannerWrapper}>
      <CustomSkeleton
        variant="rounded"
        width={'100%'}
        height={isLargeScreen ? 380 : isTabletScreen ? 280 : 180}
        sx={{ borderRadius: 2 }}
      />
      <div className={styles.logoAndButtonBox}>
        <div className={styles.uniBox}>
          <div className={styles.uniImgBox}>
            <CustomSkeleton
              variant="rounded"
              width={'100%'}
              height={isLargeScreen ? 70 : 48}
            />
          </div>
          <CustomSkeleton
            variant="rounded"
            width={150}
            height={10}
            sx={{ marginTop: 1 }}
          />
        </div>
        <CustomSkeleton variant="rounded" width={100} height={30} />
      </div>
    </div>
  );
};

export default UniBannerSkeleton;

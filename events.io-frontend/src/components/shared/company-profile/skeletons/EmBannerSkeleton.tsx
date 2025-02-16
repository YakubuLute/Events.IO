import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import { useHeaderContext } from '@/contexts/headerContext';
import styles from '../styles.module.scss';

const EmBannerSkeleton = () => {
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
      <div className={styles.logoBox}>
        <div className={styles.emBox}>
          <div className={styles.emImgBox}>
            <CustomSkeleton variant="rounded" width={'100%'} height={'100%'} />
          </div>
        </div>
        <div className={styles.emDetailBox}>
          <div className={styles.emTitleRateBox}>
            <CustomSkeleton
              variant="rounded"
              width={200}
              height={15}
              sx={{ marginBottom: isLargeScreen || isTabletScreen ? 0 : 1 }}
            />
            <div className={styles.rateBox}>
              <CustomSkeleton variant="rounded" width={15} height={10} />
              <CustomSkeleton variant="rounded" width={10} height={10} />
              <CustomSkeleton variant="rounded" width={10} height={10} />
              <CustomSkeleton variant="rounded" width={10} height={10} />
              <CustomSkeleton variant="rounded" width={10} height={10} />
              <CustomSkeleton variant="rounded" width={10} height={10} />
            </div>
          </div>
          <div className={styles.itemContainer}>
            <div className={styles.items}>
              <div className={styles.itemBox}>
                <div className={styles.item}>
                  <CustomSkeleton variant="rounded" width={15} height={15} />
                  <CustomSkeleton variant="rounded" width={80} height={10} />
                </div>
                <div className={styles.item}>
                  <CustomSkeleton variant="rounded" width={15} height={15} />
                  <CustomSkeleton variant="rounded" width={80} height={10} />
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className={styles.item}>
                  <CustomSkeleton variant="rounded" width={15} height={15} />
                  <CustomSkeleton variant="rounded" width={80} height={10} />
                </div>
                <div className={styles.item}>
                  <CustomSkeleton variant="rounded" width={15} height={15} />
                  <CustomSkeleton variant="rounded" width={80} height={10} />
                </div>
              </div>
            </div>
            <div className={styles.followBox}>
              <CustomSkeleton variant="rounded" width={'100%'} height={30} />
              <CustomSkeleton variant="rounded" width={80} height={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmBannerSkeleton;

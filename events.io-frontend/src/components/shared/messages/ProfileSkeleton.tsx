import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from './styles.module.scss';

const ProfileSkeleton = () => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.profileWrapper}>
        <CustomSkeleton variant="circular" width={120} height={120} />
        <CustomSkeleton variant="text" height={10} width={'70%'} />
        <CustomSkeleton variant="rounded" height={10} width={'50%'} />
        <CustomSkeleton variant="text" height={10} width={'60%'} />
        <div className={styles.socialWrapper}>
          {Array.from({ length: 8 })
            .fill('')
            .map((_, idx) => (
              <CustomSkeleton
                variant="circular"
                width={30}
                height={30}
                key={idx}
              />
            ))}
        </div>
      </div>
      <div className={styles.worthWrapper}>
        <div className={styles.worthBox}>
          <CustomSkeleton
            variant="rounded"
            height={10}
            width={'100%'}
            sx={{ marginBottom: '5px' }}
          />
          <CustomSkeleton variant="text" height={10} width={'100%'} />
        </div>
        <div className={styles.worthBox}>
          <CustomSkeleton
            variant="rounded"
            height={10}
            width={'100%'}
            sx={{ marginBottom: '5px' }}
          />
          <CustomSkeleton variant="text" height={10} width={'100%'} />
        </div>
        <div className={[styles.worthBox, styles.noBorder].join(' ')}>
          <CustomSkeleton
            variant="rounded"
            height={10}
            width={'100%'}
            sx={{ marginBottom: '5px' }}
          />
          <CustomSkeleton variant="text" height={10} width={'100%'} />
        </div>
      </div>
      <div className={styles.aboutContainer}>
        <CustomSkeleton variant="text" height={10} width={'20%'} />
        {Array.from({ length: 6 })
          .fill('')
          .map((_, idx) => (
            <CustomSkeleton
              variant="text"
              height={10}
              width={'100%'}
              key={idx}
            />
          ))}
      </div>
      <div className={styles.workPreferenceWrapper}>
        <div className={styles.jobTypeWrapper}>
          <CustomSkeleton variant="circular" width={15} height={15} />
          <div className={styles.jobTypeBox}>
            <CustomSkeleton variant="rounded" height={10} width={100} />
            <div className={styles.chipBox}>
              {Array.from({ length: 2 })
                .fill('')
                .map((_, idx) => (
                  <CustomSkeleton
                    variant="rounded"
                    height={15}
                    width={100}
                    sx={{ borderRadius: '100px' }}
                    key={idx}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={styles.jobTypeWrapper}>
          <CustomSkeleton variant="circular" width={15} height={15} />
          <div className={styles.jobTypeBox}>
            <CustomSkeleton variant="rounded" height={10} width={100} />
            <div className={styles.chipBox}>
              {Array.from({ length: 3 })
                .fill('')
                .map((_, idx) => (
                  <CustomSkeleton
                    variant="rounded"
                    height={15}
                    width={100}
                    sx={{ borderRadius: '100px' }}
                    key={idx}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={styles.jobTypeWrapper}>
          <CustomSkeleton variant="circular" width={15} height={15} />
          <div className={styles.jobTypeBox}>
            <CustomSkeleton variant="rounded" height={10} width={100} />
            <div className={styles.chipBox}>
              <CustomSkeleton
                variant="rounded"
                height={15}
                width={200}
                sx={{ borderRadius: '100px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomSkeleton variant="rounded" height={30} width={'100%'} />
    </div>
  );
};

export default ProfileSkeleton;

import React from 'react';

import { CustomSkeleton } from '../skeleton/Skeleton';
import styles from './styles.module.scss';

const UserWrapperSkeleton = ({ length = 10 }: { length?: number }) => {
  return Array.from({ length })
    .fill(' ')
    .map((_, idx) => (
      <div
        className={[
          styles.userWrapper,
          idx === 0 ? styles.noBorder : null,
        ].join(' ')}
        role="button"
        aria-label="Click to chat with user"
        key={idx}
      >
        <div className={styles.userBox}>
          <CustomSkeleton variant="circular" width={7} height={7} />
          <div className={styles.profileBox}>
            <CustomSkeleton variant="rounded" width={48} height={48} />
            <div className={styles.nameBox}>
              <CustomSkeleton
                variant="rounded"
                width={120}
                height={10}
                sx={{ marginBottom: 1 }}
              />
              <CustomSkeleton variant="rounded" width={150} height={10} />
            </div>
          </div>
        </div>
        <CustomSkeleton variant="circular" width={15} height={15} />
      </div>
    ));
};

export default UserWrapperSkeleton;

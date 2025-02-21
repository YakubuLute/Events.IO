import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const EventAttendeesCardSkeleton = () => {
  return (
    <div className={styles.attendeesCard}>
      <CustomSkeleton variant="rounded" width={55} height={55} />
      <div className={styles.attendeeBox}>
        <div className={styles.attendeeHeader}>
          <CustomSkeleton
            variant="rounded"
            width={100}
            height={10}
            sx={{ marginBottom: 0.5 }}
          />
          <CustomSkeleton
            variant="rounded"
            width={60}
            height={15}
            sx={{ marginBottom: 0.5 }}
          />
        </div>
        <div className={styles.locBox}>
          <CustomSkeleton variant="rounded" width={15} height={15} />
          <CustomSkeleton variant="rounded" width={100} height={10} />
        </div>
      </div>
    </div>
  );
};

export default EventAttendeesCardSkeleton;

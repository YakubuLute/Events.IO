import React from 'react';

import { CustomSkeleton } from '@/components/shared';
import styles from '../styles.module.scss';

const EmGallerySkeleton = () => {
  return (
    <div className={styles.galleryContainer}>
      <CustomSkeleton variant="rounded" width={100} height={15} />

      <div className={styles.photoGallery}>
        <div className={styles.column}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className={styles.photo} key={idx}>
              <CustomSkeleton variant="rounded" width={286} height={200} />
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className={styles.photo} key={idx}>
              <CustomSkeleton variant="rounded" width={286} height={200} />
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className={styles.photo} key={idx}>
              <CustomSkeleton variant="rounded" width={286} height={200} />
            </div>
          ))}
        </div>
      </div>
      <CustomSkeleton
        variant="rounded"
        width={100}
        height={30}
        sx={{ margin: '0 auto' }}
      />
    </div>
  );
};

export default EmGallerySkeleton;

import React from 'react';

import EmptyBox from '@/components/shared/empty';
import { SchoolUpdateResponse } from '@/hooks/university';
import UniUpdateCardSkeleton from './skeletons/UniUpdateCardSkeleton';
import styles from './styles.module.scss';
import UniUpdateCard from './UniUpdateCard';

type Props = {
  loading: boolean;
  update: SchoolUpdateResponse;
};

const SingleUniUpdateContainer = ({ loading, update }: Props) => {
  return (
    <div className={styles.updatesContainer}>
      {loading ? (
        <UniUpdateCardSkeleton />
      ) : update ? (
        <UniUpdateCard update={update} />
      ) : (
        <EmptyBox message="Update not found" />
      )}
    </div>
  );
};

export default SingleUniUpdateContainer;

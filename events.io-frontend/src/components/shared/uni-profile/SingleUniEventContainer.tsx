import React from 'react';

import EmptyBox from '@/components/shared/empty';
import { SchoolEventResponseDTO } from '@/hooks/university';
import SingleEventWrapper from './SingleEventWrapper';
import SingleEventWrapperSkeleton from './skeletons/SingleEventWrapperSkeleton';
import styles from './styles.module.scss';

type Props = {
  loading: boolean;
  event: SchoolEventResponseDTO;
};

const SingleUniEventContainer = ({ event, loading }: Props) => {
  return (
    <div className={styles.updatesContainer}>
      {loading ? (
        <SingleEventWrapperSkeleton />
      ) : event ? (
        <SingleEventWrapper event={event} />
      ) : (
        <EmptyBox message="Event not found" />
      )}
    </div>
  );
};

export default SingleUniEventContainer;

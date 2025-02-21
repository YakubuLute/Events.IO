import React from 'react';

import { EventAttendeeData } from '@/@types/shared/type';
import EmptyBox from '../empty';
import AttendeeCard from './AttendeeCard';
import AttendeeCardSkeleton from './AttendeeCardSkeleton';
import styles from './styles.module.scss';

type Props = {
  loading: boolean;
  attendeesData: EventAttendeeData | undefined;
};

const ListContainer = ({ attendeesData, loading }: Props) => {
  return (
    <div className={styles.listContainer}>
      {loading ? (
        Array.from({ length: 10 }).map((_, idx) => (
          <AttendeeCardSkeleton key={idx} />
        ))
      ) : attendeesData && attendeesData.items.length ? (
        attendeesData.items.map((attendee, idx) => (
          <AttendeeCard attendee={attendee} key={idx} />
        ))
      ) : (
        <EmptyBox message="No attendee has been scanned yet." />
      )}
    </div>
  );
};

export default ListContainer;

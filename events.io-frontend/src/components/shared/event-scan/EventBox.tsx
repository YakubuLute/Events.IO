import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { useGetBasicEvent } from '@/hooks/shared';
import styles from './styles.module.scss';

type Props = {
  eventId: string;
};

const EventBox = ({ eventId }: Props) => {
  const { data: event } = useGetBasicEvent(eventId);

  return (
    <div className={styles.eventBox}>
      <Image
        alt="Event Cover Image"
        src={event?.coverImage || `/images/banner.jpeg`}
        width={48}
        height={48}
        unoptimized
      />
      <div className={styles.detailBox}>
        <Typography className={styles.eventName} textTransform="capitalize">
          {event?.title}
        </Typography>
        <Typography className={styles.eventOrganizer}>
          by <span>{event?.institutionName}</span>
        </Typography>
      </div>
    </div>
  );
};

export default EventBox;

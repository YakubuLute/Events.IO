import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { onAxiosError } from '@/utils/shared/axiosError';
import {
  LocationCircleIcon,
  TimeIcon,
} from '@/components/shared/SVG-components';
import CalendarIcon from '@/components/shared/SVG-components/CalendarIcon';
import { successAlert } from '@/components/shared/toastAlert';
import {
  SchoolEventResponseDTO,
  useBookmarkSchoolEvent,
} from '@/hooks/university';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { formatTimeToAMPM } from '@/utils';
import EventsBanner from './EventsBanner';
import styles from './styles.module.scss';

type Props = {
  event: SchoolEventResponseDTO;
};

const SingleEventWrapper = ({ event }: Props) => {
  const [_, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutate: bookmarkEvent } = useBookmarkSchoolEvent({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({ queryKey: ['getAllSchoolEvents'] });
      successAlert({ message: data?.message || 'Bookmark Updated' });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const handleBookmarkEvent = (eventId: string) => {
    bookmarkEvent(eventId);
  };

  return (
    <div className={styles.eventContainer}>
      <EventsBanner event={event} />
      <div className={styles.eventBox}>
        <Typography className={styles.eventTitle} noWrap>
          {event?.title}
        </Typography>
        <IconButton
          className={styles.starBtn}
          aria-label={`rating-${event?.institutionName}`}
          onClick={() => handleBookmarkEvent(event?._id)}
        >
          {event?.bookmarked ? <StarIcon /> : <StarOutlineIcon />}
        </IconButton>
      </div>

      <div className={styles.mainEventDateBox}>
        <div className={styles.locWrapper}>
          <LocationCircleIcon />
          <Typography className={styles.dateText}>
            {event?.location?.address}
          </Typography>
        </div>
        <div className={styles.dateBox}>
          <CalendarIcon />
          <Typography className={styles.dateText}>
            {moment(event?.date).format('MMMM D, YYYY')}
          </Typography>
        </div>
        <div className={styles.dateBox}>
          <TimeIcon />
          <Typography className={styles.dateText}>
            {formatTimeToAMPM(event.startTime)} to{' '}
            {formatTimeToAMPM(event.endTime)} {event?.timezone}
          </Typography>
        </div>
      </div>
      <Typography
        component="div"
        className={styles.contentText}
        dangerouslySetInnerHTML={{ __html: event?.about }}
      />
    </div>
  );
};

export default SingleEventWrapper;

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { onAxiosError } from '@/utils/shared/axiosError';
import { CustomButton } from '@/components/shared';
import {
  LocationCircleIcon,
  TimeIcon,
} from '@/components/shared/SVG-components';
import CalendarIcon from '@/components/shared/SVG-components/CalendarIcon';
import UserGroupIcon from '@/components/shared/SVG-components/UserGroupIcon';
import { successAlert } from '@/components/shared/toastAlert';
import {
  SchoolAllEventsResponse,
  UpdateQueryParams,
  useAttendSchoolEvent,
  useBookmarkSchoolEvent,
} from '@/hooks/university';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { formatTimeToAMPM, removeHtmlTags } from '@/utils';
import styles from './styles.module.scss';

type Props = {
  event: SchoolAllEventsResponse;
  filterDTO?: UpdateQueryParams;
  platform: 'candidate' | 'university' | 'employer';
};

const UniEventCard = ({ event, filterDTO, platform }: Props) => {
  const [_, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutate: bookmarkEvent } = useBookmarkSchoolEvent({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['getAllSchoolEvents', filterDTO],
      });
      successAlert({ message: data?.message || 'Bookmark Updated' });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const handleBookmarkEvent = (eventId: string) => {
    bookmarkEvent(eventId);
  };

  const { mutate: attendEvent, isPending: isAttending } = useAttendSchoolEvent({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['getAllSchoolEvents', filterDTO],
      });
      successAlert({
        message: data?.message,
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onAttendEvent = () => {
    attendEvent(event?._id);
  };

  return (
    <div className={styles.updateCard}>
      <div className={styles.uniWrapper}>
        <div className={styles.uniProfileBox}>
          <Image
            src={event?.coverImage || '/assets/icons/organization_alt.svg'}
            alt={`${event.institutionName} Cover Image`}
            width={45}
            height={45}
          />
          <div className={styles.eventLocBox}>
            {platform === 'candidate' ? (
              <Link href={`/candidate/schools/events/${event._id}`}>
                <Typography className={styles.eventName} noWrap>
                  {event?.title}
                </Typography>
              </Link>
            ) : null}

            {platform === 'university' ? (
              <Link href={`/university/events/${event._id}`}>
                <Typography component="h2">
                  {event?.title || 'No title'}
                </Typography>
              </Link>
            ) : null}

            <div className={styles.locBox}>
              <LocationCircleIcon />
              <Typography className={styles.locText} noWrap>
                {event?.institutionName}
              </Typography>
            </div>
          </div>
        </div>
        {platform === 'candidate' ? (
          <IconButton
            className={styles.starBtn}
            aria-label={`rating-${event?.institutionName}`}
            onClick={() => handleBookmarkEvent(event?._id)}
          >
            {event?.bookmarked ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        ) : null}
      </div>
      <div className={styles.eventDateBox}>
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
      <Typography className={styles.contentText}>
        {removeHtmlTags(event?.summary, 300)}
      </Typography>
      <div className={styles.eventFooterBox}>
        {platform === 'candidate' ? (
          <CustomButton
            label={event?.attending ? 'Attending' : 'Attend'}
            className={[
              styles.attendBtn,
              event?.attending ? styles.attending : styles.attend,
            ].join(' ')}
            variant="text"
            onClick={onAttendEvent}
            isLoading={isAttending}
          />
        ) : null}
        <div className={styles.attendBox}>
          <UserGroupIcon />
          <Typography className={styles.attendText}>
            {event?.totalAttending} Attending
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UniEventCard;

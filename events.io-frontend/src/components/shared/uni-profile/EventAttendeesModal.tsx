import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { onAxiosError } from '@/utils/shared/axiosError';
import { CustomButton, CustomDialog } from '@/components/shared';
import EmptyBox from '@/components/shared/empty';
import { successAlert } from '@/components/shared/toastAlert';
import {
  SchoolEventAttendeesResponseData,
  SchoolEventResponseDTO,
} from '@/hooks/university';
import { useAttendSchoolEvent } from '@/hooks/shared';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import EventAttendeesCard from './EventAttendeesCard';
import EventAttendeesCardSkeleton from './skeletons/EventAttendeesCardSkeleton';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  open: boolean;
  attendeesData: SchoolEventAttendeesResponseData | undefined;
  loading: boolean;
  event: SchoolEventResponseDTO;
  platform: 'candidate' | 'university' | 'employer';
};

const EventAttendeesModal = ({
  onClose,
  open,
  attendeesData,
  loading,
  event,
  platform,
}: Props) => {
  const [_, setError] = useState('');
  const queryClient = useQueryClient();

  const { mutate: attendEvent, isPending: isAttending } = useAttendSchoolEvent({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolEvent', event?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['getSchoolEventAttendees', event?._id],
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
    <CustomDialog onClose={onClose} open={open} title="Attendees">
      <div className={styles.attendeesContainerModal}>
        {loading ? (
          Array.from({ length: 5 })
            .fill('')
            .map((_, idx) => <EventAttendeesCardSkeleton key={idx} />)
        ) : attendeesData && attendeesData.items.length ? (
          attendeesData.items.map((attendee) => (
            <EventAttendeesCard key={attendee._id} attendee={attendee} />
          ))
        ) : (
          <EmptyBox message="No one is currently attending this event yet. Be the first to attend" />
        )}
      </div>
      {platform === 'candidate' ? (
        <div className={styles.attendeeModalFooter}>
          <CustomButton
            label={event?.attending ? 'Attending' : 'Attend'}
            className={[
              styles.attendBtn,
              event?.attending ? styles.attending : styles.attend,
            ].join(' ')}
            variant="text"
            fullWidth
            onClick={onAttendEvent}
            isLoading={isAttending}
          />
        </div>
      ) : null}
    </CustomDialog>
  );
};

export default EventAttendeesModal;

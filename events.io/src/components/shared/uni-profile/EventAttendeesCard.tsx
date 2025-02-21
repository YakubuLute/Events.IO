import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { LocationCircleIcon } from '@/components/shared/SVG-components';
import { SchoolEventAttendeesResponseDTO } from '@/hooks/university';
import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore';
import styles from './styles.module.scss';

type Props = {
  attendee: SchoolEventAttendeesResponseDTO;
};

const EventAttendeesCard = ({ attendee }: Props) => {
  const { handleSelectAlumni } = useAlumniProfileStore();

  return (
    <div className={styles.attendeesCard}>
      <Image
        src={
          attendee?.attendeeProfilePhoto ||
          '/assets/images/user-default-image-sq.svg'
        }
        alt="User Profile"
        width={55}
        height={55}
        className={styles.profileImg}
      />
      <div className={styles.attendeeBox}>
        <div className={styles.attendeeHeader}>
          <button
            onClick={() => {
              handleSelectAlumni(attendee?.attendeeId);
            }}
          >
            <Typography className={styles.attName}>
              {attendee?.attendeeFullName}
            </Typography>
          </button>
          <Typography className={styles.attDesig} component="span">
            {attendee?.attendeeDesignation || 'No Designation'}
          </Typography>
        </div>

        <div className={styles.locBox}>
          <LocationCircleIcon />
          <Typography className={styles.locText}>
            {attendee?.attendeeLocation.country}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default EventAttendeesCard;

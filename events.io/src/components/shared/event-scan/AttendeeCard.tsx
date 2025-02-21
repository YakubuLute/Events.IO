import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { EventAttendeeItem } from '@/@types/shared/type';
import { BriefCaseIcon, LocationCircleIcon } from '../SVG-components';
import styles from './styles.module.scss';

type Props = {
  attendee: EventAttendeeItem;
};

const AttendeeCard = ({ attendee }: Props) => {
  return (
    <div className={styles.attendeeCard}>
      <div className={styles.mainContainer}>
        <Image
          alt="Profile Image"
          src={
            attendee?.attendeeProfilePhoto ||
            `/assets/images/user-default-image-sq.svg`
          }
          width={48}
          height={48}
          unoptimized
        />
        <div className={styles.userDetailsBox}>
          <Typography className={styles.nameText} textTransform="capitalize">
            {attendee?.attendeeFullName}
          </Typography>
          <div className={styles.item}>
            <BriefCaseIcon />
            <Typography className={styles.text} textTransform="capitalize">
              {attendee?.attendeeDesignation}
            </Typography>
          </div>
          <div className={styles.item}>
            <LocationCircleIcon />
            <Typography className={styles.text} textTransform="capitalize">
              {attendee?.attendeeLocation?.city}{' '}
              {attendee?.attendeeLocation?.country}
            </Typography>
          </div>
        </div>
      </div>
      {attendee?.package ? (
        <div className={[styles.packageBox, styles.smallPadding].join(' ')}>
          <Typography className={styles.packageText}>Package</Typography>
          <span className={styles.packageChip}>{attendee?.package}</span>
        </div>
      ) : null}
    </div>
  );
};

export default AttendeeCard;

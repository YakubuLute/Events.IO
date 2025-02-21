import React from 'react';
import Image from 'next/image';
import { IconButton, Typography } from '@mui/material';

import {
  DeleteIcon,
  EditIcon,
  LocationCircleIcon,
} from '@/components/shared/SVG-components';
import { TUniversityStaffProfile } from '@/@types/university/dtos';
import styles from './styles.module.scss';

type Props = {
  staff: TUniversityStaffProfile;
  handleClick: (
    staff: TUniversityStaffProfile,
    action: 'edit' | 'delete'
  ) => void;
  platform: 'candidate' | 'university' | 'employer';
};

const PublicStaffCard = ({ staff, handleClick, platform }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Image
        src={staff?.profilePhoto || '/assets/images/user-default-image-sq.svg'}
        alt="Profil Photo"
        width={48}
        height={48}
      />
      <div className={styles.userWrapper}>
        <div className={styles.box}>
          <Typography className={styles.nametText}>
            {staff?.firstName} {staff?.lastName}
          </Typography>
          <span className={styles.chip}>{staff?.designation}</span>
        </div>
        <div className={styles.box}>
          <LocationCircleIcon />
          <Typography className={styles.locationText}>
            {staff?.location?.country}
          </Typography>
        </div>
      </div>
      {platform === 'university' ? (
        <div className={styles.overlay}>
          <IconButton
            className={[styles.actionBtn, styles.delete].join(' ')}
            onClick={() => handleClick(staff, 'delete')}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={[styles.actionBtn, styles.edit].join(' ')}
            onClick={() => handleClick(staff, 'edit')}
          >
            <EditIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

export default PublicStaffCard;

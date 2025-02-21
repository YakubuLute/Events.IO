import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';

import ScheduleAppointment from '@/components/candidate/appointments/ScheduleAppointment';
import { CustomButton } from '@/components/shared';
import SuccessPrompt from '@/components/shared/prompt-dialog/SuccessPrompt';
import { UniversityFullProfileResponseDTO } from '@/hooks/university';
import styles from './styles.module.scss';

type Props = {
  uniProfile: UniversityFullProfileResponseDTO;
  platform?: 'candidate' | 'university' | 'employer';
};

const UniBanner = ({ uniProfile, platform }: Props) => {
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className={styles.bannerWrapper}>
        <Image
          src={uniProfile?.coverPhoto || '/images/banner.jpeg'}
          alt="banner image"
          height={180}
          width={435}
          className={styles.bannerImg}
          priority
          unoptimized
        />
        <div className={styles.logoAndButtonBox}>
          <div className={styles.uniBox}>
            <div className={styles.uniImgBox}>
              <Image
                src={uniProfile?.logo || '/assets/icons/organization_alt.svg'}
                alt="University Logo"
                width={144}
                height={144}
                className={styles.uniImg}
                unoptimized
              />
            </div>
            <Typography component="h4" className={styles.uniText}>
              {uniProfile?.institutionName}
            </Typography>
          </div>
          {platform === 'candidate' ? (
            <CustomButton
              label="Schedule Appointment"
              onClick={() => setOpenScheduleModal(true)}
            />
          ) : null}

          {platform === 'university' ? (
            <CustomButton
              label="Appointments"
              onClick={() => router.push('/university/appointments')}
            />
          ) : null}
        </div>
      </div>
      <ScheduleAppointment
        onClose={() => setOpenScheduleModal(false)}
        open={openScheduleModal}
        setSuccess={setSuccess}
        uniProfile={uniProfile}
      />
      <SuccessPrompt
        onClose={() => setSuccess(false)}
        open={success}
        title="Your Appointment has been Sent Successfully"
        btnText="Continue"
      />
    </>
  );
};

export default UniBanner;

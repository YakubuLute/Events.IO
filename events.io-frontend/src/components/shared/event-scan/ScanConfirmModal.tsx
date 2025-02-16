import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { ScanResponse, ScanResults } from '@/@types/shared/type';
import CustomDialog from '../dialog/CustomDialog';
import { VaurseVerifiedLogo } from '../SVG-components';
import CheckIcon from '../SVG-components/CheckIcon';
import WarningIcon from '../SVG-components/WarningIcon';
import XIcon from '../SVG-components/XIcon';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  scanResponse: ScanResponse;
};

const ScanConfirmModal = ({ onClose, open, scanResponse }: Props) => {
  const getTitle = (status: `${ScanResults}`) => {
    switch (status) {
      case ScanResults.SUCCESSFUL:
        return {
          title: 'Scan Successful',
          message: 'Attendee is registered on the list.',
        };
      case ScanResults.FAILED:
        return {
          title: 'Scan Unsuccessful',
          message: 'Attendee is not on the registered list.',
        };
      case ScanResults.ATTENDEE_SCANNED:
        return {
          title: 'Already Checked In',
          message: `Attendee already checked in at ${dayjs(
            scanResponse?.attendeeDetails?.attendanceTimestamp
          ).format('h:mm A')}`,
        };
    }
  };

  return (
    <CustomDialog onClose={onClose} open={open} title="Scan Results">
      <div className={styles.confirmMessageBox}>
        <div
          className={[styles.statusCircle, styles[scanResponse?.status]].join(
            ' '
          )}
        >
          {scanResponse?.status === 'successful' ? (
            <CheckIcon />
          ) : scanResponse?.status === 'failed' ? (
            <XIcon />
          ) : (
            <WarningIcon />
          )}
        </div>
        <div className={styles.rightBox}>
          <Typography className={styles.title}>
            {getTitle(scanResponse?.status)?.title}
          </Typography>
          <Typography className={styles.desc}>
            {getTitle(scanResponse?.status)?.message}
          </Typography>
        </div>
      </div>
      <div className={styles.mainProfileBox}>
        <Image
          src={
            scanResponse?.attendeeDetails?.profilePhoto ||
            `/assets/images/user-default-image-cir.svg`
          }
          alt="Profile Image"
          width={120}
          height={120}
          unoptimized
        />
        <div className={styles.profileBox}>
          <div className={styles.nameBox}>
            <Typography className={styles.nameText} textTransform="capitalize">
              {scanResponse?.attendeeDetails?.firstName}{' '}
              {scanResponse?.attendeeDetails?.lastName}
            </Typography>
            {scanResponse?.attendeeDetails?.verified ? (
              <VaurseVerifiedLogo width={20} height={20} color="#1C92FF" />
            ) : null}
          </div>
          <div className={styles.accountIdText}>
            {scanResponse?.attendeeDetails?.accountId}
          </div>
          <Typography className={styles.jobTitle} textTransform="capitalize">
            {scanResponse?.attendeeDetails?.jobTitle}
          </Typography>
        </div>
      </div>
      {scanResponse?.attendeeDetails?.package ? (
        <div className={styles.packageBox}>
          <Typography className={styles.packageText}>Package</Typography>
          <span className={styles.packageChip}>
            {scanResponse?.attendeeDetails?.package}
          </span>
        </div>
      ) : null}
    </CustomDialog>
  );
};

export default ScanConfirmModal;

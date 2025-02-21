import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';

import { useSendEmailVerification } from '@/hooks/candidate';
import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import { CustomButton } from '../Button/Button';
import ArrowBackIcon from '../SVG-components/ArrowBackIcon';
import CheckIcon from '../SVG-components/CheckIcon';
import { promiseToastAlert } from '../toastAlert';
import UpdateEmailModal from './UpdateEmailModal';
import styles from './styles.module.scss';

type Props = {
  onCloseOnboardingList: () => void;
};

const ConfirmEmailItem = ({ onCloseOnboardingList }: Props) => {
  const {
    checklistItem,
    setChecklistItem,
    candidateProfileData,
  } = useOnboardingDialogContext();
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const { refetch } = useSendEmailVerification();

  const handleSendEmail = () => {
    refetch();
    promiseToastAlert({
      promise: refetch,
      pendingMessage: 'Sending email...',
      successMessage: 'Email sent successfully',
      errorMessage: 'Error sending email',
    });
    onCloseOnboardingList();
  };

  return (
    <>
      <div className={styles.itemContainer}>
        <div className={styles.itemWrapper}>
          <div className={[styles.itemBox].join(' ')}>
            <span
              className={[
                styles.radioBox,
                candidateProfileData?.checklist.emailVerified && styles.completed,
              ].join(' ')}
            >
              {candidateProfileData?.checklist.emailVerified ? <CheckIcon /> : null}
            </span>
            <button
              className={styles.itemNameBtn}
              onClick={() =>
                setChecklistItem(checklistItem === 'email' ? null : 'email')
              }
              disabled={candidateProfileData?.checklist.emailVerified}
            >
              Confirm Your Email
            </button>
          </div>
          <IconButton
            className={[
              styles.arrowBtn,
              checklistItem === 'email' && styles.show,
            ].join(' ')}
            onClick={() =>
              setChecklistItem(checklistItem === 'email' ? null : 'email')
            }
            disableRipple
            disabled={candidateProfileData?.checklist.emailVerified}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div
          className={[
            styles.contentWrapper,
            checklistItem === 'email' && styles.show,
          ].join(' ')}
        >
          <Typography className={styles.infoText}>
            A verification link has been sent to{' '}
            <span>{candidateProfileData?.email}</span>
          </Typography>
          <div className={styles.btnGroup}>
            <CustomButton
              label="Resend Link"
              variant="outlined"
              className={styles.mainBtn}
              fullWidth
              onClick={handleSendEmail}
            />
            <CustomButton
              label="Update Email"
              variant="text"
              className={styles.auxBtn}
              fullWidth
              onClick={() => setOpenEmailModal(true)}
            />
          </div>
        </div>
      </div>
      <UpdateEmailModal
        onClose={() => setOpenEmailModal(false)}
        open={openEmailModal}
        onCloseOnboardingList={onCloseOnboardingList}
      />
    </>
  );
};

export default ConfirmEmailItem;

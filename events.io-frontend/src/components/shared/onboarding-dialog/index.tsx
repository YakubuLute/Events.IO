import React from 'react';
import { IconButton, Typography } from '@mui/material';

import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import CancelIcon from '../SVG-components/CancelIcon';
import ConfirmEmailItem from './ConfirmEmailItem';
import InviteItem from './InviteItem';
import MessageValueItem from './MessageValueItem';
import SetUsernameItem from './SetUsernameItem';
import VerificationItem from './VerificationItem';
import styles from './styles.module.scss';

const OnboardingDialogDesktop = () => {
  const { setChecklistItem, setOpenOnboardingDialog, checklistStatus } =
    useOnboardingDialogContext();

  const renderText = () => {
    return checklistStatus ? 'Complete' : 'Incomplete';
  };

  const closeOnboardingDialog = () => {
    setOpenOnboardingDialog(false);
    setChecklistItem(null);
  }

  return (
    <div className={styles.dialogContainer}>
      <div className={styles.topBox}>
        <span
          className={[
            styles.chip,
            checklistStatus ? styles.complete : styles.incomplete,
          ].join(' ')}
        >
          {renderText()}
        </span>
        <IconButton
          className={styles.closeBtn}
          onClick={() => setOpenOnboardingDialog(false)}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <Typography className={styles.header}>Get Started Checklist</Typography>
      <div className={styles.checklistContainer}>
        <ConfirmEmailItem onCloseOnboardingList={closeOnboardingDialog} />
        <SetUsernameItem onCloseOnboardingList={closeOnboardingDialog} />
        <VerificationItem onCloseOnboardingList={closeOnboardingDialog} />
        <MessageValueItem onCloseOnboardingList={closeOnboardingDialog} />
        <InviteItem onCloseOnboardingList={closeOnboardingDialog} />
      </div>
    </div>
  );
};

export default OnboardingDialogDesktop;

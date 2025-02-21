import React from 'react';
import { IconButton, Typography } from '@mui/material';

import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import CustomDialog from '../dialog/CustomDialog';
import CancelIcon from '../SVG-components/CancelIcon';
import ConfirmEmailItem from './ConfirmEmailItem';
import InviteItem from './InviteItem';
import MessageValueItem from './MessageValueItem';
import SetUsernameItem from './SetUsernameItem';
import styles from './styles.module.scss';
import VerificationItem from './VerificationItem';

const OnboardingDialogMobile = () => {
  const {
    openOnboardingDialog,
    setOpenOnboardingDialog,
    checklistStatus,
    setChecklistItem,
  } = useOnboardingDialogContext();

  const renderText = () => {
    return checklistStatus ? 'Complete' : 'Incomplete';
  };

  const renderTop = () => {
    return (
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
    );
  };

  const closeOnboardingDialog = () => {
    setOpenOnboardingDialog(false);
    setChecklistItem(null);
  };

  return (
    <CustomDialog
      open={openOnboardingDialog}
      onClose={() => setOpenOnboardingDialog(false)}
      noBorder
      headContent={renderTop()}
    >
      <div className={styles.mobileContainer}>
        <Typography className={styles.header}>Get Started Checklist</Typography>
        <div className={styles.checklistContainer}>
          <ConfirmEmailItem onCloseOnboardingList={closeOnboardingDialog} />
          <SetUsernameItem onCloseOnboardingList={closeOnboardingDialog} />
          <VerificationItem onCloseOnboardingList={closeOnboardingDialog} />
          <MessageValueItem onCloseOnboardingList={closeOnboardingDialog} />
          <InviteItem onCloseOnboardingList={closeOnboardingDialog} />
        </div>
      </div>
    </CustomDialog>
  );
};

export default OnboardingDialogMobile;

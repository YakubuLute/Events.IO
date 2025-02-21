import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';

import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import { CustomButton } from '../Button/Button';
import ArrowBackIcon from '../SVG-components/ArrowBackIcon';
import CheckIcon from '../SVG-components/CheckIcon';
import CreateUsernameModal from './CreateUsernameModal';
import styles from './styles.module.scss';

type Props = {
  onCloseOnboardingList?: () => void;
};

const SetUsernameItem = ({ onCloseOnboardingList }: Props) => {
  const { checklistItem, setChecklistItem, candidateProfileData } =
    useOnboardingDialogContext();
  const [openUsernameModal, setOpenUsernameModal] = useState(false);

  return (
    <>
      <div className={styles.itemContainer}>
        <div className={styles.itemWrapper}>
          <div className={[styles.itemBox].join(' ')}>
            <span
              className={[
                styles.radioBox,
                candidateProfileData?.checklist.usernameSet && styles.completed,
              ].join(' ')}
            >
              {candidateProfileData?.checklist.usernameSet ? <CheckIcon /> : null}
            </span>
            <button
              className={styles.itemNameBtn}
              onClick={() =>
                setChecklistItem(
                  checklistItem === 'username' ? null : 'username'
                )
              }
            disabled={candidateProfileData?.checklist.usernameSet}
            >
              Set a Username
            </button>
          </div>
          <IconButton
            className={[
              styles.arrowBtn,
              checklistItem === 'username' && styles.show,
            ].join(' ')}
            onClick={() =>
              setChecklistItem(checklistItem === 'username' ? null : 'username')
            }
            disableRipple
            disabled={candidateProfileData?.checklist?.usernameSet}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div
          className={[
            styles.contentWrapper,
            checklistItem === 'username' && styles.show,
          ].join(' ')}
        >
          <Typography className={styles.infoText}>
            Choose a username between 5 to 10 characters to identify your
            profile. It can be alphanumeric.
          </Typography>
          <div className={styles.btnGroup}>
            <CustomButton
              label="Enter Username"
              variant="outlined"
              className={styles.mainBtn}
              onClick={() => {
                setOpenUsernameModal(true);
                // onCloseOnboardingList && onCloseOnboardingList(); this was commented out because it prevents the username modal from coming up
              }}
            />
          </div>
        </div>
      </div >
      <CreateUsernameModal
        onClose={() => setOpenUsernameModal(false)}
        open={openUsernameModal}
      />
    </>
  );
};

export default SetUsernameItem;

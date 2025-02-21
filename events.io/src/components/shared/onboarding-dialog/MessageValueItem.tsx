import React from 'react';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';

import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import { CandidateRoute } from '@/enums/routes';
import { CustomButton } from '../Button/Button';
import ArrowBackIcon from '../SVG-components/ArrowBackIcon';
import CheckIcon from '../SVG-components/CheckIcon';
import styles from './styles.module.scss';

type Props = {
  onCloseOnboardingList?: () => void;
};

const MessageValueItem = ({ onCloseOnboardingList }: Props) => {
  const { checklistItem, setChecklistItem, candidateProfileData } =
    useOnboardingDialogContext();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemWrapper}>
        <div className={[styles.itemBox].join(' ')}>
          <span
            className={[
              styles.radioBox,
              candidateProfileData?.checklist.setConnectionRequestFee &&
                styles.completed,
            ].join(' ')}
          >
            {candidateProfileData?.checklist.setConnectionRequestFee ? (
              <CheckIcon />
            ) : null}
          </span>
          <button
            className={styles.itemNameBtn}
            onClick={() =>
              setChecklistItem(checklistItem === 'message' ? null : 'message')
            }
            disabled={candidateProfileData?.checklist.setConnectionRequestFee}
          >
            Set Message Value
          </button>
        </div>
        <IconButton
          className={[
            styles.arrowBtn,
            checklistItem === 'message' && styles.show,
          ].join(' ')}
          onClick={() =>
            setChecklistItem(checklistItem === 'message' ? null : 'message')
          }
          disableRipple
          disabled={candidateProfileData?.checklist.setConnectionRequestFee}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div
        className={[
          styles.contentWrapper,
          checklistItem === 'message' && styles.show,
        ].join(' ')}
      >
        <Typography className={styles.infoText}>
          Your time is valuable. Set a price that reflects the value of your
          time to respond to messages.
        </Typography>
        <div className={styles.btnGroup}>
          <Link
            href={`${CandidateRoute.ACCOUNT_SETTINGS}?open=message&isPage=true`}
          >
            <CustomButton
              label="Message Settings"
              variant="outlined"
              className={styles.mainBtn}
              onClick={onCloseOnboardingList}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageValueItem;

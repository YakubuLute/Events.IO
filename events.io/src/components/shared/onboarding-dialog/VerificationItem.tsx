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

const VerificationItem = ({ onCloseOnboardingList }: Props) => {
  const { checklistItem, setChecklistItem, candidateProfileData } =
    useOnboardingDialogContext();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemWrapper}>
        <div className={[styles.itemBox].join(' ')}>
          <span
            className={[
              styles.radioBox,
              candidateProfileData?.checklist.identityVerified &&
                styles.completed,
            ].join(' ')}
          >
            {candidateProfileData?.checklist.identityVerified ? (
              <CheckIcon />
            ) : null}
          </span>
          <button
            className={styles.itemNameBtn}
            onClick={() =>
              setChecklistItem(checklistItem === 'verify' ? null : 'verify')
            }
            disabled={candidateProfileData?.checklist.identityVerified}
          >
            Verify Your Identity
          </button>
        </div>
        <IconButton
          className={[
            styles.arrowBtn,
            checklistItem === 'verify' && styles.show,
          ].join(' ')}
          onClick={() =>
            setChecklistItem(checklistItem === 'verify' ? null : 'verify')
          }
          disableRipple
          disabled={candidateProfileData?.checklist.identityVerified}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div
        className={[
          styles.contentWrapper,
          checklistItem === 'verify' && styles.show,
        ].join(' ')}
      >
        <Typography className={styles.infoText}>
          Build trust by verifying your personal identity.
        </Typography>
        <div className={styles.btnGroup}>
          <Link href={`${CandidateRoute.VERIFICATION}?isPage=true`}>
            <CustomButton
              label="Verification Center"
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

export default VerificationItem;

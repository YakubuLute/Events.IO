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

const InviteItem = ({ onCloseOnboardingList }: Props) => {
  const { checklistItem, setChecklistItem, candidateProfileData } =
    useOnboardingDialogContext();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemWrapper}>
        <div className={[styles.itemBox].join(' ')}>
          <span
            className={[
              styles.radioBox,
              candidateProfileData?.checklist.invitedAFriend &&
                styles.completed,
            ].join(' ')}
          >
            {candidateProfileData?.checklist.invitedAFriend ? (
              <CheckIcon />
            ) : null}
          </span>
          <button
            className={styles.itemNameBtn}
            onClick={() =>
              setChecklistItem(checklistItem === 'invite' ? null : 'invite')
            }
            disabled={candidateProfileData?.checklist.invitedAFriend}
          >
            Invite a Friend
          </button>
        </div>
        <IconButton
          className={[
            styles.arrowBtn,
            checklistItem === 'invite' && styles.show,
          ].join(' ')}
          onClick={() =>
            setChecklistItem(checklistItem === 'invite' ? null : 'invite')
          }
          disableRipple
          disabled={candidateProfileData?.checklist.invitedAFriend}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div
        className={[
          styles.contentWrapper,
          checklistItem === 'invite' && styles.show,
        ].join(' ')}
      >
        <Typography className={styles.infoText}>
          Refer a friend via email to join and earn up to $10K each time they
          get hired on Vaurse.
        </Typography>
        <div className={styles.btnGroup}>
          <Link href={`${CandidateRoute.REFERRALS}?isPage=true`}>
            <CustomButton
              label="Refer a Friend"
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

export default InviteItem;

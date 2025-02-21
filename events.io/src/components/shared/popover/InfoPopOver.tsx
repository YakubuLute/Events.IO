import React from 'react';
import { Typography } from '@mui/material';

import { NetworkItem } from '@/@types/shared/type';
import CustomPopover from './index';
import styles from './style.module.scss';

type Props = {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  network: NetworkItem;
};

const InfoPopOver = ({ anchorEl, handleClose, open, network }: Props) => {
  return (
    <CustomPopover anchorEl={anchorEl} handleClose={handleClose} open={open}>
      <Typography component="p" className={styles.popoverText}>
        Identity:
      </Typography>
      <Typography component="p" className={styles.popoverText}>
        ID: <span>{network?.identityVerified ? 'verified' : 'unverified'}</span>
      </Typography>
      <Typography component="p" className={styles.popoverText}>
        Photo: <span>{network?.faceVerified ? 'verified' : 'unverified'}</span>
      </Typography>
      <Typography component="p" className={styles.popoverText}>
        Address:{' '}
        <span>{network?.addressVerified ? 'verified' : 'unverified'}</span>
      </Typography>
      {/* This must be commented out once the blockchain ready */}
      {/* <Typography component="p" className={styles.popoverText}>
            View on{' '}
            <Link
              href={candidateProfileData?.kycBlockchainVerificationUrl || ''}
              target="_blank"
            >
              blockchain
            </Link>
          </Typography> */}
    </CustomPopover>
  );
};

export default InfoPopOver;

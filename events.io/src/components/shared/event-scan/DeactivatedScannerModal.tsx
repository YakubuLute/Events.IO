import React from 'react';
import { Typography } from '@mui/material';

import CustomDialog from '../dialog/CustomDialog';
import XIcon from '../SVG-components/XIcon';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

const DeactivatedScannerModal = ({ onClose, open }: Props) => {
  return (
    <CustomDialog onClose={onClose} noClose open={open} title="">
      <div className={[styles.confirmMessageBox, styles.noBorder].join(' ')}>
        <div className={[styles.statusCircle, styles.failed].join(' ')}>
          <XIcon />
        </div>
        <div className={styles.rightBox}>
          <Typography className={styles.title}>Scanner Deactivated!</Typography>
          <Typography className={styles.desc}>
            The scanner for this event has not yet been activated
          </Typography>
        </div>
      </div>
    </CustomDialog>
  );
};

export default DeactivatedScannerModal;

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Typography } from '@mui/material';

import { CustomButton } from '@/components/shared';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  btnText?: string;
  title: string;
  description?: string;
};

const SuccessPrompt = ({ onClose, open, title, btnText, description }: Props) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      PaperProps={{
        className: styles.dialogPaper,
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <Image alt="delete" src="/success.svg" width={70} height={70} />
        <Typography className={styles.deleteTitle}>{title}</Typography>
        {description && (
          <Typography className={styles.description}>
            {description}
          </Typography>
        )}
        <div className={styles.btnBox}>
          <CustomButton
            type="submit"
            label={btnText || 'Continue'}
            onClick={onClose}
            className={[styles.btn, styles.save].join(' ')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPrompt;

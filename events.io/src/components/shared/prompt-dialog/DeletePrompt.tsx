import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Typography } from '@mui/material';

import { CustomButton } from '@/components/shared';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  cancelBtnText?: string;
  submitBtnText?: string;
  title: string;
  message?: string;
};

const DeletePrompt = ({
  onClose,
  onConfirm,
  open,
  isLoading,
  cancelBtnText,
  submitBtnText,
  title,
  message,
}: Props) => {
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
        <Image alt="delete" src="/confirm.svg" width={70} height={70} />
        <Typography className={styles.deleteTitle}>{title}</Typography>
        <Typography className={styles.deleteMessage}>{message}</Typography>
        <div className={styles.btnBox}>
          <CustomButton
            type="button"
            className={[styles.btn, styles.cancel].join(' ')}
            label={cancelBtnText || 'No Cancel'}
            onClick={onClose}
          />
          <CustomButton
            type="submit"
            label={submitBtnText || 'Yes Delete'}
            onClick={onConfirm}
            className={[styles.btn, styles.save].join(' ')}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePrompt;

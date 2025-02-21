import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Typography } from '@mui/material';

import { CustomButton } from '@/components/shared';
import styles from './custom-dialog.module.scss';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  title: string;
  message: string;
};

const DeleteDialog = ({
  onClose,
  onConfirm,
  open,
  isLoading,
  message,
  title,
}: Props) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
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
            type={'button'}
            className={[styles.btn, styles.cancel].join(' ')}
            label="No Cancel"
            onClick={onClose}
          />
          <CustomButton
            type={'submit'}
            label="Yes Delete"
            onClick={onConfirm}
            className={[styles.btn, styles.save].join(' ')}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;

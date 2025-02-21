import React, { PropsWithChildren, ReactNode } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Dialog,
  DialogContent,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

import styles from './custom-dialog.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'xxl' | 'xxxl' | false;
  noBorder?: boolean;
  headContent?: ReactNode;
  bgBlack?: boolean;
  sx?: SxProps<Theme> | undefined;
  noClose?: boolean;
};

const CustomDialog = ({
  onClose,
  open,
  children,
  title,
  width,
  noBorder,
  headContent,
  bgBlack,
  sx,
  noClose,
}: PropsWithChildren<Props>) => {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={width ?? 'sm'}
      sx={{
        ...sx,
      }}
      PaperProps={{
        className: [styles.dialogPaper, bgBlack && styles.blackBg].join(' '),
      }}
      classes={{
        root: styles.dialog_root,
        container: styles.dialog_container,
        paper: styles.dialog_paper,
      }}
    >
      {title ? (
        <div className={styles.dialogHeader}>
          <>
            <Typography variant="h2" className={styles.modalTitle}>
              {title}
            </Typography>
            {noClose ? null : (
              <IconButton
                aria-label="close"
                onClick={onClose}
                className={styles.closeIcon}
              >
                <ClearIcon />
              </IconButton>
            )}
          </>
        </div>
      ) : (
        headContent
      )}

      <DialogContent sx={{ p: '16px' }} dividers={!noBorder}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;

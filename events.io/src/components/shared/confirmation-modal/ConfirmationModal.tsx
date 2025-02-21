import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';

import { CustomButton } from '@/components/shared';
import InfoAlertIcon from '@/components/ui/icons/infoAlertIcon';
import styles from './confirmationModal.module.scss';

type ConfirmationProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  type?: 'info' | 'error' | 'warning';
  body?: React.ReactNode;
  buttons?: Button;
  onConfirm?: () => void;
  isLoading?: boolean;
};

interface Button {
  confirmButton?: ButtonItem;
  cancelButton?: ButtonItem;
  // renderFooterButtons?: React.ReactNode; // this will be passe as a fuction
  renderFooterButtons?: (params: RenderFooterParams) => React.ReactNode;
}

type ButtonTYpe = 'button' | 'submit' | 'reset';

interface ButtonItem {
  label?: string;
  type?: ButtonTYpe;
}

interface RenderFooterParams {
  onClose?: () => void;
  onConfirm?: () => void;
}

const defaultButtonsConfig = {
  confirmButton: {
    label: 'Yes',
    type: 'button',
  },
  cancelButton: {
    label: 'No',
    type: 'button',
  },
  renderFooterButtons: null,
};

const iconSrc = {
  info: <InfoAlertIcon />,
  error: <InfoAlertIcon />,
  warning: <InfoAlertIcon />,
};

export const ConfirmationModal: React.FC<ConfirmationProps> = (props) => {
  const {
    open,
    onClose,
    title,
    body,
    type,
    buttons = defaultButtonsConfig,
    onConfirm,
    isLoading,
  } = props;

  const {
    confirmButton: {
      label: confirmButtonText = defaultButtonsConfig.confirmButton.label,
      type: confirmButtonType = defaultButtonsConfig.confirmButton.type,
    } = defaultButtonsConfig.confirmButton, // Use default values from defaultButtonsConfig if confirmButton is not provided
    cancelButton: {
      label: cancelButtonText = defaultButtonsConfig.cancelButton.label,
      type: cancelButtonType = defaultButtonsConfig.cancelButton.type,
    } = defaultButtonsConfig.cancelButton, // Use default values from defaultButtonsConfig if cancelButton is not provided
    renderFooterButtons,
  } = buttons;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      classes={{ root: styles.dialog_root, paper: styles.dialog_paper }}
    >
      <DialogContent className={styles.dialog_content}>
        {type && <div className={styles.alert_img}>{iconSrc[type]}</div>}
        <Typography variant="h5" className={styles.alert_title}>
          {title}
        </Typography>
        <Typography variant="body1" className={styles.alert_desc}>
          {body}
        </Typography>
        <Box className={styles.alert_btns}>
          {renderFooterButtons && renderFooterButtons({ onClose, onConfirm })}
          {!renderFooterButtons && (
            <>
              <CustomButton
                label={cancelButtonText}
                onClick={onClose}
                type={cancelButtonType as ButtonTYpe}
                buttonClass="previous_btn"
              />
              <CustomButton
                label={confirmButtonText}
                onClick={onConfirm}
                type={confirmButtonType as ButtonTYpe}
                buttonClass="next_btn"
                isLoading={isLoading}
              />
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

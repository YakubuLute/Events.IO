import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useBoardContext } from '@/contexts/onBoardContext';

interface AlertDialogProps {
  message?: string;
  description?: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
}

const AlertDialog: FC<AlertDialogProps> = ({
  message,
  description,
  cancelHandler,
  confirmHandler,
}) => {
  const { alertOpen, setAlertOpen } = useBoardContext();

  return (
    <Dialog
      open={alertOpen}
      onClose={() => setAlertOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {message ? message : 'Are you sure you want to delete this item?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} variant="contained">
          Cancel
        </Button>
        <Button autoFocus onClick={confirmHandler} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;

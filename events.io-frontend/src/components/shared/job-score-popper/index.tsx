import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Popover, Typography } from '@mui/material';

import AlertIcon from '../SVG-components/AlertIcon';
import styles from './styles.module.scss';

type Props = {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
};

const JobScorePopper = ({ anchorEl, handleClose, open }: Props) => {
  return (
    <Popover
      id="mouse-over-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ mb: 1 }}
      slotProps={{
        paper: {
          className: styles.paperContainer,
        },
      }}
    >
      <AlertIcon color="#CF2A2A" />
      <div className={styles.infoBox}>
        <Typography variant="h6" component="h6" className={styles.infoTitle}>
          This job is unavailable to you.
        </Typography>
        <Typography
          className={styles.infoContent}
          variant="body2"
          component="p"
        >
          Sorry, the employer is currently not considering candidate with your
          match.
        </Typography>
      </div>
      <IconButton className={styles.closeBtn} onClick={handleClose}>
        <ClearIcon />
      </IconButton>
    </Popover>
  );
};

export default JobScorePopper;

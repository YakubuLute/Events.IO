import React from 'react';
import { Typography } from '@mui/material';

import { CustomDialog } from '@/components/shared';
import FolderUserIcon from '@/components/shared/SVG-components/FolderUserIcon';
import { TConenction } from '@/@types/candidate/candidate';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  open: boolean;
  connection: TConenction;
};

const NoteModal = ({ connection, onClose, open }: Props) => {
  return (
    <CustomDialog onClose={onClose} open={open} title="Note">
      <div className={styles.noteContainer}>
        <div className={styles.headerBox}>
          <FolderUserIcon />
          <Typography className={styles.noteTitle} noWrap>
            {connection?.venue || 'No Venue'}
          </Typography>
        </div>
        <div className={styles.noteBox}>
          <Typography className={styles.label} noWrap>
            Notes
          </Typography>
          <Typography className={styles.noteText}>
            {connection?.note || 'No Note'}
          </Typography>
        </div>
      </div>
    </CustomDialog>
  );
};

export default NoteModal;

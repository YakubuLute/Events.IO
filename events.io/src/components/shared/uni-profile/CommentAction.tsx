import React from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { DeleteIcon, EditIcon } from '@/components/shared/SVG-components';
import styles from './styles.module.scss';

type Props = {
  anchorEl: HTMLButtonElement | null;
  open: boolean;
  handleClose: () => void;
  onEditComment: () => void;
  onDeleteComment: () => void;
};

const CommentAction = ({
  anchorEl,
  open,
  handleClose,
  onDeleteComment,
  onEditComment,
}: Props) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      classes={{ paper: styles.menuWrapper }}
    >
      <MenuItem
        onClick={() => {
          onEditComment();
          handleClose();
        }}
        aria-label="Edit Comment Action"
      >
        <div className={styles.menuItem}>
          <IconButton className={styles.iconBtn} aria-label="Edit Icon">
            <EditIcon />
          </IconButton>
          <Typography className={styles.actionText}>Edit Comment</Typography>
        </div>
      </MenuItem>
      <MenuItem onClick={onDeleteComment} aria-label="Delete Comment Action">
        <div className={styles.menuItem}>
          <IconButton
            className={[styles.iconBtn, styles.delete].join(' ')}
            aria-label="Delete Icon"
          >
            <DeleteIcon />
          </IconButton>
          <Typography className={[styles.actionText, styles.delete].join(' ')}>
            Delete Comment
          </Typography>
        </div>
      </MenuItem>
    </Menu>
  );
};

export default CommentAction;

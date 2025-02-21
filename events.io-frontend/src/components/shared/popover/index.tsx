import React, { PropsWithChildren } from 'react';
import { Popover } from '@mui/material';

import styles from './style.module.scss';

type Props = {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number;
    horizontal: 'left' | 'center' | 'right' | number;
  };
};

const CustomPopover = ({
  anchorEl,
  handleClose,
  open,
  transformOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Popover
      id="mouse-over-popover"
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          className: styles.paperContainer,
          sx: {
            overflowX: 'unset',
            overflowY: 'unset',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              width: 10,
              height: 10,
              backgroundColor: 'inherit',
              boxShadow: '-3px -3px 5px -2px rgba(0,0,0,0.1)',
              transform: 'translate(-50%, 50%) rotate(135deg)',
              clipPath:
                'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
            },
          },
        },
      }}
      onClose={handleClose}
      disableRestoreFocus
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;

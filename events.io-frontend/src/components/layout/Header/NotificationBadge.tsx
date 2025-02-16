import React, { PropsWithChildren } from 'react';
import { Badge, IconButton } from '@mui/material';
import styles from './header.module.scss';

type Props = {
  dot?: boolean;
  isPendingRequests?: boolean;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
};

export const NotificationBadge = ({
  dot,
  isPendingRequests,
  onClick,
  onMouseEnter,
  children,
}: PropsWithChildren<Props>) => {
  return dot ? (
    <Badge
      variant="dot"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      classes={{
        dot: [
          styles.badgeDot,
          isPendingRequests ? styles.danger : styles.success,
        ].join(' '),
      }}
    >
      <IconButton className={styles.iconBtn}>{children}</IconButton>
    </Badge>
  ) : (
    <IconButton className={styles.iconBtn}>{children}</IconButton>
  );
};

export const NotificationText = ({
  dot,
  children,
}: PropsWithChildren<Props>) => {
  return dot ? (
    <Badge variant="dot" classes={{ dot: styles.textDot }}>
      {children}
    </Badge>
  ) : (
    <> {children}</>
  );
};

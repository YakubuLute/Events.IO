import React from 'react';
import { Stack, Typography } from '@mui/material';

import styles from '../index.module.scss';

type Props = {
  message: string;
};

const NotificationStrip = ({ message }: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={styles.closedConnectionBox}
      mb={1}
      mt={1}
    >
      <Typography className={styles.closedConnectionMessage}>
        {message}
      </Typography>
    </Stack>
  );
};

export default NotificationStrip;

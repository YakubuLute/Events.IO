import React from 'react';
import { Box, Stack } from '@mui/material';

import { CustomSkeleton } from '../../skeleton/Skeleton';
import styles from './index.module.scss';

const ChatListSkeleton = () => {
  return (
    <Box role="button" className={styles.chatItemBox} tabIndex={0}>
      <Box className={styles.avatarBox}>
        <CustomSkeleton variant="circular" height={50} width={50} />
        <Box className={styles.status}>
          <CustomSkeleton variant="rounded" height={5} width={5} />
        </Box>
      </Box>
      <Stack flex={1} gap={1}>
        <CustomSkeleton variant="rounded" height={8} width={60} />
        <CustomSkeleton variant="rounded" height={5} width={150} />
      </Stack>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <CustomSkeleton variant="rounded" height={15} width={15} />
      </Box>
    </Box>
  );
};

export default ChatListSkeleton;

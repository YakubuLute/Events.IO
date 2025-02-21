import React from 'react';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import styles from '@/app/university/dashboard/dashboard.module.scss';
import VStack from '../stacks/VStack';

export default function StatisticItem({ item, itemStyles, title, value }) {
  return (
    <Box className={styles.totalStatContainer} sx={itemStyles}>
      <VStack className={styles.totalStatLeftContainer}>
        <Typography className={styles.totalStatTitle}>{title}</Typography>
        <Typography className={styles.totalStatNumber}>
          {item?.total}
        </Typography>
      </VStack>
      <Box position={'relative'}>
        <CircularProgress
          variant="determinate"
          thickness={4}
          className={[styles.totalStatProgressForeground, styles[value]].join(
            ' '
          )}
          value={item?.percent}
          size={'56px'}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          className={[styles.totalStatProgressBackground, styles[value]].join(
            ' '
          )}
          thickness={4}
          size={'56px'}
        />
        <Box className={styles.totalStatProgressTextContainer}>
          <Typography
            className={[styles.totalStatProgressText, styles[value]].join(' ')}
          >{`${item?.percent ?? 0}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

StatisticItem.Skeleton = function StatisticItemSkeleton() {
  return (
    <Stack
      direction={'row'}
      //   justifyContent={'space-between'}
      alignItems={'center'}
      gap={3}
    >
      <Box>
        <Skeleton width={100} height={20} variant="text" />
        <Skeleton width={100} height={20} variant="text" />
      </Box>
      <Skeleton width={80} height={80} variant="circular" />
    </Stack>
  );
};

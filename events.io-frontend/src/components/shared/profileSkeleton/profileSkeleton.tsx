import React from 'react';
import { Container, Skeleton, Stack } from '@mui/material';

export default function ProfileSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ paddingInlineStart: '3rem' }}>
      <Stack gap={3}>
        <Skeleton variant="text" width={200} height={40} />

        <Skeleton
          animation={'pulse'}
          variant="rectangular"
          width="20%"
          height={150}
        />
        <Stack direction={'row'} gap={3}>
          <Skeleton variant="rectangular" width="30%" height={30} />
          <Skeleton variant="rectangular" width="35%" height={30} />
        </Stack>
        <Skeleton variant="rectangular" width="70%" height={30} />
        <Skeleton variant="rectangular" width="70%" height={30} />
        <Skeleton variant="rectangular" width="70%" height={30} />
        <Skeleton variant="rectangular" width="70%" height={30} />
      </Stack>
    </Container>
  );
}

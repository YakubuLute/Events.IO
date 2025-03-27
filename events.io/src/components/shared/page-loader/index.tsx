import React from 'react';
import { Box, Typography } from '@mui/material';

import AppleSpinner from '../SVG-components/AppleSpinner';

const PageLoader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ height: '100vh', width: '100%' }}
      alignItems="center"
      flexDirection="column"
      gap={2}
    >
      <AppleSpinner width={70} height={70} color="#0C27BE" />
      <Typography fontSize={12} fontWeight={700}>
        Loading. Please wait...
      </Typography>
    </Box>
  );
};

export default PageLoader;

'use client';

import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

interface Props extends LinearProgressProps {
  // value?: number | undefined;
  // valueBuffer?: number | undefined;
}

const LinearProgressBar: React.FC<Props> = ({
  variant = "determinate",
  ...props
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressStyled
        variant={variant}
        {...props}
        sx={{
          color: '#000',
          height: '5px',
          borderRadius: '4px',
          ...props.sx,
        }}
      />
    </Box>
  );
};

const LinearProgressStyled = styled(LinearProgress)`
  background: rgb(191, 191, 194);
  & .MuiLinearProgress-bar {
    background: #0b2fb6;
  }
`;

export default LinearProgressBar;

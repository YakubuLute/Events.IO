import React, { MouseEventHandler, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

type ContainerProps = {
  children: ReactNode;
  sx?: SxProps;
  visible?: boolean;
  onClose?: MouseEventHandler<HTMLElement>;
};

const ChatModal = ({ children, onClose, sx, visible }: ContainerProps) => {
  return (
    <>
      {visible && (
        <Box
          position={'absolute'}
          top={0}
          left={0}
          width={'100%'}
          padding={1}
          height={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          sx={
            sx
              ? { background: '#0000004D', ...sx }
              : { background: '#0000004D' }
          }
          onClick={(e) => {
            onClose && onClose(e);
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default ChatModal;

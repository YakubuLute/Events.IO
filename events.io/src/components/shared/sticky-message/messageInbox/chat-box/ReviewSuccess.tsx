import React from 'react';
import { Box, Typography } from '@mui/material';

import SuccessAlertIcon from '@/components/ui/icons/successAlertIcon';
import ChatModal from './ChatModal';

type Props = {
  showSuccessModal: boolean;
  onCloseSuccessModal: () => void;
};

const ReviewSuccess = ({ showSuccessModal, onCloseSuccessModal }: Props) => {
  return (
    <ChatModal visible={showSuccessModal} onClose={onCloseSuccessModal}>
      <Box
        borderRadius={3}
        width={225}
        maxWidth={'100%'}
        sx={{ background: 'white' }}
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        px={5}
        py={5}
      >
        <SuccessAlertIcon />
        <Typography fontSize={14} sx={{ textAlign: 'center' }} mt={3}>
          Thank you for your feedback
        </Typography>
      </Box>
    </ChatModal>
  );
};

export default ReviewSuccess;

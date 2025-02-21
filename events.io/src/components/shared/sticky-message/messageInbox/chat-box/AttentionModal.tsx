import React from 'react';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import ChatModal from './ChatModal';

type TStep = 'start' | 'message' | 'decline' | 'submit';

type Props = {
  showAttentionModal: boolean;
  setShowAttentionModal: (value: boolean) => void;
  setStep: (value: TStep) => void;
};

const AttentionModal = ({
  showAttentionModal,
  setShowAttentionModal,
  setStep,
}: Props) => {
  return (
    <ChatModal visible={showAttentionModal}>
      <Box
        width={336}
        maxWidth={'100%'}
        borderRadius={4}
        sx={{ background: 'white' }}
      >
        <Stack direction={'row'} padding={2}>
          <Typography fontSize={18} fontWeight={600} flex={1}>
            Attention
          </Typography>
          <IconButton onClick={() => setShowAttentionModal(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Box padding={2} px={4}>
          <Typography color={'#110C22'}>
            Ending this chat session will result in the removal of your current
            connection. To reconnect with this person in the future, you will be
            required to pay the contact fee once again.
          </Typography>
        </Box>
        <Stack direction={'row'} gap={1} p={2}>
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            color={'error'}
            onClick={() => {
              setShowAttentionModal(false);
              setStep('submit');
            }}
          >
            Continue
          </Button>
          <Button
            sx={{ flex: 1 }}
            variant="outlined"
            color={'error'}
            onClick={() => {
              setShowAttentionModal(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </ChatModal>
  );
};

export default AttentionModal;

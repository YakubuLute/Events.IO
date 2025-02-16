import React, { MouseEventHandler } from 'react';
import {
  Close,
  CloseFullscreenRounded,
  OpenInFullOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';

import { ChatCloseIcon } from '@/components/ui/icons';
import { TConversation } from '@/@types/shared/chat';
import { UserTypes } from '@/@types/shared/type';
import { getCurrentUser } from '@/utils';
import styles from '../index.module.scss';

type Props = {
  data: TConversation;
  isTyping: boolean;
  setShowAttentionModal: (value: boolean) => void;
  setExpanded: (value: boolean) => void;
  expanded: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  activeStatus: string;
};

const ChatTopBar = ({
  data,
  isTyping,
  setShowAttentionModal,
  setExpanded,
  expanded,
  onClose,
  activeStatus,
}: Props) => {
  const user = getCurrentUser();

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{ background: 'white', py: 2, px: 3, borderRadius: 3, gap: 1 }}
    >
      <Box className={styles.chatProfileBox}>
        <Avatar
          src={
            data?.recipientProfilePhoto ||
            '/assets/images/user-default-image.png'
          }
          className={styles.chatProfileMainAvatar}
        />
        {data?.recipientOrganizationId ? (
          <Avatar
            src={
              data?.recipientOrganizationLogo ||
              '/assets/images/user-default-image.png'
            }
            alt="UserImage"
            className={styles.chatProfileMiniAvatar}
          />
        ) : null}
        <Box className={[styles.status, styles[activeStatus]].join(' ')} />
      </Box>
      <Box flex={1} display={'flex'} flexDirection={'column'}>
        <Typography fontSize={14} fontWeight={600} color={'black'}>
          {data?.recipientName}
        </Typography>
        {isTyping ? (
          <p className="text-[10px] text-slate-600">typing...</p>
        ) : (
          <p className="text-[10px] text-slate-600 capitalize">
            {activeStatus}
          </p>
        )}
      </Box>

      <Box display={'flex'} gap={1} alignItems={'center'}>
        {(data?._id && data?.isConnected === false) ||
        user?.userType !== UserTypes.CANDIDATE ? null : (
          <IconButton
            sx={{
              background: '#F8F8F8',
              height: 28,
              width: 28,
              '&:hover': { background: 'lightgrey' },
            }}
            onClick={() => setShowAttentionModal(true)}
          >
            <ChatCloseIcon />
          </IconButton>
        )}

        <IconButton
          sx={{
            background: '#F8F8F8',
            height: 28,
            width: 28,
            '&:hover': { background: 'lightgrey' },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <CloseFullscreenRounded sx={{ fontSize: 16 }} />
          ) : (
            <OpenInFullOutlined sx={{ fontSize: 16 }} />
          )}
        </IconButton>
        <IconButton
          sx={{
            background: '#F8F8F8',
            height: 28,
            width: 28,
            '&:hover': { background: 'lightgrey' },
          }}
          onClick={onClose}
        >
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

export default ChatTopBar;

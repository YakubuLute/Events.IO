import { MouseEventHandler } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import { TConversation } from '@/@types/shared/chat';
import styles from './index.module.scss';

export type TChatUserData = {
  image: string;
  name: string;
  lastMessage: string;
  status: 'active' | 'away' | 'inactive' | 'do-not-disturb';
  amount: number;
  lastTime: string;
};
export interface ChatListItemProps {
  data: TConversation;
  onClick: MouseEventHandler<HTMLElement>;
}
const ChatListItem = ({ data, onClick }: ChatListItemProps) => {
  return (
    <Box
      onClick={onClick}
      role="button"
      className={styles.chatItemBox}
      tabIndex={0}
    >
      <Box className={styles.avatarBox}>
        <Avatar
          src={
            data?.recipientProfilePhoto ||
            '/assets/images/user-default-image.png'
          }
          alt="UserImage"
          className={styles.mainAvatar}
        />
        {data?.recipientOrganizationId ? (
          <Avatar
            src={
              data.recipientOrganizationLogo ||
              '/assets/images/user-default-image.png'
            }
            alt="UserImage"
            className={styles.miniAvatar}
          />
        ) : null}
        <Box
          className={[styles.status, styles[data?.activeStatus]].join(' ')}
        />
      </Box>
      <Box flex={1}>
        <Typography fontSize={14} fontWeight={500}>
          {data?.recipientName}
        </Typography>
        <Typography
          fontSize={12}
          color={'#8D8A95'}
          className={styles['ellipsis-2']}
        >
          {data?.lastMessage}
        </Typography>
      </Box>
      {data?.totalUnreadMessages > 0 ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box className={styles.unreadMessageBalloon}>
            {data?.totalUnreadMessages}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ChatListItem;

'use client';

import { Box } from '@mui/material';

import { TConversation } from '@/@types/shared/chat';
import { TConnectionRequest } from '@/@types/shared/connection-request';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import MessageInbox from './messageInbox';
import ChatBox from './messageInbox/chat-box';
import RequestChatBox from './messageInbox/request-chat-box';
import styles from './stick-message.module.scss';

const StickyMessageContainer = () => {
  const { activeChatBoxes, handleCloseChat } = useChatStickyMessageStore();

  return (
    <Box className={styles.containerBox}>
      <Box className={styles.chatHeader}>
        <MessageInbox />
        {activeChatBoxes.map((data, idx) => {
          return data.type === 'chat' ? (
            <ChatBox
              data={data?.data as TConversation}
              onClose={() => handleCloseChat(data)}
              key={idx}
              chatId={data?.chatId}
            />
          ) : (
            <RequestChatBox
              data={data?.data as TConnectionRequest}
              onClose={() => handleCloseChat(data)}
              key={idx}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default StickyMessageContainer;

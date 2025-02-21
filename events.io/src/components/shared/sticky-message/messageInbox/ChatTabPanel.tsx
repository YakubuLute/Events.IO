import { useCallback, useEffect, useRef, useState } from 'react';

import useScreenView from '@/utils/useScreenView';
import { socket } from '@/services/socket.service';
// import { useSocketContext } from '@/contexts/SocketContext';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import ChatsEmptyState from '../../messages/MessagesEmptyState';
// import { chatList } from '../mock-data';
import ChatListItem from './ChatListItem';
import ChatListSkeleton from './ChatListSkeleton';

const ChatTabPanel = () => {
  const {
    handleOpenChat,
    setConversations,
    conversations,
    updateConversations,
  } = useChatStickyMessageStore();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isReachedBottom = useScreenView(bottomRef);
  const [loading, setLoading] = useState(false);

  const getConnectionRequests = async () => {
    try {
      setLoading(true);
      const response = await socket.emitWithAck('messages:chats', {
        page: currentPage,
        itemsPerPage: 10,
      });
      const { totalPages, items, currentPage: cp } = response.data;
      setTotalPages(totalPages);
      setConversations(items);
      if (cp < totalPages) {
        setHasNextPage(true);
        setCurrentPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error('FETCH CHATS ERROR: ', e);
    }
  };

  const fetchNextPage = useCallback(async () => {
    try {
      setLoading(true);
      setHasNextPage(false);
      const response = await socket.emitWithAck('messages:chats', {
        page: currentPage,
        itemsPerPage: 10,
      });
      setConversations([...conversations, ...response.data.items]);
      if (response?.data.currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        setHasNextPage(true);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error('FETCH CHATS ERROR: ', e);
    }
  }, [conversations, currentPage, setConversations, totalPages]);

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage, isReachedBottom]);

  useEffect(() => {
    getConnectionRequests();
    socket.on('messages:chat', (data) => {
      if (data) {
        updateConversations(JSON.parse(data));
      }
    });
    return () => {
      socket.off('messages:chats');
      socket.off('messages:chat');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={bottomRef}>
      {loading ? (
        Array.from({ length: 8 })
          .fill('')
          .map((_, idx) => <ChatListSkeleton key={idx} />)
      ) : conversations && conversations.length ? (
        conversations.map((chatListdata) => (
          <ChatListItem
            data={chatListdata}
            key={chatListdata._id}
            onClick={() =>
              handleOpenChat('chat', chatListdata._id, chatListdata)
            }
          />
        ))
      ) : (
        <ChatsEmptyState />
      )}
    </div>
  );
};

export default ChatTabPanel;

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Scroll from 'react-scroll';
import Lightbox from 'yet-another-react-lightbox';

import { socket } from '@/services/socket.service';
import { MessageContext } from '@/contexts/messageContext';
import { Attachment, IMessage } from '@/@types/shared/chat';
import { sortMessagesByDate } from '@/utils';
import NotificationStrip from '../sticky-message/messageInbox/chat-box/NotificationStrip';
import AddChatReview from './AddChatReview';
import ChatForm from './ChatForm';
import ChatNotice from './ChatNotice';
import EmptyMessages from './EmptyMessages';
import ReviewChatSuccess from './ReviewChatSuccess';
import SingleMessageThread from './SingleMessageThread';
import styles from './styles.module.scss';

const scroll = Scroll.animateScroll;

type TSlide = {
  src: string;
};

const MessageArea = () => {
  const {
    selectedChat,
    setMessages,
    messages,
    showAttentionModal,
    step,
    showSuccessModal,
    loadingMgs,
    messageTotalPages,
    setItemsPerPage,
    itemsPerPage,
  } = useContext(MessageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [slides, setSlides] = useState<TSlide[]>([]);

  const scrollToBottom = (duration = 400) => {
    scroll.scrollToBottom({
      duration: duration,
      delay: 0,
      smooth: true,
      containerId: `chat${selectedChat?._id}`,
      offset: 0,
    });
  };

  const fetchNextPage = useCallback(async () => {
    if (currentPage === messageTotalPages) return;
    const response = await socket.emitWithAck('messages', {
      page: 1,
      itemsPerPage,
      connectionId: selectedChat?._id as string,
    });
    let olderMessages = response.data.items;
    olderMessages = sortMessagesByDate(olderMessages);
    if (olderMessages.length > 0) {
      setMessages(olderMessages);
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, messageTotalPages, itemsPerPage, selectedChat, setMessages]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop === 0 &&
      currentPage <= messageTotalPages
    ) {
      setItemsPerPage(itemsPerPage + 10);
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    socket.on('messages:new', async (newMessage: IMessage) => {
      setMessages([...messages, newMessage]);
      const payload = {
        connectionId: selectedChat?._id,
        messageId: newMessage.messageId,
      };
      await socket.emitWithAck('messages:read', payload);
      await socket.emitWithAck('messages:delivered', payload);
      scrollToBottom();
    });

    socket.on('messages:read', (info) => {
      const messageIndex = messages.findIndex(
        (item) => item.messageId === info.messageId
      );
      if (messageIndex < 0) return;
      const newArray = [...messages];
      newArray[messageIndex].receipt = 'read';
      setMessages(newArray);
    });

    socket.on('messages:read:bulk', (info) => {
      const newMessages = info.messageIds;
      const updatedMessages = [...messages];
      newMessages.forEach((element: any) => {
        const itemIndex = updatedMessages.findIndex(
          (item) => element === item.messageId
        );
        if (itemIndex >= 0) {
          updatedMessages[itemIndex].receipt = 'read';
        }
      });
      setMessages(updatedMessages);
    });

    return () => {
      socket.off('messages:new');
      socket.off('messages:read');
      socket.off('messages:read:bulk');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const performChecks = () => {
    if (selectedChat?.isDeletedUser) {
      return <NotificationStrip message="This user is no longer on vaurse" />;
    } else if (
      selectedChat?._id &&
      !selectedChat?.isConnected &&
      !selectedChat?.isDeletedUser
    ) {
      return (
        <NotificationStrip message="You have closed connection for this user" />
      );
    }
    return null;
  };

  const onBuildAttachments = (data: Attachment) => {
    const filteredMessaages = messages?.filter(
      (msg) => msg.type === 'attachment'
    );
    const attachments: TSlide[] = filteredMessaages?.map((msg) => {
      return {
        src: msg?.attachment?.url,
      };
    });
    const filteredAttachments = attachments.filter((a) => a?.src !== data?.url);
    filteredAttachments.unshift({ src: data?.url });
    setSlides(filteredAttachments);
    setOpenLightBox(true);
  };

  return (
    <div className={styles.messageAreaWrapper}>
      <div
        className={styles.messageBox}
        ref={containerRef}
        onScroll={handleScroll}
        id={`chat${selectedChat?._id}`}
      >
        {step === 'submit' ? (
          <AddChatReview />
        ) : (
          <>
            {loadingMgs ? (
              <NotificationStrip message="Loading messages . . ." />
            ) : messages && messages.length > 0 ? (
              messages.map((message) => (
                <SingleMessageThread
                  key={message.messageId}
                  message={message}
                  onClick={onBuildAttachments}
                />
              ))
            ) : (
              <EmptyMessages />
            )}
            {performChecks()}
          </>
        )}
      </div>
      {step !== 'submit' ? <ChatForm /> : null}
      {showAttentionModal ? <ChatNotice /> : null}
      {showSuccessModal ? <ReviewChatSuccess /> : null}
      {openLightBox ? (
        <Lightbox
          open={openLightBox}
          close={() => setOpenLightBox(false)}
          slides={slides}
        />
      ) : null}
    </div>
  );
};

export default MessageArea;

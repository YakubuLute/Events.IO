import { useCallback, useEffect, useRef, useState } from 'react';

import useScreenView from '@/utils/useScreenView';
import { socket } from '@/services/socket.service';
import { useSocketContext } from '@/contexts/SocketContext';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import EmptyRequests from './EmptyRequest';
// import { requestsData } from '../mock-data';
import RequestItem from './RequestItem';

const RequestsTabPanel = () => {
  const { handleOpenChat } = useChatStickyMessageStore();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isReachedBottom = useScreenView(bottomRef);
  const { connectionRequests, setConnectionRequests } = useSocketContext();

  const getConnectionRequests = async () => {
    const response = await socket.emitWithAck('connections', {
      page: currentPage,
      itemsPerPage: 10,
    });
    const { totalPages, items, currentPage: cp } = response.data;
    setTotalPages(totalPages);
    setConnectionRequests(items);
    if (cp < totalPages) {
      setHasNextPage(true);
    }
  };

  const fetchNextPage = useCallback(async () => {
    setHasNextPage(false);
    const response = await socket.emitWithAck('connections', {
      page: currentPage,
      itemsPerPage: 10,
    });
    setConnectionRequests([...connectionRequests, ...response.data.items]);
    if (response?.data.currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setHasNextPage(true);
    }
  }, [connectionRequests, currentPage, setConnectionRequests, totalPages]);

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isReachedBottom]);

  useEffect(() => {
    getConnectionRequests();

    socket.on('connections:new', (data) => {
      if (data) {
        setConnectionRequests([...connectionRequests, JSON.parse(data)]);
      }
    });

    return () => {
      socket.off('connections');
      socket.off('connections:new');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={bottomRef}>
      {connectionRequests.map((requestData, index) => (
        <RequestItem
          data={requestData}
          key={index}
          onClick={() => {
            if (requestData.status === 'accepted') {
              handleOpenChat('chat', requestData._id, requestData);
              return;
            }
            handleOpenChat('request', requestData._id, requestData);
          }}
        />
      ))}
      {connectionRequests.length === 0 && <EmptyRequests />}
    </div>
  );
};

export default RequestsTabPanel;

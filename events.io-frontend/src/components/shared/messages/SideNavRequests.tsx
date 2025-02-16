import React, { useCallback, useEffect, useRef, useState } from 'react';

import useScreenView from '@/utils/useScreenView';
import { socket } from '@/services/socket.service';
import { useSocketContext } from '@/contexts/SocketContext';
import EmptyRequests from './EmptyRequests';
import styles from './styles.module.scss';
import UserWrapperRequests from './UserWrapperRequests';
import UserWrapperRequestsSkeleton from './UserWrapperRequestsSkeleton';

const ITEMS_PER_PAGE = 10;

const SideNavRequests = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isReachedBottom = useScreenView(bottomRef);
  const { connectionRequests, setConnectionRequests } = useSocketContext();
  const [loadingRequests, setLoadingRequests] = useState(false);

  const getConnectionRequests = async () => {
    try {
      setLoadingRequests(true);
      const response = await socket.emitWithAck('connections', {
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
      });
      const { totalPages, items, currentPage: cp } = response.data;
      setTotalPages(totalPages);
      setConnectionRequests(items);
      if (cp < totalPages) {
        setHasNextPage(true);
        setCurrentPage((prev) => prev + 1);
      }
      setLoadingRequests(false);
    } catch (e) {
      setLoadingRequests(false);
    }
  };

  const fetchNextPage = useCallback(async () => {
    try {
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
    } catch (e) {}
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
    <div className={styles.sideNavWrapper} ref={bottomRef}>
      {loadingRequests ? (
        <UserWrapperRequestsSkeleton />
      ) : connectionRequests && connectionRequests.length ? (
        connectionRequests.map((request, idx) => (
          <UserWrapperRequests
            request={request}
            key={request._id}
            noBorder={idx === 0}
          />
        ))
      ) : (
        <EmptyRequests />
      )}
    </div>
  );
};

export default SideNavRequests;

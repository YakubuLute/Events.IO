import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge, Grid } from '@mui/material';

import { socket } from '@/services/socket.service';
import { useHeaderContext } from '@/contexts/headerContext';
import { MessageContext } from '@/contexts/messageContext';
import { TConversation } from '@/@types/shared/chat';
import { sortMessagesByDate } from '@/utils';
import TabsNav from '../tabs-nav/TabsNav';
import MessageArea from './MessageArea';
import RequestArea from './RequestArea';
import Sidenav from './Sidenav';
import SideNavRequests from './SideNavRequests';
import styles from './styles.module.scss';
import TopSearchBar from './TopSearchBar';
import TopUserBar from './TopUserBar';
import TopUserRequestBar from './TopUserRequestBar';
import UserDetails from './UserDetails';
import UserRequestDetails from './UserRequestDetails';

enum MessageType {
  CHATS = 'chats',
  REQUESTS = 'requests',
}

const MessagesContainer = () => {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab') as MessageType;
  const {
    selectedChat,
    infoTabOpen,
    selectedRequest,
    setLoadingMgs,
    setSelectedChat,
    setMessageTotalPages,
    setMessages,
    itemsPerPage,
    setItemsPerPage,
  } = useContext(MessageContext);
  const { screenSize } = useHeaderContext();
  const isLargeScreen = screenSize === 'desktop';
  const [tab, setTab] = useState<`${MessageType}`>('chats');
  const [totalUnread, setTotalUnread] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  const handleTabsChange = (_: SyntheticEvent<Element, Event>, tab: string) => {
    setTab(tab as `${MessageType}`);
    window.history.pushState({}, '', `?tab=${tab}`);
  };

  const onChangeTab = (tab: string) => {
    setTab(tab as `${MessageType}`);
    window.history.pushState({}, '', `?tab=${tab}`);
  };

  useEffect(() => {
    if (tabQuery) {
      setTab(tabQuery);
    }
  }, [tabQuery]);

  useEffect(() => {
    socket.on('messages:unread:count', (data) => {
      if (data) {
        const newData = JSON.parse(data);
        if (newData) {
          setTotalUnread(newData?.totalUnread);
          setPendingRequests(newData?.pendingRequests);
        }
      }
    });
    return () => {
      socket.off('messages:unread:count');
    };
  }, []);

  const onFetchMessages = async (chat: TConversation) => {
    setItemsPerPage(10);
    if (chat?._id === selectedChat?._id) return;
    setLoadingMgs(true);
    setMessages([]);
    setSelectedChat(chat);
    const payload = {
      page: 1,
      itemsPerPage,
      connectionId: chat?._id as string,
    };
    try {
      await socket.emitWithAck('messages:start', payload);
      const response = await socket.emitWithAck('messages', payload);
      const { totalPages, items } = response.data;
      setMessages(sortMessagesByDate(items));
      setLoadingMgs(false);
      setMessageTotalPages(totalPages);
    } catch (e) {
      setLoadingMgs(false);
    }
  };

  return (
    <div className={styles.messagesContainer}>
      <Grid container className={styles.gridContainer}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={3}
          className={[
            styles.leftContainer,
            (selectedChat || selectedRequest) && !isLargeScreen
              ? styles.noShow
              : null,
          ].join(' ')}
        >
          <TopSearchBar />
          <TabsNav
            value={tab}
            onChange={handleTabsChange}
            padding="12px 0px"
            variant="scrollable"
            options={[
              {
                label: (
                  <div className={styles.balloonBox}>
                    <span>Chats</span>{' '}
                    <Badge color="secondary" badgeContent={totalUnread} />
                  </div>
                ),
                value: MessageType.CHATS,
                component: <Sidenav onFetchMessages={onFetchMessages} />,
              },
              {
                label: (
                  <div className={styles.balloonBox}>
                    <span>Requests</span>{' '}
                    <Badge color="secondary" badgeContent={pendingRequests} />
                  </div>
                ),
                value: MessageType.REQUESTS,
                component: <SideNavRequests />,
              },
            ]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={isLargeScreen && infoTabOpen ? 6 : 9}
          className={[
            styles.rightContainer,
            !isLargeScreen && (selectedChat || selectedRequest)
              ? styles.show
              : null,
          ].join('')}
        >
          {selectedChat && tab === MessageType.CHATS ? <TopUserBar /> : null}
          {selectedRequest && tab === MessageType.REQUESTS ? (
            <TopUserRequestBar />
          ) : null}

          {selectedChat && tab === MessageType.CHATS ? <MessageArea /> : null}
          {selectedRequest && tab === MessageType.REQUESTS ? (
            <RequestArea onChangeTab={onChangeTab} />
          ) : null}
        </Grid>
        {isLargeScreen && infoTabOpen ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={3}
            className={styles.hiddenContainer}
          >
            <div className={styles.infoTabWrapper}>
              {selectedChat && tab === MessageType.CHATS ? (
                <UserDetails />
              ) : null}
              {selectedRequest && tab === MessageType.REQUESTS ? (
                <UserRequestDetails />
              ) : null}
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default MessagesContainer;

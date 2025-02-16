'use client'

import { useEffect, useMemo, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  Divider,
  IconButton,
  OutlinedInput,
  Paper,
  Tab,
  Typography
} from '@mui/material'

import useDebounce from '@/utils/useDebounce'
import { socket } from '@/services/socket.service'
import { useAuthCandidateContext } from '@/contexts/authCandidateContext'
import { useSocketContext } from '@/contexts/SocketContext'
import { useUser } from '@/contexts/userContext'
import { UserChatStatus } from '@/@types/shared/type'
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore'
import { isSocialProfileLink } from '@/utils'
import ChatTabPanel from './ChatTabPanel'
import styles from './index.module.scss'
import RequestsTabPanel from './RequestsTabPanel'

type TTab = 'chat' | 'requests'

const MessageInbox = () => {
  const { user } = useAuthCandidateContext()
  const { openChatWidget, setOpenChatWidget, setConnectionRequests } =
    useSocketContext()
  const [activeTab, setActiveTab] = useState<TTab>('chat')
  const [searchTerm, setSearchTerm] = useState('')
  const { setConversations } = useChatStickyMessageStore()
  const debounceQuery = useDebounce(searchTerm, 1000)
  const [totalUnread, setTotalUnread] = useState(0)
  const [activeStatus, setActiveStatus] = useState<UserChatStatus>('inactive')
  const [pendingRequests, setPendingRequests] = useState(0)
  //   timestamp
  const timeStamp = useMemo(() => `?&timestamp=${Date.now()}`, [])

  const { currentUserProfilePicture } = useUser()

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const searchChats = async () => {
    const response = await socket.emitWithAck('messages:chats', {
      page: 1,
      itemsPerPage: 10,
      search: debounceQuery
    })
    setConversations([...response.data.items])
  }

  const searchConnectionRequests = async () => {
    const response = await socket.emitWithAck('connections', {
      page: 1,
      itemsPerPage: 10,
      search: debounceQuery
    })
    setConnectionRequests([...response.data.items])
  }

  useEffect(() => {
    socket.on('messages:unread:count', data => {
      if (data) {
        const newData = JSON.parse(data)
        if (newData) {
          setTotalUnread(newData?.totalUnread)
          setActiveStatus(newData?.activeStatus)
          setPendingRequests(newData?.pendingRequests)
        }
      }
    })
    return () => {
      socket.off('messages:unread:count')
    }
  }, [])

  // console.log('STATUS: ', activeStatus);

  useEffect(() => {
    if (activeTab === 'chat' && searchTerm) {
      searchChats()
    } else {
      searchConnectionRequests()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceQuery])

  return (
    <Paper className={styles.chatPaperBox}>
      <Box
        className={
          totalUnread > 0
            ? styles.chatHeadBoxUnread
            : pendingRequests > 0
            ? styles.requestHeadBoxUnread
            : styles.chatHeadBoxRead
        }
      >
        <Box position={'relative'} width={32} height={32}>
          <Avatar
            src={
              currentUserProfilePicture ||
              (user?.profilePhoto
                ? !isSocialProfileLink(user?.profilePhoto)
                  ? user?.profilePhoto + timeStamp
                  : user?.profilePhoto
                : '/assets/images/user-default-image.png')
            }
            sx={{ width: 32, height: 32 }}
          />
          <Box className={[styles.status, styles[activeStatus]].join(' ')} />
        </Box>
        <Box flex={1} gap={1} display={'flex'} alignItems={'center'}>
          <Typography
            fontSize={14}
            fontWeight={600}
            color={totalUnread > 0 || pendingRequests > 0 ? 'white' : 'black'}
          >
            Messaging
          </Typography>
          {!openChatWidget && totalUnread > 0 && (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              width={17}
              height={17}
              borderRadius={10}
              sx={{ background: '#F03D3D', color: 'white', fontSize: 10 }}
            >
              {totalUnread}
            </Box>
          )}
        </Box>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <IconButton
            sx={{
              backgroundColor: totalUnread === 0 ? '#F8F8F8' : '#FFFFFF',
              height: 24,
              width: 24,
              p: 0.8,
              '&:hover': { background: 'lightgrey' }
            }}
            onClick={() => {
              setOpenChatWidget(!openChatWidget)
            }}
          >
            {openChatWidget ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </Box>
      </Box>
      <Collapse
        className={openChatWidget ? styles.collapseBox : ''}
        in={openChatWidget}
        timeout={'auto'}
        unmountOnExit
      >
        <Divider sx={{ mt: 1 }} />

        <Box
          sx={{
            background: 'white',
            p: 1
          }}
        >
          <OutlinedInput
            onChange={handleSearch}
            startAdornment={<Search sx={{ fontSize: 18 }} />}
            placeholder={'Search'}
            sx={{ fontSize: 13, fontWeight: 600, borderRadius: 2, height: 32 }}
            size='small'
            fullWidth
            value={searchTerm}
          />

          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_, newTab) => setActiveTab(newTab)}>
                <Tab
                  label={
                    <Typography className={styles.tab_title}>Chat</Typography>
                  }
                  value='chat'
                />
                <Tab
                  label={
                    <Box className={styles.tab_box}>
                      <Typography className={styles.tab_title}>
                        Requests
                      </Typography>
                      {pendingRequests > 0 ? (
                        <Badge
                          color='secondary'
                          badgeContent={pendingRequests}
                        />
                      ) : null}
                    </Box>
                  }
                  value='requests'
                />
              </TabList>
            </Box>
          </TabContext>
          <Box height={'100%'} overflow={'auto'} maxHeight={'85vh'}>
            {activeTab === 'chat' && <ChatTabPanel />}
            {activeTab === 'requests' && <RequestsTabPanel />}
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default MessageInbox

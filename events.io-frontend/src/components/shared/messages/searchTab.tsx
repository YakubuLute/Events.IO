import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Stack } from '@mui/system'
import { useDebounce } from 'usehooks-ts'

// import decodeJwt from '@/utils/jwtDecode';
import useScreenView from '@/utils/useScreenView'
import { socket } from '@/services/socket.service'
// import { useAuthCandidateContext } from '@/contexts/authCandidateContext';
import { MessageContext /*, Person*/ } from '@/contexts/messageContext'
import { TConversation } from '@/@types/shared/chat'
// import { TUser } from '@/@types/shared/type';
import styles from '@/styles/messages.module.scss'
import { formatIsoDate, truncateString } from '@/utils'

// import Scroll  from 'react-scroll'

// const scroll = Scroll.animateScroll;
// type TColors = {
//   [key: string]: string;
// };

const ITEMS_PER_PAGE = 10

type Props = {
  onSetChats: (value: TConversation[]) => void
}

const SearchTab = ({ onSetChats }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { setSelectedChat, setIsExtendTab, isExtendTab, selectedChat } =
    useContext(MessageContext)
  const [chats, setChats] = useState<TConversation[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  // const { user } = useAuthCandidateContext();
  const isReachedBottom = useScreenView(bottomRef)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debounceQuery = useDebounce(searchTerm, 1000)

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const searchChats = async () => {
    const response = await socket.emitWithAck('messages:chats', {
      page: 1,
      itemsPerPage: 10,
      search: debounceQuery
    })
    setChats([...response.data.items])
    onSetChats(response?.data?.items)
  }

  useEffect(() => {
    searchChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceQuery])

  const fetchChats = async () => {
    const response = await socket.emitWithAck('messages:chats', {
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE
    })
    const { totalPages, items, currentPage: cp } = response.data
    setTotalPages(totalPages)
    setChats(items)
    setSelectedChat(items[0])
    if (cp < totalPages) {
      setHasNextPage(true)
    }
  }

  const fetchChatsNextPage = useCallback(async () => {
    const response = await socket.emitWithAck('messages:chats', {
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE
    })
    setChats([...chats, ...response.data.items])
    if (response?.data.currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }, [chats, currentPage, totalPages])

  useEffect(() => {
    fetchChats()
    return () => {
      socket.removeAllListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchChatsNextPage()
    }
  }, [fetchChatsNextPage, hasNextPage, isReachedBottom])

  // const activeUser = decodeJwt(String(user?.access_token)) as TUser;
  const isMobile = useMediaQuery('(max-width:800px)')

  const handleOpenMessage = (chat: TConversation) => {
    setSelectedChat(chat)
    if (isMobile) {
      setIsExtendTab(!isExtendTab)
    }
  }

  return (
    <Box
      className={`${styles.searchContainer} ${isExtendTab && styles.shrink} `}
    >
      <TextField
        onChange={handleSearch}
        placeholder='Search'
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            fontSize: '14px',
            color: '#071754'
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: '14px',
            color: '#071754'
          }
        }}
        className={styles.searchFieldContainer}
        variant='standard'
      />
      <Box
        ref={bottomRef}
        overflow={'auto'}
        className={` ${styles.searchListContainer}`}
      >
        {chats?.map((item, index: number) => {
          if (item.recipientId && item.recipientOrganizationId === null) {
            return (
              <Box
                className={`${styles.searchListItem}
                ${
                  selectedChat?.recipientId === item.recipientId &&
                  styles.active
                }`}
                key={index}
                onClick={() => handleOpenMessage(item)}
              >
                <Box className={styles.searchListItemLeft}>
                  <div>
                    <Box
                      className={[
                        styles.searchListItemStatus,
                        styles.status,
                        styles[item.activeStatus]
                      ].join(' ')}
                    />
                  </div>
                  <Box className={styles.avatarBox}>
                    <Image
                      src={
                        item.recipientProfilePhoto ||
                        '/assets/images/user-default-image.png'
                      }
                      alt={item.recipientId}
                      width={50}
                      height={50}
                      className={styles.mainImg}
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Stack
                      direction={'row'}
                      alignItems='center'
                      gap={1}
                      justifyContent='space-between'
                    >
                      <Typography
                        fontWeight={`${
                          item.totalUnreadMessages > 0 ? 700 : 400
                        }`}
                        className={styles.searchItemName}
                        noWrap
                      >
                        {item?.recipientName}
                      </Typography>
                      <Typography className={styles.searchItemDate} noWrap>
                        {formatIsoDate(item.dateCreated)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      alignItems='center'
                      gap={1}
                      justifyContent='space-between'
                    >
                      <Typography className={styles.searchItemText} noWrap>
                        {truncateString(item?.lastMessage, 20)}
                      </Typography>
                      {item?.totalUnreadMessages != 0 && (
                        <Typography className={styles.searchItemNum}>
                          {item?.totalUnreadMessages}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            )
          }
          if (item.recipientId && item.recipientOrganizationId) {
            return (
              <Box
                className={`${styles.searchListItem} ${
                  selectedChat?.recipientId === item.recipientId &&
                  styles.active
                }`}
                key={index}
                onClick={() => handleOpenMessage(item)}
              >
                <Box className={styles.searchListItemLeft}>
                  <div>
                    <Box
                      className={[
                        styles.searchListItemStatus,
                        styles.status,
                        styles[item.activeStatus]
                      ].join(' ')}
                    />
                  </div>
                  <Box className={styles.avatarBox}>
                    <Image
                      src={
                        item.recipientProfilePhoto ||
                        '/assets/images/user-default-image.png'
                      }
                      alt={item.recipientId}
                      width={50}
                      height={50}
                      className={styles.mainImg}
                    />
                    <Image
                      src={
                        item.recipientOrganizationLogo ||
                        '/assets/images/user-default-image.png'
                      }
                      alt={item.recipientId}
                      width={20}
                      height={20}
                      className={styles.minImg}
                    />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Stack
                      direction={'row'}
                      alignItems='center'
                      gap={1}
                      justifyContent='space-between'
                    >
                      <Typography
                        fontWeight={`${
                          item.totalUnreadMessages > 0 ? 700 : 400
                        }`}
                        className={styles.searchItemName}
                        noWrap
                      >
                        {item?.recipientOrganizationName}
                      </Typography>
                      <Typography className={styles.searchItemDate} noWrap>
                        {formatIsoDate(item.dateCreated)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      alignItems='center'
                      gap={1}
                      justifyContent='space-between'
                    >
                      <Typography className={styles.searchItemText} noWrap>
                        {truncateString(item?.lastMessage, 20)}
                      </Typography>
                      {item?.totalUnreadMessages != 0 && (
                        <Typography className={styles.searchItemNum}>
                          {item?.totalUnreadMessages}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Box>
            )
          }
        })}
      </Box>
    </Box>
  )
}

export default SearchTab

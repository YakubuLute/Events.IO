import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import useDebounce from '@/utils/useDebounce'
import useScreenView from '@/utils/useScreenView'
import { socket } from '@/services/socket.service'
import { MessageContext } from '@/contexts/messageContext'
import { TConversation } from '@/@types/shared/chat'
import EmptyMessages from './EmptyMessages'
import styles from './styles.module.scss'
import UserWrapper from './UserWrapper'
import UserWrapperSkeleton from './UserWrapperSkeleton'

const ITEMS_PER_PAGE = 10

type Props = {
  onFetchMessages: (value: TConversation) => void
}

const Sidenav = ({ onFetchMessages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { searchTerm, chats, setChats, recipientId, setSelectedChat } =
    useContext(MessageContext)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const isReachedBottom = useScreenView(bottomRef)
  const [loadingChats, setLoadingChats] = useState(false)
  const [newChat, setNewChat] = useState<TConversation | null>(null)

  const debouncedText = useDebounce(searchTerm, 1000)

  const searchChats = async () => {
    const response = await socket.emitWithAck('messages:chats', {
      page: 1,
      itemsPerPage: 10,
      search: debouncedText
    })
    setChats([...response.data.items])
  }

  const fetchChats = async () => {
    try {
      setLoadingChats(true)
      const response = await socket.emitWithAck('messages:chats', {
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE
      })
      const { totalPages, items, currentPage: cp } = response.data
      setTotalPages(totalPages)
      setChats(items)
      if (recipientId) {
        const chat = items.find(
          (i: TConversation) => i.recipientId === recipientId
        )
        if (chat) {
          setSelectedChat(chat)
        }
      }
      if (cp < totalPages) {
        setHasNextPage(true)
        setCurrentPage(prev => prev + 1)
      }
      setLoadingChats(false)
    } catch (e) {
      setLoadingChats(false)
    }
  }

  const fetchChatsNextPage = useCallback(async () => {
    try {
      const response = await socket.emitWithAck('messages:chats', {
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE
      })

      setChats([...chats, ...response.data.items])
      if (response?.data.currentPage < totalPages) {
        setCurrentPage(prev => prev + 1)
        setHasNextPage(true)
      }
    } catch (e) {}
  }, [chats, currentPage, totalPages, setChats])

  useEffect(() => {
    if (isReachedBottom && hasNextPage) {
      fetchChatsNextPage()
    }
    if (debouncedText) {
      searchChats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchChatsNextPage, hasNextPage, isReachedBottom, debouncedText])

  useEffect(() => {
    if (newChat) {
      const copyChats = [...chats]
      const filteredChats = copyChats.filter(chat => chat?._id !== newChat?._id)
      if (newChat?.totalUnreadMessages > 0) {
        filteredChats.unshift(newChat)
        setChats(filteredChats)
      }
      setNewChat(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, newChat])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const connectData = localStorage.getItem('connectData')
      if (connectData && chats.length > 0) {
        const data = JSON.parse(connectData)
        localStorage.removeItem('connectData')
        const chat = chats.find(c => c._id === data._id)
        if (chat) {
          setSelectedChat(chat)
        } else {
          const activeChat = {
            ...data,
            activeStatus: 'inactive',
            isConnected: true
          }
          setSelectedChat(activeChat)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])

  useEffect(() => {
    fetchChats()
    socket.on('messages:chat', res => {
      if (res) {
        const chat = JSON.parse(res) as TConversation
        setNewChat(chat)
      }
    })
    return () => {
      socket.off('messages:chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.sideNavWrapper} ref={bottomRef}>
      {loadingChats ? (
        <UserWrapperSkeleton />
      ) : chats && chats.length ? (
        chats.map((chat, idx) => (
          <UserWrapper
            chat={chat}
            key={chat._id}
            noBorder={idx === 0}
            onFetchMessages={onFetchMessages}
          />
        ))
      ) : (
        <EmptyMessages />
      )}
    </div>
  )
}

export default Sidenav

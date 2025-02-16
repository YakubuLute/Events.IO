import React, { useContext, useEffect, useRef, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, Typography } from '@mui/material'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import Scroll from 'react-scroll'
import { toast } from 'react-toastify'
import { useOnClickOutside } from 'usehooks-ts'
import Lightbox from 'yet-another-react-lightbox'

import { getCurrentUser, isValidFileType } from '@/utils/utils'
import { useUploadFile } from '@/hooks/shared/fileUploadHook'
import useAutosizeTextArea from '@/hooks/shared/useAutosizeTextarea'
import { socket } from '@/services/socket.service'
import { MessageContext } from '@/contexts/messageContext'
import { useSocketContext } from '@/contexts/SocketContext'
import { Attachment, IMessage, TConversation } from '@/@types/shared/chat'
import styles from '@/styles/messages.module.scss'
import FilePreview from '../file-preview/FilePreview'
import NotificationStrip from '../sticky-message/messageInbox/chat-box/NotificationStrip'
import SingleMessageCard from '../sticky-message/single-message-card'
import AttachFile from './icons/attachFile'
import SendIcon from './icons/SendIcon'
import SmileyFace from './icons/smileyFace'
import ChatsEmptyState from './MessagesEmptyState'

const scroll = Scroll.animateScroll

type Props = {
  chats: TConversation[]
}

const ITEMS_PER_PAGE = 10
const MainTab = ({ chats }: Props) => {
  const { selectedChat, setInfoTabOpen, infoTabOpen, isExtendTab } =
    useContext(MessageContext)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedAttachment, setSelectedAttachment] =
    useState<Attachment | null>(null)
  const { networkConnected } = useSocketContext()
  const bottomRef = useRef<HTMLDivElement>(null)
  const emojiMenuRef = useRef<HTMLInputElement>(null)
  const inputFile = useRef<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [showEmojiMenu, setShowEmojiMenu] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<Attachment | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loadingMgs, setLoadingMgs] = useState(false)

  const onFileUploadSuccess = data => {
    setUploadUrl(data)
  }
  const { mutateAsync, isPending: isUploading } = useUploadFile({
    onSuccess: onFileUploadSuccess,
    onError: () =>
      toast('There was an error uploading your file', { type: 'error' })
  })
  const [isTyping, setIsTyping] = useState(false)
  const [value, setValue] = useState('')
  useAutosizeTextArea(inputRef.current, value)

  const onIsTyping = (typing: any) => {
    setIsTyping(typing ? true : false)
    setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }
  useOnClickOutside(emojiMenuRef, () => setShowEmojiMenu(false))

  const fetchMessages = async () => {
    try {
      setLoadingMgs(true)
      setCurrentPage(1)
      setTotalPages(0)
      const payload = {
        connectionId: selectedChat?._id,
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE
      }
      await socket.emitWithAck('messages:start', payload)
      const response = await socket.emitWithAck('messages', payload)
      const { totalPages, items } = response.data

      setTotalPages(totalPages)
      setMessages(sortMessagesByDate(items))
      setLoadingMgs(false)

      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollTop = bottomRef?.current?.scrollHeight
        }
      }, 500)
    } catch (e) {
      setLoadingMgs(false)
      console.error('FETCH MESSAGES ERROR: ', e)
    }
  }

  const onAttachFile = () => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const scrollToBottom = (duration = 400) => {
    scroll.scrollToBottom({
      duration: duration,
      delay: 0,
      smooth: true,
      containerId: `chatContainer${selectedChat?._id}`,
      offset: 0
    })
  }

  const handleScroll = () => {
    if (bottomRef.current && bottomRef.current.scrollTop < 10) {
      bottomRef.current.scrollTop = 10
    }
    if (
      bottomRef.current &&
      bottomRef.current.scrollTop <= 10 &&
      currentPage <= totalPages
    ) {
      console.log('=== GET OLDER MESSAGES ===')
      fetchNextPage()
    }
  }
  useEffect(() => {
    if (selectedChat) {
      fetchMessages()
    }
    return () => {
      socket.removeAllListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])

  const fetchNextPage = async () => {
    if (currentPage > totalPages) return
    const payload = {
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
      connectionId: selectedChat?._id
    }
    const response = await socket.emitWithAck('messages', payload)
    let olderMessages = response.data.items
    olderMessages = sortMessagesByDate(olderMessages)

    if (olderMessages.length > 0) {
      setMessages([...olderMessages, ...messages])
      setCurrentPage(currentPage + 1)
    }
  }
  // console.log(data);

  const handleSendMessage = async (e: any) => {
    try {
      e.stopPropagation()
      e.preventDefault()

      const msg = inputRef.current ? inputRef.current.value : ''
      if (msg === '' && uploadUrl == null) {
        if (inputRef.current) {
          inputRef.current.focus()
        }
        return
      }
      setLoading(true)
      const payload = {
        connectionId: selectedChat!._id,
        message: msg,
        type: uploadUrl?.url ? 'attachment' : 'text', // text | voicenote | attachment
        voicenote: '',
        attachment: uploadUrl?.url || ''
      }
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      const {
        data: newMessage,
        success,
        description
      } = await socket.emitWithAck('messages:new', payload)
      if (!success) throw new Error(description)
      setMessages([
        ...messages,
        {
          ...newMessage,
          senderId: getCurrentUser()?._id,
          attachment: uploadUrl
        }
      ])
      setUploadUrl(null)
      setSelectedFile(null)
      setTimeout(() => {
        scrollToBottom()
      }, 300)

      setLoading(false)
    } catch (error: any) {
      toast(error.message, {
        type: 'error'
      })
      setLoading(false)
    }
  }
  function sortMessagesByDate (messages: IMessage[]): IMessage[] {
    // Convert timestamps to Date objects for proper comparison
    const messagesWithDate = messages.map(message => ({
      ...message,
      dateObject: new Date(message.timestamp)
    }))

    // Sort messages by date in descending order
    const sortedMessages = messagesWithDate.sort(
      (a, b) => a.dateObject.getTime() - b.dateObject.getTime()
    )

    // Remove the temporary dateObject property
    const finalSortedMessages = sortedMessages.map(
      ({ dateObject, ...rest }) => {
        console.log(dateObject)
        return rest
      }
    )

    return finalSortedMessages
  }
  const onNewMessage = () => {
    socket.on('messages:new', async (newMessage: IMessage) => {
      setMessages(previousState => [...previousState, newMessage])
      const payload = {
        connectionId: selectedChat?._id,
        messageId: newMessage.messageId
      }

      await socket.emitWithAck('messages:read', payload)
      await socket.emitWithAck('messages:delivered', payload)
      scrollToBottom()
    })
  }

  useEffect(() => {
    onNewMessage()
    socket.on('messages:typing', onIsTyping)
    socket.on('messages:read', info => {
      const messageIndex = messages.findIndex(
        item => item.messageId === info.messageId
      )

      if (messageIndex < 0) return
      const newArray = [...messages]
      newArray[messageIndex].receipt = 'read'
      setMessages(newArray)
    })

    socket.on('messages:read:bulk', info => {
      const newMessages = info.messageIds
      const updatedMessages = [...messages]
      newMessages.forEach(element => {
        const itemIndex = updatedMessages.findIndex(
          item => element === item.messageId
        )

        if (itemIndex >= 0) {
          updatedMessages[itemIndex].receipt = 'read'
        }
      })
      setMessages(updatedMessages)
    })
    return () => {
      socket.removeListener('messages:new')
      socket.removeListener('messages:read')
      socket.removeListener('messages:end')
      socket.removeListener('messages:read')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const onEmojiClick = (e: EmojiClickData) => {
    const messageInput = inputRef.current

    setShowEmojiMenu(false)
    if (messageInput) {
      messageInput.value = messageInput.value + e.emoji
      messageInput?.focus()
    }
  }

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (!isValidFileType(file?.type)) {
      return toast('File type not supported', { type: 'error' })
    }
    setSelectedFile(file)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('prefix', 'message-attachment')
    await mutateAsync({ formData })
  }

  const onSetKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement
    setValue(value)
    if (value !== '') {
      socket.emit('messages:typing', {
        connectionId: selectedChat?._id
      })
    } else {
      socket.emit('messages:typing', {
        connectionId: ''
      })
    }
  }

  const onSetKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode || (e.key == 'Enter' ? 13 : '')

    if (keyCode === 13 && !e.shiftKey) {
      handleSendMessage(e)
    }
  }

  const disableCondition = () => {
    return (
      loading ||
      !networkConnected ||
      isUploading ||
      selectedChat?.isConnected === false ||
      selectedChat?.isDeletedUser
    )
  }

  return (
    <Box
      className={`${styles.mainContainer} ${
        isExtendTab && styles.mainContainer_mobile
      }`}
    >
      <Box className={styles.mainHeader}>
        <Box flex={1} display={'flex'} flexDirection={'column'}>
          <Typography className={styles.mainTitle} noWrap>
            {selectedChat?.recipientName}
          </Typography>
          {isTyping && <p className='text-[10px] text-slate-600'>typing...</p>}
        </Box>
        <Button
          sx={{
            display: infoTabOpen ? 'none' : 'block'
          }}
          className={[
            styles.mainButton,
            infoTabOpen ? styles['no-show'] : styles['show']
          ].join(' ')}
          endIcon={<ArrowForwardIcon />}
          onClick={() => setInfoTabOpen(true)}
          variant='contained'
        >
          <Typography className={styles.mainButtonText} noWrap>
            Show Details
          </Typography>
        </Button>
      </Box>
      {messages.length > 0 ? (
        <Box
          ref={bottomRef}
          overflow={'auto'}
          onScroll={handleScroll}
          style={{ paddingTop: '13px' }}
          id={`chatContainer`}
          className={styles.mainChatContainer}
        >
          {loadingMgs ? (
            <NotificationStrip message='Loading messages . . .' />
          ) : messages.length ? (
            messages.map(messageData => (
              <SingleMessageCard
                onClick={data => {
                  setOpen(true)
                  setSelectedAttachment(data)
                }}
                key={messageData.messageId}
                message={messageData}
              />
            ))
          ) : null}
          {selectedChat?.isDeletedUser ? (
            <NotificationStrip message='This user is no longer on vaurse' />
          ) : selectedChat?._id &&
            selectedChat?.isConnected === false &&
            selectedChat?.isDeletedUser === false ? (
            <NotificationStrip message='You have closed connection for this user' />
          ) : null}
        </Box>
      ) : (
        <ChatsEmptyState />
      )}

      {isUploading && <span>Uploading</span>}
      {chats.length > 0 ? (
        <form
          onSubmit={handleSendMessage}
          className={styles.mainBottomContainer}
        >
          <Box
            style={{
              paddingInline: '16px'
            }}
            sx={{
              backgroundColor: '#F2F4FF',
              borderRadius: '32px',
              paddingY: 2,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: selectedFile ? '260px' : '100%',
              justifyContent: selectedFile ? 'center' : 'flex-start',
              alignItems: 'start'
            }}
          >
            {selectedFile && (
              <div className='lg:ml-16 w-[150px] h-[150px]'>
                <FilePreview
                  fileType={selectedFile?.type}
                  fileUrl={URL.createObjectURL(selectedFile)}
                  showCloseButton={true}
                  onClose={() => {
                    setSelectedFile(null)
                    setUploadUrl(null)
                  }}
                />
              </div>
            )}
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
              height={'100%'}
            >
              <button
                type='button'
                onClick={() => setShowEmojiMenu(true)}
                className={styles.pointer}
              >
                <SmileyFace />
              </button>

              <textarea
                onKeyUp={onSetKeyUp}
                placeholder='Type your message'
                ref={inputRef}
                onKeyDown={onSetKeyDown}
                rows={1}
                className={
                  'resize-none flex w-full placeholder:text-[#081A7F] border-0 bg-[#F2F4FF] focus:outline-none focus:ring-0  px-2'
                }
                disabled={disableCondition()}
              />
              <button
                onClick={onAttachFile}
                className={styles.pointer}
                disabled={disableCondition()}
              >
                <AttachFile />
              </button>
            </Box>
          </Box>

          <button
            type='submit'
            disabled={disableCondition()}
            className='bg-[#F2F4FF] ml-3 rounded-full h-12 w-12 flex justify-center items-center'
          >
            <SendIcon />
          </button>
        </form>
      ) : null}

      <input
        onChange={onFileChange}
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
      />
      <Box
        position={'absolute'}
        bottom={0}
        ref={emojiMenuRef}
        zIndex={100000}
        display={showEmojiMenu ? 'flex' : 'none'}
      >
        <EmojiPicker height={'400px'} onEmojiClick={onEmojiClick} />
      </Box>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: selectedAttachment?.url as string }]}
      />
    </Box>
  )
}

export default MainTab

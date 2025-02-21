import React, {
  FormEvent,
  KeyboardEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState
} from 'react'
import { Box, Divider, Paper } from '@mui/material'
import Scroll from 'react-scroll'
import { useOnClickOutside } from 'usehooks-ts'
import Lightbox from 'yet-another-react-lightbox'

import {
  getCurrentUser,
  isValidFileType,
  sortMessagesByDate
} from '@/utils/utils'
import { errorAlert } from '@/components/shared/toastAlert'
import { useUploadFile } from '@/hooks/shared/fileUploadHook'
import useAutosizeTextArea from '@/hooks/shared/useAutosizeTextarea'
import useRandomInterval from '@/hooks/shared/useRandomInterval'
import { socket } from '@/services/socket.service'
import { useSocketContext } from '@/contexts/SocketContext'
import {
  Attachment,
  IMessage,
  TConversation,
  TStep
} from '@/@types/shared/chat'
import { UserChatStatus } from '@/@types/shared/type'
import SingleMessageCard from '../../single-message-card'
import AttentionModal from './AttentionModal'
import ChatBoxInput from './ChatBoxInput'
import ChatTopBar from './ChatTopBar'
import NotificationStrip from './NotificationStrip'
import ReviewBox from './ReviewBox'

const scroll = Scroll.animateScroll
export interface ChatBoxProps {
  onClose: MouseEventHandler<HTMLElement>
  data: TConversation
  chatId: string
}

type TSlide = {
  src: string
}

const ITEMS_PER_PAGE = 10

const ChatBox = ({ onClose, data, chatId }: ChatBoxProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { networkConnected } = useSocketContext()
  const bottomRef = useRef<HTMLDivElement>(null)
  const emojiMenuRef = useRef<HTMLInputElement>(null)
  const inputFile = useRef<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [showEmojiMenu, setShowEmojiMenu] = useState(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [uploadUrl, setUploadUrl] = useState<Attachment | null>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [value, setValue] = useState('')
  useAutosizeTextArea(inputRef.current, value)
  const [isTyping, setIsTyping] = useState(false)
  const [showAttentionModal, setShowAttentionModal] = useState(false)
  const [step, setStep] = useState<TStep>('start')
  const [loadingMgs, setLoadingMgs] = useState(false)
  const [activeStatus, setActiveStatus] = useState<UserChatStatus>(
    data?.activeStatus
  )
  const [slides, setSlides] = useState<TSlide[]>([])

  useOnClickOutside(emojiMenuRef, () => setShowEmojiMenu(false))

  const onFileUploadSuccess = (data: any) => {
    setUploadUrl(data)
  }

  const { mutateAsync, isPending: isUploading } = useUploadFile({
    onSuccess: onFileUploadSuccess,
    onError: () =>
      errorAlert({ message: 'There was an error uploading your file' })
  })

  const fetchMessages = async () => {
    try {
      setLoadingMgs(true)
      const payload = {
        connectionId: chatId,
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE
      }
      await socket.emitWithAck('messages:start', payload)
      const response = await socket.emitWithAck('messages', payload)
      const { totalPages, items } = response.data

      setTotalPages(totalPages)
      setMessages(sortMessagesByDate(items))
      setLoadingMgs(false)
      setCurrentPage(prev => prev + 1)

      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollTop = bottomRef?.current?.scrollHeight
        }
      }, 500)
    } catch (e) {
      setLoadingMgs(false)
      // console.error('FETCH MESSAGES ERROR: ', e);
    }
  }

  const fetchNextPage = async () => {
    if (currentPage > totalPages) return
    const payload = {
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
      connectionId: data._id
    }
    const response = await socket.emitWithAck('messages', payload)
    let olderMessages = response.data.items
    olderMessages = sortMessagesByDate(olderMessages)
    if (olderMessages.length > 0) {
      setMessages([olderMessages, ...messages])
      setCurrentPage(prev => prev + 1)
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
      containerId: `chat${data?._id}`,
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
      // console.log('=== GET OLDER MESSAGES ===');
      fetchNextPage()
    }
  }

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    try {
      socket.emit('messages:typing', {
        connectionId: ''
      })
      e.stopPropagation()
      e.preventDefault()

      const msg = inputRef.current ? inputRef.current.value : ''
      if (msg === '' && uploadUrl == null) {
        inputRef.current && inputRef.current.focus()
        return
      }
      setLoading(true)
      const payload = {
        message: msg,
        type: uploadUrl?.url ? 'attachment' : 'text', // text | voicenote | attachment
        voicenote: '',
        attachment: uploadUrl?.url || '',
        ...(data?._id
          ? { connectionId: data._id }
          : { recipientId: data.recipientId })
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
      errorAlert({ message: error.message })
      setLoading(false)
    }
  }

  const onNewMessage = () => {
    socket.on('messages:new', async (newMessage: IMessage) => {
      setMessages(previousState => [...previousState, newMessage])
      const payload = {
        connectionId: data._id,
        messageId: newMessage.messageId
      }

      await socket.emitWithAck('messages:read', payload)
      await socket.emitWithAck('messages:delivered', payload)
      scrollToBottom()
    })
  }

  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (!isValidFileType(file?.type)) {
      return errorAlert({ message: 'File type not supported' })
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
        connectionId: data?._id
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

  const onIsTyping = (typing: unknown) => {
    setIsTyping(typing ? true : false)
    setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  useEffect(() => {
    fetchMessages()
    socket.on('messages:typing', onIsTyping)
    socket.on('messages:recipient:active-status', data => {
      if (data) {
        const newData = JSON.parse(data)
        setActiveStatus(newData?.activeStatus)
      }
    })
    return () => {
      socket.off('messages:typing')
      socket.off('messages:recipient:active-status')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onNewMessage()
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
      socket.off('messages:new')
      socket.off('messages:read')
      socket.off('messages:read:bulk')
      socket.off('messages:read')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const onBuildAttachments = (data: Attachment) => {
    const filteredMessaages = messages?.filter(msg => msg.type === 'attachment')
    const attachments: TSlide[] = filteredMessaages?.map(msg => {
      return {
        src: msg?.attachment?.url
      }
    })
    const filteredAttachments = attachments.filter(a => a?.src !== data?.url)
    filteredAttachments.unshift({ src: data?.url })
    setSlides(filteredAttachments)
    setOpen(true)
  }

  useRandomInterval(
    async () => {
      await socket.emitWithAck('activities:status:update', {})
    },
    3000,
    10000
  )

  return (
    <Paper
      sx={{
        width: expanded ? 600 : 400,
        maxWidth: '100%',
        borderRadius: '10px 10px 0 0',
        boxShadow: '0px 0px 15px 1px #F2F1FF',
        overflow: 'auto',
        padding: 0,
        position: 'relative'
      }}
    >
      <Box height={'100%'} display={'flex'} flexDirection={'column'}>
        <ChatTopBar
          data={data}
          expanded={expanded}
          isTyping={isTyping}
          onClose={onClose}
          setExpanded={setExpanded}
          setShowAttentionModal={setShowAttentionModal}
          activeStatus={activeStatus}
        />
        <Divider />
        <Box
          sx={{ background: 'white' }}
          display={'flex'}
          flexDirection={'column'}
          flex={1}
          p={2}
        >
          {step !== 'submit' ? (
            <Box
              overflow={'auto'}
              height={expanded ? 450 : 350}
              onScroll={handleScroll}
              ref={bottomRef}
              id={`chat${data?._id}`}
              style={{ maxHeight: '450px', paddingTop: '13px' }}
            >
              {loadingMgs ? (
                <NotificationStrip message='Loading messages . . .' />
              ) : messages.length ? (
                messages.map(messageData => (
                  <SingleMessageCard
                    onClick={onBuildAttachments}
                    key={messageData.messageId}
                    message={messageData}
                  />
                ))
              ) : null}
              {data?.isDeletedUser ? (
                <NotificationStrip message='This user is no longer on vaurse' />
              ) : data?._id &&
                data?.isConnected === false &&
                data?.isDeletedUser === false ? (
                <NotificationStrip message='You have closed connection for this user' />
              ) : null}
            </Box>
          ) : (
            <ReviewBox chatData={data} setStep={setStep} />
          )}
        </Box>
        {step !== 'submit' ? (
          <ChatBoxInput
            emojiMenuRef={emojiMenuRef}
            handleSendMessage={handleSendMessage}
            inputFile={inputFile}
            inputRef={inputRef}
            isUploading={isUploading}
            loading={loading}
            networkConnected={networkConnected}
            onAttachFile={onAttachFile}
            onFileChange={onFileChange}
            onSetKeyDown={onSetKeyDown}
            onSetKeyUp={onSetKeyUp}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setShowEmojiMenu={setShowEmojiMenu}
            setUploadUrl={setUploadUrl}
            showEmojiMenu={showEmojiMenu}
            chatData={data}
          />
        ) : null}
      </Box>

      <AttentionModal
        setShowAttentionModal={setShowAttentionModal}
        setStep={setStep}
        showAttentionModal={showAttentionModal}
      />
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </Paper>
  )
}

export default ChatBox

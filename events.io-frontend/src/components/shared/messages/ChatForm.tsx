import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { IconButton } from '@mui/material'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import Scroll from 'react-scroll'
import { useOnClickOutside } from 'usehooks-ts'

import { onAxiosError } from '@/utils/shared/axiosError'
import { useUploadFile } from '@/hooks/shared/fileUploadHook'
import { socket } from '@/services/socket.service'
import { MessageContext } from '@/contexts/messageContext'
import { useSocketContext } from '@/contexts/SocketContext'
import { Attachment } from '@/@types/shared/chat'
import { ErrorResponse } from '@/@types/shared/type'
import { getCurrentUser, isValidFileType } from '@/utils'
import FilePreview from '../file-preview/FilePreview'
import AttachIcon from '../SVG-components/AttachIcon'
import EmojiIcon from '../SVG-components/EmojiIcon'
import SendIcon from '../SVG-components/SendIcon'
import { errorAlert } from '../toastAlert'
import styles from './styles.module.scss'

const scroll = Scroll.animateScroll

const ChatForm = () => {
  const { selectedChat, setMessages, messages } = useContext(MessageContext)
  const chatAreaRef = useRef<HTMLTextAreaElement>(null)
  const emojiMenuRef = useRef<HTMLInputElement>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [showEmojiMenu, setShowEmojiMenu] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<Attachment | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [_, setError] = useState('')
  const { networkConnected } = useSocketContext()
  const [isSubmitting, setSubmitting] = useState(false)
  const user = getCurrentUser()

  useOnClickOutside(emojiMenuRef, () => setShowEmojiMenu(false))

  const scrollToBottom = (duration = 400) => {
    scroll.scrollToBottom({
      duration: duration,
      delay: 0,
      smooth: true,
      containerId: `chat${selectedChat?._id}`,
      offset: 0
    })
  }

  const onEmojiClick = (e: EmojiClickData) => {
    const msgInput = chatAreaRef.current
    if (msgInput) {
      msgInput.value = msgInput.value + e.emoji
      msgInput?.focus()
    }
    setShowEmojiMenu(false)
  }

  const onSetKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement
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

  const onSetKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      sendMessage(e)
    }
  }

  const sendMessage = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    try {
      socket.emit('messages:typing', {
        connectionId: ''
      })

      e.stopPropagation()
      e.preventDefault()

      const msg = chatAreaRef.current ? chatAreaRef.current.value : ''
      if (msg === '' && !uploadUrl) {
        if (chatAreaRef.current) {
          chatAreaRef.current.focus()
        }
        return
      }
      setSubmitting(true)
      const payload = {
        connectionId: selectedChat!._id,
        message: msg,
        type: uploadUrl?.url ? 'attachment' : 'text', // text | voicenote | attachment
        voicenote: '',
        attachment: uploadUrl?.url || ''
      }
      if (chatAreaRef.current) {
        chatAreaRef.current.value = ''
      }
      const {
        data: newMessage,
        success,
        description
      } = await socket.emitWithAck('messages:new', payload)
      if (!success) throw new Error(description)
      setMessages([
        ...messages,
        { ...newMessage, senderId: user?._id, attachment: uploadUrl }
      ])
      setUploadUrl(null)
      setSelectedFile(null)
      setTimeout(() => {
        scrollToBottom()
      }, 300)
      setSubmitting(false)
    } catch (error: any) {
      setSubmitting(false)
      errorAlert({ message: error.message })
    }
  }

  const { mutate: uploadFile, isPending: isUploading } = useUploadFile({
    onSuccess: (data: any) => {
      setUploadUrl(data)
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true)
    }
  })

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (!isValidFileType(file.type)) {
        errorAlert({ message: 'File type not supported' })
      }
      setSelectedFile(file)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('prefix', 'message-attachment')
      uploadFile({ formData })
    }
  }

  const onAttachFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const disableCondition = () => {
    return (
      isSubmitting ||
      !networkConnected ||
      isUploading ||
      selectedChat?.isConnected === false ||
      selectedChat?.isDeletedUser
    )
  }

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.focus()
      chatAreaRef.current.addEventListener('input', () => {
        if (chatAreaRef.current) {
          chatAreaRef.current.style.height = 'auto'
          chatAreaRef.current.style.height =
            chatAreaRef.current.scrollHeight + 'px'
        }
      })
    }
  }, [chatAreaRef])

  return (
    <>
      <form className={styles.formWrapper} onSubmit={sendMessage}>
        <div className={styles.typeWrapper}>
          <div className={styles.chatWrapper}>
            <IconButton
              className={styles.chatBtn}
              onClick={() => setShowEmojiMenu(true)}
            >
              <EmojiIcon />
            </IconButton>
            <div className={styles.mainFormBox}>
              <textarea
                placeholder='Type your message...'
                className={styles.textarea}
                rows={1}
                ref={chatAreaRef}
                onKeyUp={onSetKeyUp}
                onKeyDown={onSetKeyDown}
                disabled={disableCondition()}
              />
              {selectedFile ? (
                <FilePreview
                  fileType={selectedFile.type}
                  fileUrl={URL.createObjectURL(selectedFile)}
                  showCloseButton
                  onClose={() => {
                    setSelectedFile(null)
                    setUploadUrl(null)
                  }}
                />
              ) : null}
            </div>
          </div>
          <IconButton
            className={styles.chatBtn}
            onClick={onAttachFile}
            disabled={disableCondition()}
          >
            <AttachIcon />
          </IconButton>
        </div>
        <IconButton
          className={styles.sendBtn}
          disabled={disableCondition()}
          type='submit'
        >
          <SendIcon />
        </IconButton>
      </form>
      <div
        className={[
          styles.emojiContainer,
          showEmojiMenu ? styles.show : null
        ].join(' ')}
        ref={emojiMenuRef}
      >
        <EmojiPicker onEmojiClick={onEmojiClick} height='400px' />
      </div>
      <input
        onChange={onFileChange}
        type='file'
        ref={inputFileRef}
        className={styles.fileInput}
      />
    </>
  )
}

export default ChatForm

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { IconButton, Typography } from '@mui/material'

import { ChatCloseIcon } from '@/components/ui/icons'
import useRandomInterval from '@/hooks/shared/useRandomInterval'
import { socket } from '@/services/socket.service'
import { useHeaderContext } from '@/contexts/headerContext'
import { MessageContext } from '@/contexts/messageContext'
import { truncateString } from '@/utils'
import { CustomButton } from '../Button/Button'
import CustomDialog from '../dialog/CustomDialog'
import BackArrowIcon from '../SVG-components/BackArrowIcon'
import styles from './styles.module.scss'
import UserDetails from './UserDetails'

const ITEMS_PER_PAGE = 10

const TopUserBar = () => {
  const {
    setSelectedChat,
    selectedChat,
    infoTabOpen,
    setInfoTabOpen,
    setShowAttentionModal,
    setChats
  } = useContext(MessageContext)
  const [isTyping, setTyping] = useState(false)
  const { screenSize } = useHeaderContext()
  const [currentPage, setCurrentPage] = useState(1)

  const isLargeScreen = screenSize === 'desktop'
  const isSmallScreen = screenSize === 'mobile' || screenSize === 'tablet'

  const onSetTyping = (typing: unknown) => {
    setTyping(typing ? true : false)
    setTimeout(() => {
      setTyping(false)
    }, 1000)
  }

  const fetchChats = async () => {
    try {
      const response = await socket.emitWithAck('messages:chats', {
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE
      })
      const { totalPages, items, currentPage: cp } = response.data
      setChats(items)
      if (cp < totalPages) {
        setCurrentPage(prev => prev + 1)
      }
    } catch (e) {}
  }

  useEffect(() => {
    socket.on('messages:typing', onSetTyping)
  }, [])

  const onBackBtnClick = () => {
    fetchChats()
    setSelectedChat(null)
  }

  useRandomInterval(
    async () => {
      await socket.emitWithAck('activities:status:update', {})
    },
    3000,
    10000
  )

  return (
    <>
      <div className={styles.topBarWrapper}>
        <div className={styles.chatUserWrapper}>
          <IconButton onClick={onBackBtnClick}>
            <BackArrowIcon />
          </IconButton>
          <div className={styles.chatUserBox}>
            <div className={styles.profileBox}>
              {selectedChat ? (
                <Image
                  src={
                    selectedChat?.recipientProfilePhoto ||
                    '/assets/images/user-default-image-sq.svg'
                  }
                  alt='user profile'
                  width={50}
                  height={50}
                  className={[styles.profileImg, styles.smallRadius].join('')}
                />
              ) : null}
              {selectedChat?.recipientId &&
              selectedChat?.recipientOrganizationId ? (
                <Image
                  src={
                    selectedChat?.recipientOrganizationLogo ||
                    '/assets/images/user-default-image-sq.svg'
                  }
                  alt='user profile'
                  width={20}
                  height={20}
                  className={styles.employerLogo}
                />
              ) : null}
              <div className={styles.nameBox}>
                <Typography className={styles.nameText}>
                  {isSmallScreen
                    ? truncateString(selectedChat?.recipientName || '', 15)
                    : selectedChat?.recipientName}
                </Typography>
                {isTyping ? (
                  <Typography className={styles.typingText}>
                    typing...
                  </Typography>
                ) : (
                  <div className={styles.userStatus}>
                    <div
                      className={[
                        styles.statusBox,
                        selectedChat ? styles[selectedChat.activeStatus] : null
                      ].join(' ')}
                    ></div>
                    <Typography className={styles.statusText}>
                      {selectedChat?.activeStatus?.replace(/-/g, ' ')}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.toolBar}>
          <IconButton
            className={styles.closeBtn}
            onClick={() => setShowAttentionModal(true)}
          >
            <ChatCloseIcon />
          </IconButton>
          <CustomButton
            label='View Details'
            className={[
              styles.viewBtn,
              selectedChat && !infoTabOpen ? styles.show : null
            ].join(' ')}
            onClick={() => setInfoTabOpen(true)}
          />
        </div>
      </div>
      {!isLargeScreen ? (
        <CustomDialog
          onClose={() => setInfoTabOpen(false)}
          open={infoTabOpen}
          title='Details'
        >
          <UserDetails />
        </CustomDialog>
      ) : null}
    </>
  )
}

export default TopUserBar

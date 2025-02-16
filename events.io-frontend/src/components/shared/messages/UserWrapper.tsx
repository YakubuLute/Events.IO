import React, { useContext } from 'react'
import Image from 'next/image'
import { Typography } from '@mui/material'

import { MessageContext } from '@/contexts/messageContext'
import { TConversation } from '@/@types/shared/chat'
import { truncateString } from '@/utils'
import styles from './styles.module.scss'

type Props = {
  chat: TConversation
  onFetchMessages: (value: TConversation) => void
  noBorder?: boolean
}

const UserWrapper = ({ chat, noBorder, onFetchMessages }: Props) => {
  const { selectedChat } = useContext(MessageContext)

  return (
    <button
      className={[
        styles.userWrapper,
        noBorder ? styles.noBorder : null,
        selectedChat?._id === chat._id ? styles.active : null
      ].join(' ')}
      aria-label='Click to chat with user'
      onClick={() => onFetchMessages(chat)}
    >
      <div className={styles.userBox}>
        <div
          className={[styles.statusBox, styles[chat?.activeStatus]].join(' ')}
        ></div>
        <div className={styles.profileBox}>
          <Image
            src={
              chat?.recipientProfilePhoto ||
              '/assets/images/user-default-image-sq.svg'
            }
            alt='user profile'
            width={50}
            height={50}
            className={styles.profileImg}
          />
          {chat?.recipientId && chat?.recipientOrganizationId ? (
            <Image
              src={
                chat?.recipientOrganizationLogo ||
                '/assets/images/user-default-image-sq.svg'
              }
              alt='user profile'
              width={20}
              height={20}
              className={styles.employerLogo}
            />
          ) : null}
          <div className={styles.nameBox}>
            <Typography
              className={[
                styles.nameText,
                chat.totalUnreadMessages > 0 ? styles.unread : null
              ].join(' ')}
              noWrap
            >
              {chat?.recipientName}
            </Typography>
            <Typography className={styles.msgText}>
              {truncateString(chat?.lastMessage, 20)}
            </Typography>
          </div>
        </div>
      </div>
      {chat?.totalUnreadMessages > 0 ? (
        <div className={styles.badge}>
          <Typography component='span'>{chat.totalUnreadMessages}</Typography>
        </div>
      ) : null}
    </button>
  )
}

export default UserWrapper

import React, { useContext, useState } from 'react'
import { BusinessCenterOutlined } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import moment from 'moment'

import { socket } from '@/services/socket.service'
import { MessageContext } from '@/contexts/messageContext'
import { ConnectionPaymentStatus } from '@/@types/shared/type'
import { getCurrentUser } from '@/utils'
import { TimeIcon } from '../SVG-components'
import AlertIcon from '../SVG-components/AlertIcon'
import XIcon from '../SVG-components/XIcon'
import { errorAlert, successAlert } from '../toastAlert'
import styles from './styles.module.scss'

type Props = {
  onChangeTab: (tab: string) => void
}

const RequestArea = ({ onChangeTab }: Props) => {
  const {
    selectedRequest,
    setSelectedChat,
    setSelectedRequest,
    setRecipientId
  } = useContext(MessageContext)
  const [showInformation, setShowInformation] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAcceptRequest = async () => {
    try {
      setLoading(true)
      const payload = {
        connectionId: selectedRequest?._id
      }
      const response = await socket.emitWithAck('connections:accept', payload)
      if (!response.success) throw new Error(response.description)
      successAlert({ message: response.description })
      setLoading(false)
      setRecipientId(selectedRequest?.senderId || null)
      setSelectedRequest(null)
      onChangeTab('chats')
    } catch (error: any) {
      errorAlert({
        message: error.message
      })
      setLoading(false)
    }
  }

  const handleDeclineRequest = async () => {
    try {
      setLoading(true)
      const payload = {
        connectionId: selectedRequest?._id
      }
      const response = await socket.emitWithAck('connections:decline', payload)
      setLoading(false)
      if (!response.success) throw new Error(response.description)
      successAlert({ message: response.description })
      setSelectedRequest(null)
    } catch (error: any) {
      errorAlert({
        message: error.message
      })
      setLoading(false)
    }
  }

  return (
    <div className={styles.messageAreaWrapper}>
      <div className={styles.messageBox}>
        <div className={styles.requestTimeBox}>
          <div className={styles.timeChip}>
            <TimeIcon />
            <Typography className={styles.timeText}>
              {moment(selectedRequest?.dateCreated).format(
                'Do MMM YYYY, hh:mm A'
              )}
            </Typography>
          </div>
        </div>
        <div className={styles.requestDetailBox}>
          <Typography className={styles.aboutText}>Asking About</Typography>
          <Button
            startIcon={<BusinessCenterOutlined />}
            className={styles.button}
            variant='outlined'
          >
            {selectedRequest?.reason}
          </Button>
          <Typography className={styles.messageText}>
            {selectedRequest?.message}
          </Typography>
        </div>
        {showInformation &&
        selectedRequest?.senderId !== getCurrentUser()?._id ? (
          <div className={styles.requestInfo}>
            <div className={styles.infoBox}>
              <AlertIcon />
              <Typography className={styles.infoText}>
                {selectedRequest?.paymentStatus ===
                ConnectionPaymentStatus.SENDER_DEBITED ? (
                  <span>
                    You will earn{' '}
                    {selectedRequest?.amountCharged
                      ? selectedRequest?.amountCharged
                      : 0}{' '}
                    VSC when you reply to this message.
                  </span>
                ) : null}
                You have up to 7 days to respond to this message
              </Typography>
            </div>
            <IconButton
              onClick={() => {
                setShowInformation(false)
              }}
            >
              <XIcon />
            </IconButton>
          </div>
        ) : null}
        <div className={styles.btnFooter}>
          {getCurrentUser()?._id !== selectedRequest?.senderId &&
          selectedRequest?.status === 'pending' ? (
            <>
              <Button
                variant='contained'
                disabled={loading}
                onClick={handleAcceptRequest}
                className={[styles.btn].join(' ')}
              >
                Accept
              </Button>
              <Button
                disabled={loading}
                variant='outlined'
                onClick={handleDeclineRequest}
                className={[styles.btn, styles.error].join(' ')}
              >
                Decline
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RequestArea

import React, { useEffect, useState } from 'react'
import { IconButton, Link, Tooltip, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

import { decodeAxiosError } from '@/utils/shared/axiosError'
import { CustomButton } from '@/components/shared'
import CancelIcon from '@/components/shared/SVG-components/CancelIcon'
import InfoIcon from '@/components/shared/SVG-components/InfoIcon'
import { errorAlert, successAlert } from '@/components/shared/toastAlert'
import { socket } from '@/services/socket.service'
import { useSocketContext } from '@/contexts/SocketContext'
import { TConenction } from '@/@types/candidate/candidate'
import { ConnectionInquiryData, ConnectionNav } from '@/@types/shared/type'
import { getBasePath } from '@/utils'
import styles from './styles.module.scss'
import { useGetEmployerInfo } from '@/hooks/employer'

type Props = {
  connection: TConenction
  selectedNav: ConnectionNav
  setSelectedNav: (value: ConnectionNav | null) => void
  onClose: () => void
  allowClose?: boolean
  onConnect?: () => any
}

const ConnectionForm = ({
  connection,
  selectedNav,
  setSelectedNav,
  onClose,
  allowClose = true,
  onConnect
}: Props) => {
  const queryClient = useQueryClient()
  const [reason, setReason] = useState(
    selectedNav.label !== 'Other' ? selectedNav.label : ''
  )
  const [message, setMessage] = useState('')
  const [enquiryData, setEnquiryData] = useState<ConnectionInquiryData | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const { setConnectionRequests, connectionRequests } = useSocketContext()

  const { data: employerDetails, isPending: employerInfoLoading } =
    useGetEmployerInfo()

  const enquireCost = async () => {
    try {
      setLoading(true)
      const response = await socket.emitWithAck('connections:inquiry', {
        recipientId: connection?._id
      })
      setEnquiryData(response?.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const disabledCheck = () => {
    if (enquiryData && employerDetails) {
      return (
        !message ||
        !reason ||
        enquiryData?.requestCost >
          employerDetails.candidateConnectionRequestCreditsRemaining ||
        isSubmitting
      )
    }
    return !message || !reason || isSubmitting
  }

  const shouldShowTooltip = () => {
    if (enquiryData && employerDetails) {
      return (
        enquiryData?.requestCost >
        employerDetails.candidateConnectionRequestCreditsRemaining
      )
    }
    return false
  }

  const onSendMessageClick = async () => {
    try {
      setSubmitting(true)
      const payload = {
        recipientId: connection?._id,
        requestReason: reason?.toLowerCase(),
        message,
        type: 'group',
        subType: 'job_search'
      }
      const response = await socket.emitWithAck('connections:new', payload)
      if (!response.success) throw new Error(response?.description)
      setConnectionRequests([response.data, ...connectionRequests])
      if (onConnect) {
        onConnect()
      }
      successAlert({ message: response.description })
      setSubmitting(false)
      queryClient.invalidateQueries({ queryKey: ['getCandidateNetworks'] })
      onClose()
    } catch (err: any) {
      errorAlert({ message: decodeAxiosError(err) })
      setSubmitting(false)
    }
  }

  useEffect(() => {
    enquireCost()
    return () => {
      socket.removeListener('connections:inquiry')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {selectedNav.label !== 'Other' ? (
        <Typography className={styles.navBox}>
          {selectedNav.icon} {selectedNav.label}{' '}
          {allowClose ? (
            <IconButton
              className={styles.cancelBtn}
              onClick={() => setSelectedNav(null)}
            >
              <CancelIcon />
            </IconButton>
          ) : null}
        </Typography>
      ) : null}
      {selectedNav.label === 'Other' ? (
        <div className={styles.inputTextBox}>
          <input
            type='text'
            placeholder='Specify Reason'
            onChange={e => setReason(e.target.value)}
            value={reason}
          />
          {allowClose ? (
            <IconButton
              className={styles.cancelBtn}
              onClick={() => setSelectedNav(null)}
            >
              <CancelIcon />
            </IconButton>
          ) : null}
        </div>
      ) : null}
      <textarea
        rows={14}
        className={styles.textArea}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='Type message ...'
      />
      <div className={styles.footerBox}>
        <Typography className={styles.costMessage}>
          Credit Left :{' '}
          <span className={styles.chargeBox}>
            <span>
              {employerInfoLoading
                ? 'loading...'
                : employerDetails
                ? `${employerDetails?.candidateConnectionRequestCreditsRemaining}`
                : 'N/A'}
            </span>
            <Tooltip
              placement='right'
              title={
                <span>
                  This amount is set by{' '}
                  {connection?.personalDetails?.firstName +
                    ' ' +
                    connection?.personalDetails.lastName}
                  , they will only receive this upon responding to your message.
                  if he does not reply within 7 days, the connection request
                  will be closed
                  {!!enquiryData?.requestCost
                    ? ' and you will get a refund'
                    : ''}
                </span>
              }
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </span>
        </Typography>
        <Tooltip
          placement='top'
          disableHoverListener={!shouldShowTooltip()}
          title={
            <span>
              You dont have enough VSC credits to send this connection request.
              <span> </span>
              <Link href={`/${getBasePath()}/wallet`}> Buy VSC Credits</Link>
            </span>
          }
        >
          <span className={styles.sendMessageButtonWrapper}>
            <CustomButton
              label='Send Message'
              variant='contained'
              className={styles.btn}
              disabled={disabledCheck()}
              onClick={onSendMessageClick}
              isLoading={isSubmitting}
            />
          </span>
        </Tooltip>
      </div>
    </>
  )
}

export default ConnectionForm

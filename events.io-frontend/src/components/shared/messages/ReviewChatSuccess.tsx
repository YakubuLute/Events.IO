import React, { useContext } from 'react'
import { IconButton, Typography } from '@mui/material'

import SuccessAlertIcon from '@/components/ui/icons/successAlertIcon'
import { MessageContext } from '@/contexts/messageContext'
import { CustomButton } from '../Button/Button'
import XIcon from '../SVG-components/XIcon'
import styles from './styles.module.scss'

const ReviewChatSuccess = () => {
  const { setShowSuccessModal, setStep } = useContext(MessageContext)

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setStep('start')
  }

  return (
    <div className={styles.chatNoticeBox}>
      <div className={styles.successModal}>
        <SuccessAlertIcon />
        <Typography className={styles.text}>
          Thank you for your feedback
        </Typography>
        <CustomButton
          fullWidth
          variant='contained'
          onClick={onCloseSuccessModal}
          label='Close'
          className={styles.reviewBtn}
        />
      </div>
    </div>
  )
}

export default ReviewChatSuccess

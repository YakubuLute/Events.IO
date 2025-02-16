import React, { useContext } from 'react'
import Image from 'next/image'
import { IconButton, Typography } from '@mui/material'

import { useHeaderContext } from '@/contexts/headerContext'
import { MessageContext } from '@/contexts/messageContext'
import { truncateString } from '@/utils'
import { CustomButton } from '../Button/Button'
import CustomDialog from '../dialog/CustomDialog'
import BackArrowIcon from '../SVG-components/BackArrowIcon'
import styles from './styles.module.scss'
import UserRequestDetails from './UserRequestDetails'

const TopUserRequestBar = () => {
  const { selectedRequest, setSelectedRequest, infoTabOpen, setInfoTabOpen } =
    useContext(MessageContext)
  const { screenSize } = useHeaderContext()

  const isLargeScreen = screenSize === 'desktop'

  return (
    <>
      <div className={styles.topBarWrapper}>
        <div className={styles.chatUserWrapper}>
          <IconButton onClick={() => setSelectedRequest(null)}>
            <BackArrowIcon />
          </IconButton>
          <div className={styles.chatUserBox}>
            <div className={styles.profileBox}>
              {selectedRequest ? (
                <Image
                  src={
                    selectedRequest?.senderProfilePhoto ||
                    '/assets/images/user-default-image-sq.svg'
                  }
                  alt='user profile'
                  width={50}
                  height={50}
                  className={[styles.profileImg, styles.smallRadius].join('')}
                />
              ) : null}
              {selectedRequest?.senderId &&
              selectedRequest?.senderOrganizationId ? (
                <Image
                  src={
                    selectedRequest?.senderOrganizationLogo ||
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
                  {truncateString(selectedRequest?.senderName || '', 20)}
                </Typography>
                <div className={styles.userStatus}>
                  <div
                    className={[
                      styles.statusBox,
                      selectedRequest ? styles[selectedRequest.status] : null
                    ].join(' ')}
                  ></div>
                  <Typography
                    className={styles.statusText}
                    textTransform='capitalize'
                  >
                    {selectedRequest?.status.toLowerCase()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          label='View Details'
          className={[
            styles.viewBtn,
            selectedRequest && !infoTabOpen ? styles.show : null
          ].join(' ')}
          onClick={() => setInfoTabOpen(true)}
        />
      </div>
      {!isLargeScreen ? (
        <CustomDialog
          onClose={() => setInfoTabOpen(false)}
          open={infoTabOpen}
          title='Details'
        >
          <UserRequestDetails />
        </CustomDialog>
      ) : null}
    </>
  )
}

export default TopUserRequestBar

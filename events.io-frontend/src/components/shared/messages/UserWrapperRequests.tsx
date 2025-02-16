import React, { useContext } from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import { MessageContext } from '@/contexts/messageContext';
import { TConnectionRequest } from '@/@types/shared/connection-request';
import { formatIsoDate, getCurrentUser, truncateString } from '@/utils';
import { TimeIcon } from '../SVG-components';
import styles from './styles.module.scss';

type Props = {
  request: TConnectionRequest;
  noBorder?: boolean;
};

const UserWrapperRequests = ({ request, noBorder }: Props) => {
  const { selectedRequest, setSelectedRequest } = useContext(MessageContext);

  const displayProfilePhoto = () => {
    return request?.recipientId !== getCurrentUser()?._id
      ? request?.recipientProfilePhoto
      : request?.senderProfilePhoto;
  };

  const displayName = () => {
    return request?.recipientId !== getCurrentUser()?._id
      ? request?.recipientName
      : request?.senderName;
  };

  const displayOrgPhoto = () => {
    return request?.recipientId !== getCurrentUser()?._id
      ? request?.recipientOrganizationLogo
      : request?.senderOrganizationLogo;
  };

  return (
    <button
      className={[
        styles.userWrapper,
        noBorder ? styles.noBorder : null,
        selectedRequest?._id === request._id ? styles.active : null,
      ].join(' ')}
      onClick={() => setSelectedRequest(request)}
      aria-label="Click to read user request"
      disabled={request?._id === selectedRequest?._id}
    >
      <div className={styles.userBox}>
        <div className={styles.profileBoxRequest}>
          <Image
            src={
              displayProfilePhoto() ||
              '/assets/images/user-default-image-sq.svg'
            }
            alt="user profile"
            width={50}
            height={50}
            className={styles.profileImg}
          />
          {request?.senderOrganizationId || request?.recipientOrganizationId ? (
            <Image
              src={
                displayOrgPhoto() || '/assets/images/user-default-image-sq.svg'
              }
              alt="user profile"
              width={20}
              height={20}
              className={styles.employerLogo}
            />
          ) : null}
          <div className={styles.nameBox}>
            <div className={styles.box}>
              <Typography className={[styles.nameText].join(' ')} noWrap>
                {truncateString(displayName()?.toLowerCase(), 20)}
              </Typography>
              <span className={[styles.chip, styles[request.status]].join(' ')}>
                {request.status}
              </span>
            </div>
            <Typography className={styles.msgText}>
              {truncateString(request?.message, 20)}
            </Typography>
            <div className={styles.timeChip}>
              <TimeIcon />
              <Typography className={styles.timeText}>
                {formatIsoDate(request.dateCreated)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default UserWrapperRequests;

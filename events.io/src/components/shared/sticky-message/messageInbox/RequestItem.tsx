import { MouseEventHandler } from 'react';
import { QueryBuilderOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

import { TConnectionRequest } from '@/@types/shared/connection-request';
import { formatIsoDate, getCurrentUser } from '@/utils';
import Chip2 from '../../Chip2';
import styles from './index.module.scss';

export interface RequestItemProps {
  data: TConnectionRequest;
  onClick: MouseEventHandler<HTMLElement>;
}

type ColorTypes =
  | 'warning'
  | 'success'
  | 'error'
  | 'default'
  | 'primary'
  | 'secondary';

const RequestItem = ({ data, onClick }: RequestItemProps) => {
  const chipColor = {
    pending: 'warning',
    accepted: 'success',
    declined: 'error',
  };

  const displayProfilePhoto = () => {
    return data?.recipientId !== getCurrentUser()?._id
      ? data?.recipientProfilePhoto
      : data?.senderProfilePhoto;
  };

  const displayName = () => {
    return data?.recipientId !== getCurrentUser()?._id
      ? data?.recipientName
      : data?.senderName;
  };

  const displayOrgPhoto = () => {
    return data?.recipientId !== getCurrentUser()?._id
      ? data?.recipientOrganizationLogo
      : data?.senderOrganizationLogo;
  };

  return (
    <Box
      onClick={onClick}
      role="button"
      className={styles.requestItemBox}
      tabIndex={0}
    >
      <Box className={styles.avatarBox}>
        <Avatar
          src={displayProfilePhoto() || '/assets/images/user-default-image.png'}
          alt="UserImage"
          className={styles.mainAvatar}
        />
        {data?.senderOrganizationId || data?.recipientOrganizationId ? (
          <Avatar
            src={displayOrgPhoto() || '/assets/images/user-default-image.png'}
            alt="UserImage"
            className={styles.miniAvatar}
          />
        ) : null}
      </Box>
      <Box flex={1}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography fontSize={14} fontWeight={500} textTransform="capitalize">
            {displayName()?.toLowerCase()}
          </Typography>
          <Chip2
            color={chipColor[data.status as ColorTypes]}
            label={data.status}
          />
        </Box>
        <Typography
          fontSize={12}
          color={'#8D8A95'}
          className={styles['ellipsis-2']}
        >
          {data.message}
        </Typography>
        <Chip2
          color="error"
          label={
            <Box display={'flex'} alignItems={'center'} gap={1} color={'grey'}>
              <QueryBuilderOutlined fontSize="small" />
              {formatIsoDate(data.dateCreated)}
            </Box>
          }
          size="small"
        />
      </Box>
    </Box>
  );
};

export default RequestItem;

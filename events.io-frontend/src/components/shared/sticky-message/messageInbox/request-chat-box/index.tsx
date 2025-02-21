import { MouseEventHandler, useEffect, useState } from 'react';
import {
  BusinessCenterOutlined,
  Close,
  CloseFullscreenOutlined,
  Info,
  // NorthEastOutlined,
  OpenInFullOutlined,
  QueryBuilderOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';

import Chip2 from '@/components/shared/Chip2';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import { socket } from '@/services/socket.service';
import { TConnectionRequest } from '@/@types/shared/connection-request';
import {
  // ConnectionInquiryData,
  ConnectionPaymentStatus,
} from '@/@types/shared/type';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import { getCurrentUser } from '@/utils';
import styles from '../index.module.scss';

export type TChatData = {
  name: string;
  image: string;
  message: string;
  time: string;
};
export interface RequestChatBoxProps {
  onClose: MouseEventHandler<HTMLElement>;
  data: TConnectionRequest;
}
// const ITEMS_PER_PAGE = 10;

const RequestChatBox = ({ onClose, data }: RequestChatBoxProps) => {
  const [loading, setLoading] = useState(false);
  // const [loadingCost, setLoadingCost] = useState(false);
  const { handleOpenChat } = useChatStickyMessageStore();
  const [showInformation, setShowInformation] = useState(true);
  const [expanded, setExpanded] = useState(false);
  // const [enquiryData, setEnquiryData] = useState<ConnectionInquiryData | null>(
  //   null
  // );

  const handleAcceptRequest = async (e: any) => {
    try {
      setLoading(true);
      const payload = {
        connectionId: data._id,
      };
      const response = await socket.emitWithAck('connections:accept', payload);
      if (!response.success) throw new Error(response.description);
      successAlert({ message: response.description });
      setLoading(false);
      onClose(e);
      const copyData = { ...data };
      copyData.recipient = data?.sender;
      copyData.recipientId = data?.senderId;
      copyData.recipientName = data?.senderName;
      copyData.recipientOrganizationId = data?.senderOrganizationId;
      copyData.recipientOrganizationName = data?.senderOrganizationName;
      copyData.recipientOrganizationLogo = data?.senderOrganizationLogo;
      copyData.recipientProfilePhoto = data?.senderProfilePhoto;
      copyData.sender = data?.recipient;
      copyData.senderId = data?.recipientId;
      copyData.senderName = data?.recipientName;
      copyData.senderOrganizationId = data?.recipientOrganizationId;
      copyData.senderOrganizationName = data?.recipientOrganizationName;
      copyData.senderOrganizationLogo = data?.recipientOrganizationLogo;
      copyData.senderProfilePhoto = data?.recipientProfilePhoto;
      handleOpenChat('chat', copyData?._id, copyData);
    } catch (error: any) {
      errorAlert({
        message: error.message,
      });
      setLoading(false);
    }
  };

  const handleDeclineRequest = async (e) => {
    try {
      setLoading(true);
      const payload = {
        connectionId: data._id,
      };
      const response = await socket.emitWithAck('connections:decline', payload);
      setLoading(false);
      if (!response.success) throw new Error(response.description);
      successAlert({ message: response.description });
      onClose(e);
    } catch (error: any) {
      errorAlert({
        message: error.message,
      });
      setLoading(false);
    }
  };

  // const enquireCost = async () => {
  //   try {
  //     setLoadingCost(true);
  //     const response = await socket.emitWithAck('connections:inquiry', {
  //       recipientId: data?.senderId,
  //     });
  //     setEnquiryData(response?.data);
  //     setLoadingCost(false);
  //   } catch (err) {
  //     setLoadingCost(false);
  //   }
  // };

  useEffect(() => {
    // enquireCost();
    return () => {
      socket.removeListener('connections:inquiry');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Paper
      sx={{
        width: expanded ? 600 : 400,
        maxWidth: '100%',
        borderRadius: '10px 10px 0 0',
        boxShadow: '0px 0px 15px 1px #F2F1FF',
        overflow: 'auto',
        padding: 0,
        position: 'relative',
      }}
    >
      <Box height={'100%'} display={'flex'} flexDirection={'column'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{ background: 'white', py: 2, px: 3, borderRadius: 3, gap: 1 }}
        >
          <Box className={styles.requestProfileBox}>
            <Avatar
              src={
                displayProfilePhoto() || '/assets/images/user-default-image.png'
              }
              className={styles.requestProfileMainAvatar}
            />
            {data?.senderOrganizationId || data?.recipientOrganizationId ? (
              <Avatar
                src={
                  displayOrgPhoto() || '/assets/images/user-default-image.png'
                }
                alt="UserImage"
                className={styles.requestProfileMiniAvatar}
              />
            ) : null}
          </Box>
          <Box flex={1} display={'flex'} flexDirection={'column'}>
            <Typography
              fontSize={14}
              fontWeight={600}
              color={'black'}
              textTransform="capitalize"
            >
              {displayName()?.toLowerCase()}
            </Typography>
            <Typography fontSize={12} color={'black'}>
              {data?.status}
            </Typography>
          </Box>

          <Box display={'flex'} gap={2} alignItems={'center'}>
            <IconButton
              sx={{
                background: '#F8F8F8',
                height: 28,
                width: 28,
                '&:hover': { background: 'lightgrey' },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <CloseFullscreenOutlined sx={{ fontSize: 16 }} />
              ) : (
                <OpenInFullOutlined sx={{ fontSize: 16 }} />
              )}
            </IconButton>

            <IconButton
              sx={{
                background: '#F8F8F8',
                height: 32,
                width: 32,
                '&:hover': { background: 'lightgrey' },
              }}
              onClick={onClose}
            >
              <Close sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1 }} />
        </Box>
        <Divider />
        <Box
          sx={{ background: 'white' }}
          display={'flex'}
          flexDirection={'column'}
          flex={1}
          p={2}
        >
          <Box overflow={'auto'} height={expanded ? 450 : 350}>
            <>
              <Box display={'flex'} flexDirection={'row-reverse'} my={1}>
                <Chip2
                  color="error"
                  label={
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={1}
                      color={'grey'}
                    >
                      <QueryBuilderOutlined fontSize="small" />
                      {moment(new Date(data.dateCreated)).format(
                        'Do MMM YYYY, hh:mm A'
                      )}
                    </Box>
                  }
                  size="small"
                />
              </Box>
              <Box display={'flex'} gap={1} py={1}>
                <Box
                  flex={1}
                  sx={{
                    background: '#F2F4FF',
                    borderRadius: '0 10px 10px 10px',
                    padding: 1,
                  }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    Asking About
                  </Typography>
                  <Button
                    startIcon={<BusinessCenterOutlined />}
                    variant="outlined"
                    sx={{
                      borderRadius: 4,
                      color: '#0C27BE',
                      background: 'white',
                      my: 1,
                    }}
                  >
                    {data.reason}
                  </Button>
                  <Typography fontSize={12} color={'#8D8A95'}>
                    {data.message}
                  </Typography>
                </Box>
              </Box>
              {showInformation && data?.senderId !== getCurrentUser()?._id ? (
                <Box
                  border={2}
                  borderColor={'#C6BBFF'}
                  borderRadius={2}
                  mt={2}
                  padding={2}
                  display={'flex'}
                >
                  <Box>
                    <Info sx={{ color: '#7357FF' }} />
                  </Box>
                  <div>
                    <Typography fontSize={12} fontWeight={500}>
                      {data?.paymentStatus ===
                      ConnectionPaymentStatus.SENDER_DEBITED ? (
                        <span>
                          You will earn{' '}
                          {data?.amountCharged ? data?.amountCharged : 0} VSC
                          when you reply to this message.
                        </span>
                      ) : null}
                      You have up to 7 days to respond to this message
                    </Typography>
                    {/* <Button
                      sx={{ color: '#7357FF', mt: 1 }}
                      endIcon={<NorthEastOutlined />}
                    >
                      Learn more
                    </Button> */}
                  </div>
                  <IconButton
                    onClick={() => {
                      setShowInformation(false);
                    }}
                  >
                    <Close />{' '}
                  </IconButton>
                </Box>
              ) : null}
            </>
          </Box>
        </Box>
        <Box
          display={'flex'}
          borderTop={1}
          borderColor={'#ECECED'}
          p={2}
          gap={1}
          alignItems={'center'}
        >
          <>
            {getCurrentUser()?._id !== data?.senderId &&
            data.status === 'pending' ? (
              <>
                <Button
                  sx={{ flex: 1, borderRadius: 2 }}
                  variant="contained"
                  disabled={loading}
                  onClick={handleAcceptRequest}
                >
                  Accept
                </Button>
                <Button
                  disabled={loading}
                  color={'error'}
                  sx={{ flex: 1, borderRadius: 2 }}
                  variant={'outlined'}
                  onClick={handleDeclineRequest}
                >
                  Decline
                </Button>
              </>
            ) : null}
          </>
        </Box>
      </Box>
    </Paper>
  );
};

export default RequestChatBox;

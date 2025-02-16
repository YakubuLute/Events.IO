import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { Attachment, IMessage } from '@/@types/shared/chat';
import styles from '@/styles/messages.module.scss';
import { formatTimeZone, getCurrentUser } from '@/utils';
import FilePreview from '../file-preview/FilePreview';

const SingleMessageCard = ({
  message,
  onClick,
}: {
  message: IMessage;
  onClick: (data: Attachment) => void;
}) => {
  const receiptIcon = {
    sent: (
      <CheckIcon htmlColor="gray" className="text-[12px]" fontSize="inherit" />
    ),
    delivered: (
      <DoneAllIcon
        htmlColor="gray"
        className="text-[12px]"
        fontSize="inherit"
      />
    ),
    read: (
      <DoneAllIcon
        className="text-[12px]"
        fontSize="inherit"
        htmlColor={'green'}
      />
    ),
  };

  const fromMe = message.senderId === getCurrentUser()?._id;

  const returnMessageTypePreview = () => {
    switch (message.type) {
      case 'text':
        return (
          <Typography
            style={{
              borderRadius: fromMe
                ? '16px 16px 0px 16px'
                : '16px 16px 16px 0px',
              color: fromMe ? 'white' : '#110C22',
            }}
            sx={{
              backgroundColor: fromMe ? '#2b46d9' : '#e7e9f9',
            }}
            // color={fromMe ? 'white' : '#110C22'}
            className={styles.mainChatItemText}
          >
            {message?.message}
          </Typography>
        );
      case 'attachment':
        return (
          <div
            className={`${
              fromMe
                ? `${styles.attachmentTo}  bg-[#2B46D9]`
                : `${styles.attachmentFrom} bg-[#E7E9F9]`
            }`}
          >
            <div className={`p-1 flex justify-center items-center  `}>
              <FilePreview
                fileType={message.attachment.mimetype}
                fileUrl={message.attachment.url}
                onClick={onClick}
              />
            </div>
            {message.message && (
              <Typography
                style={{
                  color: fromMe ? 'white' : '#110C22',
                }}
                className={styles.mainChatItemText}
              >
                {message?.message}
              </Typography>
            )}
          </div>
        );
      case 'voicenote':
        return (
          <FilePreview
            onClick={onClick}
            fileType={message.attachment.mimetype}
            fileUrl={message.attachment.url}
          />
        );
      default:
        <Typography
          sx={{
            backgroundColor: fromMe ? '#2b46d9' : '#e7e9f9',
            borderRadius: fromMe ? '16px 16px 0px 16px' : '16px 16px 16px 0px',
          }}
          className={styles.mainChatItemText}
        >
          {message?.message}
        </Typography>;
    }
  };
  return (
    <>
      <Box
        sx={{
          alignSelf: !fromMe ? 'flex-start' : 'flex-end',

          flexDirection: !fromMe ? 'row' : 'row-reverse',
        }}
        className={styles.mainChatItemContainer}
      >
        <Box>
          {/* <Avatar
            src={
              message.senderProfilePhoto ||
              '/assets/images/user-default-image.png'
            }
            sx={{ width: 20, height: 20, borderRadius: '100px' }}
            alt="UserImage"
          /> */}
        </Box>
        <Box className={styles.mainChatItemTextContainer}>
          {returnMessageTypePreview()}

          <div
            className={`flex items-centers space-x-2 ${
              fromMe ? 'justify-end' : 'justify-start'
            }`}
          >
            <Typography
              sx={{
                textAlign: !fromMe ? 'start' : 'end',
              }}
              className={styles.mainChatItemTime}
            >
              {formatTimeZone(message?.timestamp)}
            </Typography>
            {fromMe && receiptIcon[message.receipt]}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default SingleMessageCard;

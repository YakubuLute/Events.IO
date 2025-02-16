import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Typography } from '@mui/material';

import { Attachment, IMessage } from '@/@types/shared/chat';
import { formatTimeZone, getCurrentUser } from '@/utils';
import FilePreview from '../file-preview/FilePreview';
import styles from './styles.module.scss';

type Props = {
  message: IMessage;
  onClick: (data: Attachment) => void;
};

const receiptIcon = {
  sent: (
    <CheckIcon
      className={[styles.receiptIcon, styles.sent].join(' ')}
      fontSize="inherit"
    />
  ),
  delivered: (
    <DoneAllIcon className={[styles.receiptIcon, styles.delivered].join(' ')} />
  ),
  read: <DoneAllIcon className={[styles.receiptIcon, styles.read].join(' ')} />,
};

const SingleMessageThread = ({ message, onClick }: Props) => {
  const renderMessageBox = () => {
    switch (message.type) {
      case 'text':
        return <TextChat message={message} onClick={onClick} />;
      case 'attachment':
        return <AttachmentChat message={message} onClick={onClick} />;
    }
  };

  return <>{renderMessageBox()}</>;
};

const TextChat = ({ message }: Props) => {
  const fromMe = message.senderId === getCurrentUser()?._id;

  return (
    <div
      className={[styles.msgThreadWrapper, fromMe ? styles.fromMe : null].join(
        ' '
      )}
    >
      <div className={styles.msgThreaBox}>
        <div
          className={[styles.msgBox, fromMe ? styles.fromMe : null].join(' ')}
        >
          <Typography
            className={[styles.msgText, fromMe ? styles.fromMe : null].join(
              ' '
            )}
          >
            {message?.message}
          </Typography>
        </div>
        <div
          className={[styles.timeBox, fromMe ? styles.fromMe : null].join(' ')}
        >
          <Typography component="span" className={styles.time}>
            {formatTimeZone(message?.timestamp)}
          </Typography>
          {fromMe ? receiptIcon[message.receipt] : null}
        </div>
      </div>
    </div>
  );
};

const AttachmentChat = ({ message, onClick }: Props) => {
  const fromMe = message.senderId === getCurrentUser()?._id;
  return (
    <div
      className={[styles.msgThreadWrapper, fromMe ? styles.fromMe : null].join(
        ' '
      )}
    >
      <div className={styles.msgThreaBox}>
        <div
          className={[styles.attachBox, fromMe ? styles.fromMe : null].join(
            ' '
          )}
        >
          <FilePreview
            fileType={message.attachment.mimetype}
            fileUrl={message.attachment.url}
            onClick={onClick}
          />
        </div>
        {message.message ? (
          <div
            className={[styles.msgBox, fromMe ? styles.fromMe : null].join(' ')}
          >
            <Typography
              className={[styles.msgText, fromMe ? styles.fromMe : null].join(
                ' '
              )}
            >
              {message?.message}
            </Typography>
          </div>
        ) : null}

        <div
          className={[styles.timeBox, fromMe ? styles.fromMe : null].join(' ')}
        >
          <Typography component="span" className={styles.time}>
            {formatTimeZone(message?.timestamp)}
          </Typography>
          {fromMe ? receiptIcon[message.receipt] : null}
        </div>
      </div>
    </div>
  );
};

export default SingleMessageThread;

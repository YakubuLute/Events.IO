import React, { useContext } from 'react';
import { IconButton, Typography } from '@mui/material';

import { MessageContext } from '@/contexts/messageContext';
import { CustomButton } from '../Button/Button';
import XIcon from '../SVG-components/XIcon';
import styles from './styles.module.scss';

const ChatNotice = () => {
  const { setShowAttentionModal, setStep } = useContext(MessageContext);

  const onContinueBtnClick = () => {
    setStep('submit');
    setShowAttentionModal(false);
  };

  return (
    <div className={styles.chatNoticeBox}>
      <div className={styles.attentionModal}>
        <div className={styles.topBox}>
          <Typography className={styles.text}>Attention</Typography>
          <IconButton
            className={styles.closeBtn}
            onClick={() => setShowAttentionModal(false)}
          >
            <XIcon />
          </IconButton>
        </div>
        <div className={styles.infoBox}>
          <Typography className={styles.noticeText}>
            Ending this chat session will result in the removal of your current
            connection. To reconnect with this person in the future, you will be
            required to pay the contact fee once again.
          </Typography>
        </div>
        <div className={styles.btnGroup}>
          <CustomButton
            label="Continue"
            className={[styles.btn, styles.continue].join(' ')}
            fullWidth
            onClick={onContinueBtnClick}
          />
          <CustomButton
            label="Cancel"
            className={[styles.btn, styles.cancel].join(' ')}
            fullWidth
            onClick={() => setShowAttentionModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatNotice;

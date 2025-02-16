import React, { useContext, useState } from 'react';
import { Rating, Typography } from '@mui/material';

import { socket } from '@/services/socket.service';
import { MessageContext } from '@/contexts/messageContext';
import { ReviewDTO, ReviewResponse, TConversation } from '@/@types/shared/chat';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import { formatString } from '@/utils';
import { CustomButton } from '../Button/Button';
import { errorAlert } from '../toastAlert';
import styles from './styles.module.scss';

const AddChatReview = () => {
  const { selectedChat, setShowSuccessModal, setShowAttentionModal, setStep } =
    useContext(MessageContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const {
    setConversations,
    conversations,
    setActiveChatBoxes,
    activeChatBoxes,
  } = useChatStickyMessageStore();

  const onSubmitReview = async () => {
    setLoading(true);
    try {
      const payload: ReviewDTO = {
        connectionId: selectedChat?._id || '',
        rating,
        review,
      };
      const response: ReviewResponse = await socket.emitWithAck(
        'messages:chats:close',
        payload
      );
      setLoading(false);
      setReview('');
      setRating(0);
      setSuccess(response.success);
      setShowSuccessModal(response.success);

      if (response.success === true) {
        const copyChats = [...conversations];
        const findChat = copyChats.find(
          (chat) => chat?._id === selectedChat?._id
        );
        if (findChat) {
          const cChat = { ...findChat };
          copyChats.filter((c) => c?._id !== findChat?._id);
          cChat.isConnected = false;
          cChat.isDeletedUser = false;
          copyChats.push(cChat);
          setConversations(copyChats);
          const cActiveBoxes = [...activeChatBoxes];
          if (cActiveBoxes[0]?.type === 'chat') {
            const fdata = cActiveBoxes[0]?.data as TConversation;
            const cFilter = { ...fdata };
            cFilter.isConnected = false;
            cFilter.isDeletedUser = false;
            cActiveBoxes[0].data = cFilter;
            setActiveChatBoxes(cActiveBoxes);
          }
        }
      }

      if (response.success === false) {
        errorAlert({
          message: response.description,
        });
      }
    } catch (err: any) {
      setLoading(false);
      errorAlert({
        message: err.message,
      });
    }
  };

  const onCancelBtnClick = () => {
    setStep('start');
    setShowAttentionModal(false);
  };

  return (
    <>
      <div className={styles.reviewBox}>
        <Typography className={styles.title}>Leave a Review</Typography>
        <Typography className={styles.message}>
          Was <strong>{formatString(selectedChat?.recipientName || '')}</strong>{' '}
          helpful. Rate your experience
        </Typography>
        <div className={styles.form}>
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue!);
            }}
            disabled={isSuccess}
            sx={{
              width: 'fit-content',
            }}
          />
          <textarea
            className={styles.textarea}
            rows={10}
            placeholder="Write review"
            onChange={(e) => setReview(e.target.value)}
            disabled={isSuccess}
          />

          <div className={styles.btnGroup}>
            <CustomButton
              fullWidth
              variant="contained"
              disabled={loading || isSuccess}
              onClick={onSubmitReview}
              label="Submit"
              className={styles.reviewBtn}
            />
            <CustomButton
              fullWidth
              variant="contained"
              onClick={onCancelBtnClick}
              label="Cancel"
              className={[styles.btn, styles.cancel].join(' ')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChatReview;

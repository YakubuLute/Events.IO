import React, { useState } from 'react';
import { Box, Rating, Typography } from '@mui/material';

import { CustomButton } from '@/components/shared/Button/Button';
import CustomTextArea from '@/components/shared/customTextArea';
import { errorAlert } from '@/components/shared/toastAlert';
import { socket } from '@/services/socket.service';
import {
  ReviewDTO,
  ReviewResponse,
  TConversation,
  TStep,
} from '@/@types/shared/chat';
import { useChatStickyMessageStore } from '@/store/shared/useChatMessageStore';
import { formatString } from '@/utils';
import ReviewSuccess from './ReviewSuccess';

type Props = {
  chatData: TConversation;
  setStep: (step: TStep) => void;
};

const ReviewBox = ({ chatData, setStep }: Props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
        connectionId: chatData?._id,
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
        const findChat = copyChats.find((chat) => chat?._id === chatData?._id);
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

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setStep('start');
  };

  return (
    <>
      <Box px={2}>
        <Typography fontSize={18} fontWeight={600} my={2}>
          Leave a Review
        </Typography>
        <Typography fontWeight={500} my={1}>
          Was {formatString(chatData?.recipientName)} helpful. Rate your
          experience
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue!);
          }}
          disabled={isSuccess}
        />
        <CustomTextArea
          rows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write review"
          disabled={isSuccess}
        />
        <CustomButton
          fullWidth
          variant="contained"
          sx={{ borderRadius: 2, mt: 3 }}
          disabled={loading || isSuccess}
          onClick={onSubmitReview}
          label="Submit"
        />
      </Box>
      <ReviewSuccess
        onCloseSuccessModal={onCloseSuccessModal}
        showSuccessModal={showSuccessModal}
      />
    </>
  );
};

export default ReviewBox;

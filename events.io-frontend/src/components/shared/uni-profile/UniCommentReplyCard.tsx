import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { onAxiosError } from '@/utils/shared/axiosError';
import { CustomButton } from '@/components/shared';
import { DislikesIcon, LikesIcon } from '@/components/shared/SVG-components';
import KhebabMenuIcon from '@/components/shared/SVG-components/khebabMenuIcon';
import {
  CommentType,
  SchoolCommentResponseDTO,
  useCreateSchoolEventReply,
  useCreateSchoolUpdateReply,
  useDeleteSchoolEventComment,
  useDeleteSchoolUpdateComment,
  useDislikeSchoolEventComment,
  useDislikeSchoolUpdateComment,
  useLikeSchoolEventComment,
  useLikeSchoolUpdateComment,
  useUpdateSchoolEventComment,
  useUpdateSchoolUpdateComment,
} from '@/hooks/university';
import { ErrorResponse } from '@/@types/shared/type';
import { useAlumniProfileStore } from '@/store/university/useAlumniProfileStore';
import { formatTimeZone } from '@/utils';
import CommentAction from './CommentAction';
import EditComment from './EditComment';
import PostCommentForm from './PostCommentForm';
import styles from './styles.module.scss';

type Props = {
  comment: SchoolCommentResponseDTO;
  commentType: CommentType;
  highlightedComment: string;
  setHighlightedComment: (value: string) => void;
};

const UniCommentReplyCard = ({
  comment,
  commentType,
  highlightedComment,
  setHighlightedComment,
}: Props) => {
  const queryClient = useQueryClient();
  const { setShowProfileModal, setAlumniId } = useAlumniProfileStore();
  const [isFocused, setFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openActionMenu = Boolean(anchorEl);
  const [isEdit, setEdit] = useState(false);
  const [_, setError] = useState('');
  const isUpdate = commentType === 'updateId';
  const [commentBody, setCommentBody] = useState(comment?.comment);
  const [replyComment, setReplyComment] = useState(false);
  const pathname = usePathname();

  const { mutate: deleteUpdateCommentReply } = useDeleteSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolUpdateReplies'],
      });
      setAnchorEl(null);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: deleteEventCommentReply } = useDeleteSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolEventReplies'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onDeleteCommentReply = () => {
    if (isUpdate) {
      const params = {
        updateId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      deleteUpdateCommentReply(params);
    } else {
      const params = {
        eventId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      deleteEventCommentReply(params);
    }
  };

  const {
    mutate: editUpdateCommentReply,
    isPending: isEditingUpdateCommentReply,
  } = useUpdateSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolUpdateReplies'],
      });
      setEdit(false);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const {
    mutate: editEventCommentReply,
    isPending: isEditingEventCommentReply,
  } = useUpdateSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolEventReplies'],
      });
      setEdit(false);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onEditCommentReply = () => {
    const payload = { comment: commentBody };
    if (isUpdate) {
      const params = {
        updateId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      editUpdateCommentReply({ params, payload });
    } else {
      const params = {
        eventId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      editEventCommentReply({ params, payload });
    }
  };

  const { mutate: likeUpdateCommentReply } = useLikeSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolUpdateReplies'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: likeEventCommentReply } = useLikeSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolEventReplies'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onLikeComment = () => {
    if (isUpdate) {
      likeUpdateCommentReply({
        commentId: comment._id,
        updateId: comment[commentType as CommentType] as string,
      });
    } else {
      likeEventCommentReply({
        commentId: comment._id,
        eventId: comment[commentType as CommentType] as string,
      });
    }
  };

  const { mutate: unlikeUpdateComment } = useDislikeSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolUpdateReplies'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: unlikeEventComment } = useDislikeSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchoolEventReplies'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onUnlikeComment = () => {
    if (isUpdate) {
      unlikeUpdateComment({
        commentId: comment._id,
        updateId: comment[commentType as CommentType] as string,
      });
    } else {
      unlikeEventComment({
        commentId: comment._id,
        eventId: comment[commentType as CommentType] as string,
      });
    }
  };

  const { mutate: replyUpdateComment } = useCreateSchoolUpdateReply({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSchoolUpdateReplies'] });
      setReplyComment(false);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: replyEventComment } = useCreateSchoolEventReply({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSchoolEventReplies'] });
      setReplyComment(false);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onReplyComment = (body: string) => {
    const payload = { comment: body };
    if (isUpdate) {
      replyUpdateComment({
        params: {
          commentId: comment._id,
          updateId: comment[commentType as CommentType] as string,
        },
        payload,
      });
    } else {
      replyEventComment({
        params: {
          commentId: comment._id,
          eventId: comment[commentType as CommentType] as string,
        },
        payload,
      });
    }
  };

  useEffect(() => {
    if (highlightedComment === comment?._id) {
      setFocused(true);
      setTimeout(() => {
        setFocused(false);
        setHighlightedComment('');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedComment]);

  return (
    <>
      <div className={[styles.commentCard, styles.reply].join(' ')}>
        <div className={styles.userSection}>
          <div className={styles.commenterBox}>
            <Image
              src={
                comment?.commenterProfilePhoto ||
                '/assets/images/user-default-image-cir.svg'
              }
              alt="Commenter Profile"
              width={35}
              height={35}
            />
            <div className={styles.commenterHeader}>
              <button
                className={styles.watchProfileBtn}
                onClick={() => {
                  setAlumniId(comment?.commenterId);
                  setShowProfileModal(true);
                }}
              >
                <Typography component="h4">
                  {comment?.commenterFullName}
                </Typography>
              </button>
              <Typography component="h6">{comment?.designation}</Typography>
            </div>
          </div>
          <div className={styles.actionBox}>
            <Typography component="p" className={styles.dateText}>
              {moment(comment?.dateCreated).format('MMM D, YYYY')}{' '}
              <span>&middot;</span> {formatTimeZone(comment?.dateCreated)}
            </Typography>
            <IconButton
              aria-label="Action Button"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              id="basic-button"
              aria-controls={openActionMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openActionMenu ? 'true' : undefined}
            >
              <KhebabMenuIcon />
            </IconButton>
          </div>
        </div>
        {comment?.quote ? (
          <div className={styles.quotedBox}>
            <Link
              href={`${pathname}#${comment?.quotedReplyId}`}
              passHref
              onClick={() => setHighlightedComment(comment.quotedReplyId!)}
            >
              <Typography className={styles.quotedText}>
                {comment.quote}
              </Typography>
            </Link>
          </div>
        ) : null}
        {!isEdit ? (
          <Typography
            className={[
              styles.descriptionText,
              isFocused ? styles.focused : null,
            ].join(' ')}
          >
            {comment?.comment}
          </Typography>
        ) : (
          <EditComment
            commentBody={commentBody}
            onCancel={() => setEdit(false)}
            onChange={setCommentBody}
            onSave={onEditCommentReply}
            isLoading={
              isEditingUpdateCommentReply || isEditingEventCommentReply
            }
          />
        )}
        <div className={styles.commentFooter}>
          <div className={styles.likeBox}>
            <div className={styles.likeWrapper}>
              <IconButton
                className={[
                  styles.likeBtn,
                  comment.liked ? styles.isLiked : null,
                ].join(' ')}
                onClick={onLikeComment}
                disabled={comment.liked}
              >
                <LikesIcon />
              </IconButton>
              <Typography component="span">{comment?.likes}</Typography>
            </div>
            <div className={styles.likeWrapper}>
              <IconButton
                className={[
                  styles.likeBtn,
                  comment.disliked ? styles.isUnLiked : null,
                ].join(' ')}
                onClick={onUnlikeComment}
                disabled={comment.disliked}
              >
                <DislikesIcon />
              </IconButton>
              <Typography component="span">{comment?.dislikes}</Typography>
            </div>
          </div>
          <CustomButton
            variant="text"
            label="Reply"
            className={styles.replyBtn}
            disabled={replyComment}
            onClick={() => setReplyComment(true)}
          />
        </div>
        {replyComment ? (
          <PostCommentForm
            handleSubmit={onReplyComment}
            type="reply"
            onClose={() => setReplyComment(false)}
          />
        ) : null}
      </div>
      <CommentAction
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        open={openActionMenu}
        onEditComment={() => setEdit(true)}
        onDeleteComment={onDeleteCommentReply}
      />
    </>
  );
};

export default UniCommentReplyCard;

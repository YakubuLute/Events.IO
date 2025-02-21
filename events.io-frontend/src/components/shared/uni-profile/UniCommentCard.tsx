import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconButton, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { onAxiosError } from '@/utils/shared/axiosError';
import { CustomButton } from '@/components/shared';
import { DislikesIcon, LikesIcon } from '@/components/shared/SVG-components';
import KhebabMenuIcon from '@/components/shared/SVG-components/khebabMenuIcon';
import {
  CommentType,
  queryParamsType,
  SchoolCommentResponseDTO,
  useCreateSchoolEventReply,
  useCreateSchoolUpdateReply,
  useDeleteSchoolEventComment,
  useDeleteSchoolUpdateComment,
  useDislikeSchoolEventComment,
  useDislikeSchoolUpdateComment,
  useGetSchoolEventReplies,
  useGetSchoolUpdateReplies,
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
import UniCommentReplyCard from './UniCommentReplyCard';

type Props = {
  comment: SchoolCommentResponseDTO;
  commentType: CommentType;
  highlightedComment: string;
  setHighlightedComment: (value: string) => void;
  filterDTO: queryParamsType;
};

const UniCommentCard = ({
  comment,
  commentType,
  highlightedComment,
  setHighlightedComment,
  filterDTO,
}: Props) => {
  const queryClient = useQueryClient();
  const { setShowProfileModal, setAlumniId } = useAlumniProfileStore();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openActionMenu = Boolean(anchorEl);
  const [commentBody, setCommentBody] = useState(comment?.comment);
  const [isEdit, setEdit] = useState(false);
  const isUpdate = commentType === 'updateId';
  const [isFocused, setFocused] = useState(false);
  const [_, setError] = useState('');
  const [replyComment, setReplyComment] = useState(false);

  const { data: updateCommentRepliesData } = useGetSchoolUpdateReplies(
    comment[commentType as CommentType] as string,
    comment?._id
  );

  const { data: eventCommentRepliesData } = useGetSchoolEventReplies(
    comment[commentType as CommentType] as string,
    comment?._id
  );

  const commentReplies = isUpdate
    ? updateCommentRepliesData?.items
    : eventCommentRepliesData?.items;

  const { mutate: editUpdateComment, isPending: isEditingUpdateComment } =
    useUpdateSchoolUpdateComment({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getSchoolUpdateComments', filterDTO, 'comments'],
        });
        setEdit(false);
      },
      onError: (error: ErrorResponse) => {
        onAxiosError(error, setError, true);
      },
    });

  const { mutate: editEventComment, isPending: isEditingEventComment } =
    useUpdateSchoolEventComment({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getSchoolEventComments', filterDTO, 'comments'],
        });
        setEdit(false);
      },
      onError: (error: ErrorResponse) => {
        onAxiosError(error, setError, true);
      },
    });

  const onEditComment = () => {
    const payload = { comment: commentBody };
    if (isUpdate) {
      const params = {
        updateId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      editUpdateComment({ params, payload });
    } else {
      const params = {
        eventId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      editEventComment({ params, payload });
    }
  };

  const { mutate: deleteUpdateComment } = useDeleteSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolUpdateComments', filterDTO, 'comments'],
      });
      setAnchorEl(null);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: deleteEventComment } = useDeleteSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolEventComments', filterDTO, 'comments'],
      });
      setAnchorEl(null);
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onDeleteComment = () => {
    if (isUpdate) {
      const params = {
        updateId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      deleteUpdateComment(params);
    } else {
      const params = {
        eventId: comment[commentType as CommentType] as string,
        commentId: comment._id,
      };
      deleteEventComment(params);
    }
  };

  const { mutate: likeUpdateComment } = useLikeSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolUpdateComments', filterDTO, 'comments'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: likeEventComment } = useLikeSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolEventComments', filterDTO, 'comments'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const onLikeComment = () => {
    if (isUpdate) {
      likeUpdateComment({
        commentId: comment._id,
        updateId: comment[commentType as CommentType] as string,
      });
    } else {
      likeEventComment({
        commentId: comment._id,
        eventId: comment[commentType as CommentType] as string,
      });
    }
  };

  const { mutate: unlikeUpdateComment } = useDislikeSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolUpdateComments', filterDTO, 'comments'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const { mutate: unlikeEventComment } = useDislikeSchoolEventComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolEventComments', filterDTO, 'comments'],
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
      <div className={[styles.commentCard].join(' ')}>
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
            onSave={onEditComment}
            isLoading={isEditingUpdateComment || isEditingEventComment}
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
              >
                <DislikesIcon />
              </IconButton>
              <Typography component="span">{comment?.dislikes}</Typography>
            </div>
            {commentReplies && commentReplies.length >= 1 ? (
              <Typography className={styles.replyText}>
                {commentReplies.length}{' '}
                {commentReplies.length === 1 ? 'Reply' : 'Replies'}
              </Typography>
            ) : null}
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
        {commentReplies && commentReplies.length
          ? commentReplies.map((reply) => (
              <UniCommentReplyCard
                key={reply._id}
                comment={reply}
                commentType={commentType}
                highlightedComment={highlightedComment}
                setHighlightedComment={setHighlightedComment}
              />
            ))
          : null}
      </div>
      <CommentAction
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        open={openActionMenu}
        onEditComment={() => setEdit(true)}
        onDeleteComment={onDeleteComment}
      />
    </>
  );
};

export default UniCommentCard;

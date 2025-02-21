import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { IconButton, Typography } from '@mui/material';

import CancelIcon from '@/components/shared/SVG-components/CancelIcon';
import PaperPlaneIcon from '@/components/shared/SVG-components/PaperPlaneIcon';
import { useGetUniversityStaffProfile } from '@/hooks/university';
import CommenterSkeleton from './skeletons/CommenterSkeleton';
import styles from './styles.module.scss';

type Props = {
  type: 'comment' | 'reply';
  handleSubmit: (value: string) => void;
  onClose?: () => void;
};

const PostCommentForm = ({ type, handleSubmit, onClose }: Props) => {
  const [comment, setComment] = useState('');

  const { data: profileData, isPending: loadingProfile } =
    useGetUniversityStaffProfile();

  const formTitle = type === 'comment' ? 'Post Comment' : 'Reply to Comment';
  const placeholder =
    type === 'comment' ? 'Write a comment...' : 'Write a reply...';

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(comment);
    setComment('');
  };

  return (
    <form className={styles.commentForm} onSubmit={onSubmit}>
      {type === 'reply' ? (
        <IconButton
          aria-label="Close Reply Form"
          className={styles.closeBtn}
          onClick={onClose}
        >
          <CancelIcon />
        </IconButton>
      ) : null}
      {loadingProfile ? (
        <CommenterSkeleton />
      ) : profileData ? (
        <div className={styles.commenterBox}>
          <Image
            src={
              profileData?.profilePhoto ||
              '/assets/images/user-default-image-cir.svg'
            }
            alt="Commenter Profile"
            width={35}
            height={35}
          />
          <div className={styles.commenterHeader}>
            <Typography component="h4">{formTitle}</Typography>
          </div>
        </div>
      ) : null}
      <div className={styles.commentBox}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <IconButton
          aria-label="Submit Comment"
          classes={{ root: styles.commentBtn, disabled: styles.disbled }}
          type="submit"
          disabled={comment.replace(/<(.|\n)*?>/g, '').trim() === ''}
        >
          <PaperPlaneIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default PostCommentForm;

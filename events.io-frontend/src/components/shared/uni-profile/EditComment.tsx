import React from 'react';

import { CustomButton } from '@/components/shared';
import styles from './styles.module.scss';

type Props = {
  onCancel: () => void;
  commentBody: string;
  onSave: () => void;
  onChange: (value: string) => void;
  isLoading: boolean;
};

const EditComment = ({
  commentBody,
  onCancel,
  onChange,
  onSave,
  isLoading,
}: Props) => {
  return (
    <div className={styles.editCommentContainer}>
      <textarea
        placeholder="Edit your comment"
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        value={commentBody}
      />
      <div className={styles.actionArea}>
        <CustomButton
          label="Cancel"
          variant="outlined"
          className={[styles.actionBtn, styles.cancel].join(' ')}
          onClick={onCancel}
        />
        <CustomButton
          label="Update"
          variant="contained"
          className={[styles.actionBtn, styles.save].join(' ')}
          disabled={
            isLoading || commentBody?.replace(/<(.|\n)*?>/g, '').trim() === ''
          }
          isLoading={isLoading}
          onClick={onSave}
        />
      </div>
    </div>
  );
};

export default EditComment;

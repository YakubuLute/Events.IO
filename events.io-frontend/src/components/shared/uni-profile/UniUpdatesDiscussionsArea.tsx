import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { onAxiosError } from '@/utils/shared/axiosError';
import { PaginationRounded } from '@/components/shared';
import EmptyBox from '@/components/shared/empty';
import {
  queryParamsType,
  SchoolCommentResponseData,
  useCreateSchoolUpdateComment,
} from '@/hooks/university';
import { ErrorResponse } from '@/@types/shared/type';
import PostCommentForm from './PostCommentForm';
import UniUpdateCommentCardSkeleton from './skeletons/UniUpdateCommentCardSkeleton';
import styles from './styles.module.scss';
import UniCommentCard from './UniCommentCard';

type Props = {
  commentsData: SchoolCommentResponseData | undefined;
  loading: boolean;
  uid: string;
  filterDTO: queryParamsType;
  setFilterDTO: (value: queryParamsType) => void;
};

const UniUpdatesDiscussionsArea = ({
  commentsData,
  loading,
  uid,
  filterDTO,
  setFilterDTO,
}: Props) => {
  const queryClient = useQueryClient();
  const [_, setError] = useState('');
  const [highlightedComment, setHighlightedComment] = useState('');

  const { mutate: postComment } = useCreateSchoolUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSchoolUpdateComments', filterDTO, 'comments'],
      });
    },
    onError: (error: ErrorResponse) => {
      onAxiosError(error, setError, true);
    },
  });

  const handleSubmitComment = (comment: string) => {
    const payload = { comment };
    const params = { updateId: uid };
    postComment({ params, payload });
  };

  return (
    <div className={styles.updatesContainer}>
      <Typography className={styles.titleText}>Discussions</Typography>
      <PostCommentForm type="comment" handleSubmit={handleSubmitComment} />
      {loading ? (
        Array.from({ length: 4 })
          .fill('')
          .map((_, idx) => <UniUpdateCommentCardSkeleton key={idx} />)
      ) : commentsData && commentsData.items.length ? (
        commentsData.items.map((comment) => (
          <UniCommentCard
            key={comment._id}
            comment={comment}
            commentType="updateId"
            highlightedComment={highlightedComment}
            setHighlightedComment={setHighlightedComment}
            filterDTO={filterDTO}
          />
        ))
      ) : (
        <EmptyBox message="Comments will show here" />
      )}

      {commentsData && commentsData.totalPages > 1 ? (
        <div className="pagination-container">
          <PaginationRounded
            count={commentsData?.totalPages || 0}
            siblingCount={1}
            variant="outlined"
            shape="rounded"
            page={commentsData?.currentPage || 0}
            onChange={(_, page) => {
              setFilterDTO({
                ...filterDTO,
                page: page,
              });
            }}
            sx={{
              '& .Mui-selected': {
                backgroundColor: '#0b2fb6 !important',
                color: 'white !important',
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UniUpdatesDiscussionsArea;

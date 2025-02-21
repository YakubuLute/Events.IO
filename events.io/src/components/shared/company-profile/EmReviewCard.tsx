import React from 'react';
import { StarRounded } from '@mui/icons-material';
import { Rating, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import { CustomButton } from '@/components/shared';
import ReportFlagIcon from '@/components/shared/SVG-components/ReportFlagIcon';
// import ShareIcon from '@/components/shared/SVG-components/ShareIcon';
import SmileyFaceIcon from '@/components/shared/SVG-components/SmileyFaceIcon';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import {
  useReportCandidateEmployerReview,
  useUpdateCandidateEmployerReviewHelpful,
} from '@/hooks/candidate';
import {
  EmployersEmployeeCategories,
  TEmployerReviewItem,
  TEmployerReviewPayload,
} from '@/@types/employer/employer';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import styles from './styles.module.scss';

type Props = {
  review: TEmployerReviewItem;
  filterDTO: TEmployerReviewPayload;
  employerId: string;
  allowMarkAsHelpful?: boolean;
};

const EmReviewCard = ({ review, filterDTO, employerId, allowMarkAsHelpful = true }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: markReviewHelpful, isPending: isSubmitting } =
    useUpdateCandidateEmployerReviewHelpful({
      onSuccess: (data: APISuccessResponse) => {
        queryClient.invalidateQueries({
          queryKey: ['getCandidateEmployerReviews', filterDTO],
        });
        successAlert({ message: data?.message });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const onMarkReviewHelpful = () => {
    markReviewHelpful({ id: employerId, reviewId: review?._id });
  };

  const { mutate: reportReview, isPending: isReporting } =
    useReportCandidateEmployerReview({
      onSuccess: (data: APISuccessResponse) => {
        queryClient.invalidateQueries({
          queryKey: ['getCandidateEmployerReviews', filterDTO],
        });
        successAlert({ message: data?.message });
      },
      onError: (error: ErrorResponse) => {
        errorAlert({ message: decodeAxiosError(error) });
      },
    });

  const onReportReview = () => {
    reportReview({ id: employerId, reviewId: review?._id });
  };

  const renderStatus = () => {
    switch (review.employeeCategory) {
      case EmployersEmployeeCategories.CURRENT_EMPLOYEE:
        return (
          <Typography className={styles.emStatusBox} component="span">
            Current Employee,{' '}
            {review?.employmentStartDate
              ? moment(new Date(review?.employmentStartDate)).format(
                  'MMM, YYYY'
                ) + ' - Present'
              : 'N/A'}
          </Typography>
        );
      case EmployersEmployeeCategories.PAST_EMPLOYEE:
        return (
          <Typography className={styles.emStatusBox} component="span">
            Former Employee,{' '}
            {review?.employmentStartDate
              ? moment(new Date(review?.employmentStartDate)).format(
                  'MMM, YYYY'
                ) +
                ' - ' +
                moment(new Date(review?.employmentEndDate)).format('MMM, YYYY')
              : 'N/A'}
          </Typography>
        );
    }
  };

  return (
    <div className={styles.emReviewCard}>
      {renderStatus()}
      <div className={styles.expressionWrapper}>
        <div className={styles.ratingWrapper}>
          <Typography className={styles.reviewTitle}>
            {review?.headline}
          </Typography>
          <Rating
            name="rate"
            value={review?.rating}
            emptyIcon={<StarRounded className={styles.ratingStarEmpty} />}
            icon={<StarRounded className={styles.ratingStarFilled} />}
            precision={0.1}
          />
        </div>
        <Typography className={styles.periodText}>
          {moment(new Date(review?.dateCreated)).format('MMM DD, YYYY')} -{' '}
          {review?.employmentLocation?.city || 'N/A'},{' '}
          {review?.employmentLocation?.country || 'N/A'}
        </Typography>
      </div>
      <div className={styles.contentBox}>
        <Typography className={styles.title}>Pros</Typography>
        <Typography className={styles.reviewText}>
          {review?.pros || 'No Content'}
        </Typography>
      </div>
      <div className={styles.contentBox}>
        <Typography className={styles.title}>Cons</Typography>
        <Typography className={styles.reviewText}>
          {review?.cons || 'No Content'}
        </Typography>
      </div>
      {review?.advice ? (
        <div className={styles.contentBox}>
          <Typography className={styles.title}>
            Advice for management
          </Typography>
          <Typography className={styles.reviewText}>
            {review?.advice || 'No Content'}
          </Typography>
        </div>
      ) : null}
      <div className={styles.divider}></div>
      <Typography className={styles.footerText}>
        {review?.helpfulCount}{' '}
        {review?.helpfulCount === 1 ? 'person' : 'people'} found this review
        helpful
      </Typography>
      <div className={styles.btnGroup}>
        <div className={styles.subBtnGroup}>
        {allowMarkAsHelpful ? (
          <CustomButton
            label="Helpful"
            variant="outlined"
            startIcon={<SmileyFaceIcon />}
            className={[
              styles.btn,
              review?.hasMarkedReviewAsHelpful ? styles.helped : styles.helpful,
            ].join(' ')}
            onClick={onMarkReviewHelpful}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        ) : null}

          {/* <CustomButton
            label="Share"
            variant="text"
            startIcon={<ShareIcon />}
            className={styles.shareBtn}
          /> */}
        </div>
        <CustomButton
          label="Report"
          variant="outlined"
          startIcon={<ReportFlagIcon />}
          className={[styles.btn, styles.reportBtn].join(' ')}
          onClick={onReportReview}
          isLoading={isReporting}
          disabled={isReporting || review?.hasReported}
        />
      </div>
    </div>
  );
};

export default EmReviewCard;

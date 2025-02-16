import React, { useState } from 'react';
import { StarRounded } from '@mui/icons-material';
import { Rating, Typography } from '@mui/material';

import {
  CustomButton,
  CustomSelectInput,
  PaginationRounded,
} from '@/components/shared';
import EmptyBox from '@/components/shared/empty';
import AddIcon from '@/components/shared/SVG-components/AddIcon';
import VeriticalIcon from '@/components/shared/SVG-components/VerticalIcon';
import { useGetCandidateEmployerReviews } from '@/hooks/candidate';
import { TSortBy } from '@/hooks/candidate/dtos';
import { TEmployerReviewPayload } from '@/@types/employer/employer';
import EmAddReviewModal from './EmAddReviewModal';
import EmReviewCard from './EmReviewCard';
import EmReviewCardSkeleton from './skeletons/EmReviewCardSkeleton';
import styles from './styles.module.scss';
import { useGetEmployerReviews } from '@/hooks/employer';
import { PlatFormType } from '@/@types/shared/type';

type Props = {
  employerId: string;
  allowAddReview?: boolean;
  allowMarkAsHelpful?: boolean;
  platform?: PlatFormType;
};

// getCandidateEmployerReviews

const starOptions: TSortBy[] = [
  { value: 1, label: '1 Star' },
  { value: 2, label: '2 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 5, label: '5 Stars' },
];

const EmReviewsContainer = ({ employerId, allowAddReview = true, allowMarkAsHelpful = true, platform = PlatFormType.candidate }: Props) => {
  const [sortBy, setSortBy] = useState<TSortBy | null>(null);
  const [filterDTO, setFilterDTO] = useState<TEmployerReviewPayload>({
    id: employerId,
    itemsPerPage: 5,
    page: 1,
  });
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  const { data: employerReviewsData, isPending: loading } =
    platform == PlatFormType.candidate ? useGetCandidateEmployerReviews(filterDTO) : useGetEmployerReviews(filterDTO);

  const onSelectSort = (value: TSortBy) => {
    setSortBy(value);
    setFilterDTO({ ...filterDTO, sortBy: value.value });
  };

  return (
    <>
      <div className={styles.reviewsContainer}>
        {allowAddReview ? (
          <div className={styles.btnContainer}>
            <CustomButton
              variant="contained"
              label="Add Review"
              className={styles.addReviewBtn}
              startIcon={<AddIcon />}
              onClick={() => setOpenAddReviewModal(true)}
            />
          </div>
        ) : null}
        <div className={styles.mainContainer}>
          <Typography className={styles.titleText}>
            Reviews({employerReviewsData?.totalItems || 0})
          </Typography>
          <div className={styles.topBox}>
            <div className={styles.rateBox}>
              <div className={styles.ratingWrapper}>
                <Rating
                  name="rate"
                  value={employerReviewsData?.averageRating || 0}
                  emptyIcon={<StarRounded className={styles.ratingStarEmpty} />}
                  icon={<StarRounded className={styles.ratingStarFilled} />}
                  precision={0.1}
                />
                <Typography className={styles.rateText}>
                  {employerReviewsData?.averageRating || 0}
                </Typography>
              </div>
              <VeriticalIcon />
              <Typography className={styles.rateText}>
                {employerReviewsData?.averageRating} Overall Rating
              </Typography>
            </div>
            <div className={styles.sortBox}>
              <Typography variant="h6" component="h6">
                Sort By:
              </Typography>
              <CustomSelectInput
                value={sortBy as TSortBy}
                onChange={onSelectSort as any}
                options={starOptions}
                placeholder="No. Stars"
                components={{
                  IndicatorSeparator: () => null,
                }}
                className={styles.sortSelect}
              />
            </div>
          </div>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <EmReviewCardSkeleton key={idx} />
            ))
          ) : employerReviewsData && employerReviewsData?.items.length ? (
            employerReviewsData?.items.map((review) => (
              <EmReviewCard
                key={review._id}
                review={review}
                filterDTO={filterDTO}
                employerId={employerId}
                allowMarkAsHelpful={allowMarkAsHelpful}
              />
            ))
          ) : (
            <EmptyBox message="Employer reviews will show here" />
          )}
        </div>
        {employerReviewsData && employerReviewsData.totalPages > 1 ? (
          <div className="pagination-container">
            <PaginationRounded
              count={employerReviewsData?.totalPages || 0}
              siblingCount={1}
              variant="outlined"
              shape="rounded"
              page={employerReviewsData?.currentPage || 0}
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
      {allowAddReview ? (
        <EmAddReviewModal
          employerId={employerId}
          onClose={() => setOpenAddReviewModal(false)}
          open={openAddReviewModal}
          filterDTO={filterDTO}
        />
      ) : null}
    </>
  );
};

export default EmReviewsContainer;

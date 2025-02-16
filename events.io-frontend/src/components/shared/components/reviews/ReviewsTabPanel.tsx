import Image from 'next/image';
import { StarRounded } from '@mui/icons-material';
import { Box, Paper, Rating, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Select from 'react-select';

import { CustomSkeleton, EmptyRequestsTemplates } from '@/components/shared';
import Chip2 from '@/components/shared/Chip2';
import {
  CandidateProfileReviewDTO,
  CandidateProfileReviewResponseDTO,
} from '@/hooks/candidate/dtos';

export interface ReviewTabPanelProps {
  candidateReviews: CandidateProfileReviewResponseDTO;
  isLoading: boolean;
  sortBy: TSortBy | null;
  onSortByChange: (value: TSortBy) => void;
  sector: 'university' | 'employer' | 'candidate';
}

type TSortBy = {
  value: number;
  label: string;
};

const starOptions: TSortBy[] = [
  { value: 1, label: 'One Star' },
  { value: 2, label: 'Two Stars' },
  { value: 3, label: 'Three Stars' },
  { value: 4, label: 'Four Stars' },
];

export const ReviewsTabPanel = ({
  candidateReviews,
  isLoading,
  sortBy,
  onSortByChange,
}: ReviewTabPanelProps) => {
  return (
    <Box>
      <Box display={'flex'} flexWrap={'wrap'} gap={2} my={3}>
        <Box>
          <Rating
            name="rate"
            value={Math.floor(candidateReviews?.averageRating)}
            emptyIcon={
              <StarRounded style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>
        <Box flex={1}>
          <Typography color={'#110C22'} fontSize={14}>
            {`${candidateReviews?.averageRating} (${candidateReviews?.totalItems} overall rating)`}
          </Typography>
        </Box>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <Typography fontSize={14}>Sort by</Typography>
          <Select
            placeholder="number of stars"
            options={starOptions}
            value={sortBy}
            onChange={(value) => onSortByChange(value as TSortBy)}
            styles={{
              control: (styles) => ({
                ...styles,
                borderRadius: 10,
                '& span': { display: 'none' },
                minWidth: 180,
                color: '#0C27BE !important',
              }),
            }}
          />
        </Box>
      </Box>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Paper key={index}
            sx={{ display: 'flex', gap: 2, border: 1, borderColor: '#E2E2E4', padding: 2, mb: 2 }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <CustomSkeleton variant="rounded" height={65} width={65} sx={{ borderRadius: '8px', mb: 1 }} />
              <CustomSkeleton variant="rounded" height={18} width={60} />
            </Box>
            <Stack spacing={1} width={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CustomSkeleton variant="rounded" height={24} width={150} />
                <Box display={'flex'} alignItems={'center'} gap={0.3}>
                  <StarIcon sx={{ color: '#e2e2e4' }} />
                  <StarIcon sx={{ color: '#e2e2e4' }} />
                  <StarIcon sx={{ color: '#e2e2e4' }} />
                  <StarIcon sx={{ color: '#e2e2e4' }} />
                </Box>
              </Box>
              <CustomSkeleton variant="rounded" height={22} width={190} />
              <CustomSkeleton variant="rounded" height={20} />
              <CustomSkeleton variant="rounded" height={20} />
              <CustomSkeleton variant="rounded" height={20} />
            </Stack>
          </Paper>
        ))
      ) : (
        candidateReviews?.items?.length > 0 ? (
          candidateReviews?.items?.map((reviewData: CandidateProfileReviewDTO) => (
            <Paper
              key={reviewData?._id}
              sx={{ border: 1, borderColor: '#E2E2E4', padding: 2, mb: 2 }}
            >
              <Box display={'flex'} gap={5}>
                <Stack alignItems={'center'}>
                  <Box>
                    <Image
                      src={reviewData?.reviewerProfilePhoto || '/assets/images/user-default-image.png'}
                      alt={`${reviewData?.reviewerOrganizationName} reviewer photo`}
                      width={60}
                      height={60}
                      className='rounded-[10px]'
                    />
                  </Box>
                  <Chip2
                    label={reviewData?.relationship}
                    color={'primary'} size="small" sx={{ mt: 2, textTransform: 'lowercase' }} />
                </Stack>
                <Box flex={1} fontSize={12}>
                  <Box display={'flex'} flexWrap={'wrap'}>
                    <Box flex={1}>
                      <Typography variant="h6" color={'#110C22'} fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                        {reviewData.reviewerName}
                      </Typography>
                      {reviewData?.reviewerOrganizationName && (
                        <Typography color={'#110C22'} fontWeight={600} sx={{ mt: 1, textTransform: 'capitalize' }}>
                          {reviewData.reviewerJobTitle && reviewData.reviewerJobTitle + ' At '}
                          {reviewData?.reviewerOrganizationName}
                        </Typography>
                      )}
                      <Typography color={'#8D8A95'} fontWeight={600} mt={1}>
                        {reviewData?.dateCreated}
                      </Typography>
                    </Box>
                    <Rating
                      name="rate"
                      value={Math.floor(reviewData?.rating)}
                      emptyIcon={<StarRounded style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                  </Box>
                  <Typography color={'#4F4B5C'}>
                    {reviewData?.review}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <EmptyRequestsTemplates
            title="Oops. There is No Reviews For This Candidate Yet."
            imageType="noRequests"
            altName="Empty Recommendated candidate"
            sx={{ mt: 4 }}
          />
        )
      )}
    </Box>
  );
};

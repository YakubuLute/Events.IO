import React, { useState } from 'react';
import Image from 'next/image';
import { StarRounded } from '@mui/icons-material';
import { Rating, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { decodeAxiosError } from '@/utils/shared/axiosError';
import { CustomButton } from '@/components/shared';
import { LocationCircleIcon } from '@/components/shared/SVG-components';
import OfficeIcon from '@/components/shared/SVG-components/OfficeIcon';
import ReviewIcon from '@/components/shared/SVG-components/ReviewIcon';
import UserGroupIcon from '@/components/shared/SVG-components/UserGroupIcon';
import { errorAlert, successAlert } from '@/components/shared/toastAlert';
import {
  useFollowingEmployerById,
  useUnFollowingEmployerById,
} from '@/hooks/candidate';
import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import { APISuccessResponse, ErrorResponse } from '@/@types/shared/type';
import { kFormatter } from '@/utils';
import styles from './styles.module.scss';
import FollowersContainer from '@/components/candidate/employers/FollowersContainer';

type Props = {
  emProfile: EmployerDetailsDataDTO;
  emId: string;
  showFollowButton?: boolean;
};

const EmBanner = ({ emProfile, emId, showFollowButton = false }: Props) => {
  const queryClient = useQueryClient();
  const [openFollowersModal, setOpenFollowersModal] = useState(false);

  const {
    mutate: followEmployer,
    isPending: isFollowing,
    isSuccess: isFollowSuccess,
  } = useFollowingEmployerById({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['getEmployerDetails', emId],
      });
      successAlert({ message: data?.message });
    },
    onError: (error: ErrorResponse) => {
      errorAlert({ message: decodeAxiosError(error) });
    },
    onMutate: () => {},
    onSettled: () => {},
  });

  const {
    mutate: unfollowEmployer,
    isPending: isUnfollowing,
    isSuccess: isUnfollowSuccess,
  } = useUnFollowingEmployerById({
    onSuccess: (data: APISuccessResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['getEmployerDetails', emId],
      });
      successAlert({ message: data?.message });
    },
    onError: (error: ErrorResponse) => {
      errorAlert({ message: decodeAxiosError(error) });
    },
    onMutate: () => {},
    onSettled: () => {},
  });

  const onToggleFollowButton = () => {
    if (!emProfile?.hasFollowed) {
      followEmployer({ employerId: emProfile?._id });
    } else {
      unfollowEmployer({ employerId: emProfile?._id });
    }
  };

  return (
    <>
      <div className={styles.bannerWrapper}>
        <Image
          src={emProfile?.coverPhoto || '/images/banner.jpeg'}
          alt="banner image"
          height={180}
          width={435}
          className={styles.bannerImg}
          priority
        />
        <div className={styles.logoBox}>
          <div className={styles.emBox}>
            <div className={styles.emImgBox}>
              <Image
                src={emProfile?.logoImage || '/assets/icons/organization.svg'}
                alt={`${emProfile?.employerName} Logo`}
                width={48}
                height={48}
                className={styles.emImg}
              />
            </div>
          </div>
          <div className={styles.emDetailBox}>
            <div className={styles.emTitleRateBox}>
              <Typography component="h4" className={styles.emText}>
                {emProfile?.employerName}
              </Typography>
              <div className={styles.rateBox}>
                <Typography className={styles.rateText}>
                  {emProfile?.averageRating}
                </Typography>
                <Rating
                  name="rate"
                  value={emProfile?.averageRating}
                  emptyIcon={<StarRounded className={styles.ratingStarEmpty} />}
                  icon={<StarRounded className={styles.ratingStarFilled} />}
                  precision={0.1}
                />
              </div>
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.items}>
                <div className={styles.itemBox}>
                  <div className={styles.item}>
                    <LocationCircleIcon />
                    <Typography className={styles.text}>
                      {emProfile?.location?.city},{' '}
                      {emProfile?.location?.countryIsoCode}
                    </Typography>
                  </div>
                  <div className={styles.item}>
                    <UserGroupIcon />
                    <Typography className={styles.text}>
                      {emProfile?.companySize} <span>employees</span>
                    </Typography>
                  </div>
                </div>
                <div className={styles.itemBox}>
                  <div className={styles.item}>
                    <OfficeIcon />
                    <Typography className={styles.text}>
                      {emProfile?.industry}
                    </Typography>
                  </div>
                  <div className={styles.item}>
                    <ReviewIcon />
                    <Typography className={styles.text}>
                      {emProfile?.totalReviews} Reviews
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={styles.followBox}>
                {showFollowButton ? (
                  <CustomButton
                    label={emProfile?.hasFollowed ? 'Following' : 'Follow'}
                    className={[
                      styles.followBtn,
                      !emProfile?.hasFollowed && styles.outline,
                    ].join(' ')}
                    onClick={() => onToggleFollowButton()}
                    isLoading={isFollowing || isUnfollowing}
                    disabled={isFollowing || isUnfollowing}
                  />
                ) : null}
                <button
                  className={styles.followersText}
                  onClick={() => setOpenFollowersModal(true)}
                  disabled={emProfile?.followers === 0}
                >
                  {emProfile?.followers > 0 && kFormatter(emProfile?.followers)}{' '}
                  {emProfile?.followers === 0
                    ? 'No Followers'
                    : emProfile?.followers === 1
                    ? 'Follower'
                    : 'Followers'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openFollowersModal ? (
        <FollowersContainer
          employer={emProfile}
          onClose={() => setOpenFollowersModal(false)}
          open={openFollowersModal}
          onToggleFollowButton={onToggleFollowButton}
          isFollowing={isFollowing}
          isUnfollowing={isUnfollowing}
          isFollowSuccess={isFollowSuccess}
          isUnfollowSuccess={isUnfollowSuccess}
          showFollowButton={showFollowButton}
        />
      ) : null}
    </>
  );
};

export default EmBanner;

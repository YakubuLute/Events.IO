import { MouseEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { CustomButton, CustomSkeleton } from '@/components/shared';
import {
  BookmarkPlusIcon,
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/shared/SVG-components';
import { defaultUserPicture } from '@/components/ui/images';
import {
  CandidateKycLevels,
  CandidatePublicProfileDTO,
  SocialNetwork,
} from '@/hooks/candidate/dtos';
import {
  useAddToShortlistCandidateProfile,
  useGetCandidateExtraDetails,
} from '@/hooks/employer';
import { ShortlistCandidateProfileRequestDTO } from '@/hooks/employer/dtos';
import SPPersonalInformation from '../SPPersonalInformation';
import SPSkill from '../SPSkill';
import styles from './SPLeft.module.scss';

interface ProfileLeftData {
  candidateProfile: CandidatePublicProfileDTO;
  isLoading: boolean;
  sector: 'university' | 'employer' | 'candidate';
  onSave?: MouseEventHandler<HTMLElement>;
  refetchShortlistCandidate?: () => void;
}

const SPLeft: React.FC<ProfileLeftData> = ({
  candidateProfile,
  isLoading,
  sector,
  onSave,
  refetchShortlistCandidate,
}) => {
  // const { personalDetails, employmentHistory } = candidateProfile;
  const isEmployer = sector === 'employer';
  const [shortlistLabel, setShortlistLabel] =
    useState<string>('Add to Shortlist');

  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const positionQueryId = searchParams.get('position') as string;
  const addToShortlistCandidateProfile = useAddToShortlistCandidateProfile({
    onSuccess: () => {},
    onError: () => {},
  });

  const { data: candidateExtraDetails } = useGetCandidateExtraDetails({
    positionId: positionQueryId,
    candidateId: candidateProfile?._id,
  });

  const handleShortlistProfile = async (candidateId: string) => {
    const params: ShortlistCandidateProfileRequestDTO = {
      positionId: positionQueryId,
      candidateId: candidateId,
    };

    try {
      await addToShortlistCandidateProfile.mutateAsync(params);
      queryClient.invalidateQueries({
        queryKey: ['getCandidateExtraDetails', params],
      });
      setShortlistLabel(
        shortlistLabel === 'Add to Shortlist'
          ? 'Remove from Shortlist'
          : 'Add to Shortlist'
      );
      refetchShortlistCandidate && refetchShortlistCandidate();
      if (shortlistLabel === 'Add to Shortlist') {
        toast.success('Added to Shortlist');
      } else {
        toast.success('Removed from Shortlist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (candidateExtraDetails?.isShortlisted) {
      setShortlistLabel('Remove from Shortlist');
    } else {
      setShortlistLabel('Add to Shortlist');
    }
  }, [candidateExtraDetails]);

  return (
    <>
      <Box className={'b-b ' + styles.avatarPersonal}>
        <Box py={2}>
          <Box display="flex" justifyContent="end">
            <p className={styles.percentage}>
              {candidateExtraDetails?.matchScore}%
            </p>
          </Box>

          <Box className="d-flex align-items-center justify-content-around">
            <Image
              src={
                isEmployer
                  ? defaultUserPicture
                  : candidateProfile?.profilePhoto || defaultUserPicture
              }
              alt={`${candidateProfile?.personalDetails?.firstName} profile Picture`}
              width={166}
              height={154}
              className={styles.avatar}
            />
          </Box>
          <Box className={styles.personalInformation} component="div">
            <Stack direction="row" className={styles.name_verify}>
              <Typography component="h3">
                {!isEmployer &&
                  candidateProfile?.personalDetails?.firstName +
                    ' ' +
                    candidateProfile?.personalDetails?.lastName}
                {isEmployer &&
                  `${
                    candidateProfile?.personalDetails?.firstName?.[0]
                  }${candidateProfile?.personalDetails?.lastName?.[0].toUpperCase()}`}
              </Typography>
              {candidateProfile?.kycLevel !==
                CandidateKycLevels.ADDRESS_VERIFICATION && (
                <VerifiedIcon className={styles.verifiedIcon} />
              )}
            </Stack>
            <Typography className={styles.job_title}>
              {candidateProfile?.workDetails?.jobTitles}
            </Typography>
            <Typography className={styles.location}>
              {/* {workDetails?.locations. + ', ' + workDetails?.locations.country} */}
            </Typography>

            <Stack
              direction="row"
              className={styles.social_media}
              mt={2}
              component="ul"
            >
              <li className={styles.social_icon_link}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={
                    candidateProfile?.socialLinks?.find(
                      (socialLink) =>
                        socialLink.network == SocialNetwork.LINKEDIN
                    )?.url || ''
                  }
                >
                  <LinkedInIcon />
                </Link>
              </li>

              <li className={styles.social_icon_link}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={
                    candidateProfile?.socialLinks?.find(
                      (socialLink) =>
                        socialLink.network == SocialNetwork.FACEBOOK
                    )?.url || ''
                  }
                >
                  <FacebookIcon />
                </Link>
              </li>
              <li className={styles.social_icon_link}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={
                    candidateProfile?.socialLinks?.find(
                      (socialLink) =>
                        socialLink.network == SocialNetwork.TWITTER
                    )?.url || ''
                  }
                >
                  <TwitterIcon />
                </Link>
              </li>
            </Stack>
            {isEmployer && (
              <Stack
                direction="row"
                className={styles.shortlist_bookmark}
                mt={2}
              >
                <div className={styles.shortlist_btn}>
                  <CustomButton
                    label={shortlistLabel}
                    onClick={() =>
                      handleShortlistProfile(candidateProfile?._id)
                    }
                  />
                </div>
                <IconButton
                  aria-label="Bookmark candidate profile"
                  onClick={onSave}
                  className={styles.bookmark_btn}
                >
                  <BookmarkPlusIcon width="34px" height="35px" />
                </IconButton>
              </Stack>
            )}
          </Box>
        </Box>

        {isLoading ? (
          <Stack direction="row" justifyContent="center" spacing={1} mb={1}>
            <CustomSkeleton variant="rounded" height={50} width={70} />
            <CustomSkeleton variant="rounded" height={50} width={70} />
            <CustomSkeleton variant="rounded" height={50} width={70} />
          </Stack>
        ) : (
          <Box className={styles.personalInformationCols + ' b-t '}>
            <Box className={styles.col}>
              <Typography className={styles.span}>
                {candidateProfile?.workDetails.yearsOfExperience || 'N/A'} yrs
              </Typography>
              <Typography className={styles.small}>Experience</Typography>
            </Box>
            <Box className={styles.col + ' b-l b-r'}>
              <Typography className={styles.span}>
                {`${candidateProfile?.workDetails.monthlySalary ?? 'N/A'} ${
                  candidateProfile?.workDetails.currency || ''
                }/m `}
              </Typography>
              <Typography className={styles.small}>Min. salary</Typography>
            </Box>
            <Box className={styles.col}>
              <Typography className={styles.span}>
                {`${candidateProfile?.workDetails.hourlyRate ?? 'N/A'} ${
                  candidateProfile?.workDetails.currency || ''
                }/hr`}
              </Typography>
              <Typography className={styles.small}>Min. rate</Typography>
            </Box>
          </Box>
        )}
      </Box>

      <SPPersonalInformation
        candidateProfile={candidateProfile}
        isLoading={isLoading}
      />
      <SPSkill
        skills={candidateProfile?.skills}
        isLoading={isLoading}
        sector="university"
      />
    </>
  );
};

export default SPLeft;

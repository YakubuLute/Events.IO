import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { truncateString } from '@/utils/utils';
// import SPVolunteer from './SPVolunteer';

import { CustomSkeleton } from '@/components/shared';
import {
  CandidateAwards,
  CandidateCertification,
  CandidateEducationHistory,
  CandidateEmploymentHistory,
  CandidatePublicProfileDTO,
} from '@/hooks/candidate/dtos';
import SeeMoreBtns from './SeeMoreBtns';
import SPAward from './SPAward';
import SPCertification from './SPCertification';
import SPEducation from './SPEducation';
import styles from './SPTab.module.scss';
import SPWorkExperience from './SPWorkExperience';

interface ProfileRightData {
  candidateProfile: CandidatePublicProfileDTO;
  isLoading: boolean;
  sector: 'university' | 'employer' | 'candidate';
}

const SPTab: React.FC<ProfileRightData> = ({
  candidateProfile,
  isLoading,
  sector,
}) => {
  const { employmentHistory = [], educationHistory = [] } =
    candidateProfile || {};

  const employmentExperiences: CandidateEmploymentHistory[] =
    employmentHistory?.filter(
      (employment: CandidateEmploymentHistory) =>
        employment?.volunteered === false
    );
  const employmentVolunteers: CandidateEmploymentHistory[] =
    employmentHistory?.filter(
      (employment: CandidateEmploymentHistory) =>
        employment?.volunteered === true
    );

  const [seeMore, setSeeMore] = useState<boolean>(true);

  return (
    <Box className={styles.profileTab}>
      <Box className={styles.experiencePanel}>
        <Box className={[styles.titleTalent, styles.talentSummary].join(' ')}>
          <Typography className={styles.talentHeading}>Summary</Typography>
        </Box>

        {isLoading ? (
          <Stack spacing={0.5}>
            <CustomSkeleton variant="rounded" height={20} />
            <CustomSkeleton variant="rounded" height={20} />
            <CustomSkeleton variant="rounded" height={20} width={'80%'} />
          </Stack>
        ) : (
          <>
            <Typography className={styles.summary}>
              {seeMore
                ? truncateString(candidateProfile?.summary || '', 400)
                : candidateProfile?.summary}
            </Typography>

            {candidateProfile?.summary?.length > 400 && (
              <SeeMoreBtns
                seeMore={seeMore}
                handleSeeMore={(value: boolean) => setSeeMore(value)}
              />
            )}
          </>
        )}

        <Box>
          <Box className={styles.titleTalent}>
            <Box className={styles.talentHeading}>Experience</Box>
            <Box className={styles.lineTitleTalent}></Box>
          </Box>
          <Box>
            {isLoading ? (
              <Stack direction="row" spacing={1} mt={2.5}>
                <CustomSkeleton variant="rounded" height={60} width={60} />
                <Stack spacing={0.5} width={1}>
                  <CustomSkeleton variant="rounded" height={20} width={'80%'} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} width={'40%'} />
                </Stack>
              </Stack>
            ) : employmentExperiences?.length > 0 ? (
              employmentExperiences?.map(
                (experience: CandidateEmploymentHistory) => (
                  <SPWorkExperience
                    key={experience._id}
                    value={experience}
                    sector={sector}
                  />
                )
              )
            ) : (
              <Typography className={styles.summary}>
                {' '}
                No Experience Provided
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box className={styles.titleTalent}>
            <Box className={styles.talentHeading}>Education</Box>
            <Box className={styles.lineTitleTalent}></Box>
          </Box>
          <Box>
            {isLoading ? (
              <Stack direction="row" spacing={1} mt={2.5}>
                <CustomSkeleton variant="rounded" height={60} width={60} />
                <Stack spacing={0.5} width={1}>
                  <CustomSkeleton variant="rounded" height={20} width={'80%'} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} width={'40%'} />
                </Stack>
              </Stack>
            ) : educationHistory?.length > 0 ? (
              educationHistory?.map((education: CandidateEducationHistory) => (
                <SPEducation
                  key={education._id}
                  value={education}
                  sector={sector}
                />
              ))
            ) : (
              <Typography className={styles.summary}>
                {' '}
                No Education Provided
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box className={styles.titleTalent}>
            <Box className={styles.talentHeading}>Certification</Box>
            <Box className={styles.lineTitleTalent}></Box>
          </Box>
          <Box>
            {isLoading ? (
              <Stack direction="row" spacing={1} mt={2.5}>
                <CustomSkeleton variant="rounded" height={60} width={60} />
                <Stack spacing={0.5} width={1}>
                  <CustomSkeleton variant="rounded" height={20} width={'80%'} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} width={'40%'} />
                </Stack>
              </Stack>
            ) : candidateProfile?.certifications?.length > 0 ? (
              candidateProfile?.certifications?.map(
                (certification: CandidateCertification) => (
                  <SPCertification
                    key={certification._id}
                    value={certification}
                  />
                )
              )
            ) : (
              <Typography className={styles.summary}>
                {' '}
                No Certification Provided
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box className={styles.titleTalent}>
            <Box className={styles.talentHeading}>Honors</Box>
            <Box className={styles.lineTitleTalent}></Box>
          </Box>
          <Box>
            {isLoading ? (
              <Stack direction="row" spacing={1} mt={2.5}>
                <CustomSkeleton variant="rounded" height={60} width={60} />
                <Stack spacing={0.5} width={1}>
                  <CustomSkeleton variant="rounded" height={20} width={'80%'} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} width={'40%'} />
                </Stack>
              </Stack>
            ) : candidateProfile?.awards?.length > 0 ? (
              candidateProfile?.awards?.map((award: CandidateAwards) => (
                <SPAward key={award._id} value={award} />
              ))
            ) : (
              <Typography className={styles.summary}>
                {' '}
                No Education Provided
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Box className={styles.titleTalent}>
            <Box className={styles.talentHeading}>Volunteer</Box>
            <Box className={styles.lineTitleTalent}></Box>
          </Box>
          <Box>
            {isLoading ? (
              <Stack direction="row" spacing={1} mt={2.5}>
                <CustomSkeleton variant="rounded" height={60} width={60} />
                <Stack spacing={0.5} width={1}>
                  <CustomSkeleton variant="rounded" height={20} width={'80%'} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} />
                  <CustomSkeleton variant="rounded" height={20} width={'40%'} />
                </Stack>
              </Stack>
            ) : employmentVolunteers?.length > 0 ? (
              employmentVolunteers?.map(
                (experience: CandidateEmploymentHistory) => (
                  <SPWorkExperience
                    key={experience._id}
                    value={experience}
                    sector={sector}
                  />
                )
              )
            ) : (
              <Typography className={styles.summary}>
                {' '}
                No Volunteer Provided
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SPTab;

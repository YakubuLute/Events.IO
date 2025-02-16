import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Typography } from '@mui/material';

import { CustomButton, CustomSkeleton } from '@/components/shared';
import { useGetCandidateVerificationStatistics } from '@/hooks/candidate';
import { useOnboardingDialogContext } from '@/contexts/onboardingContext';
import styles from './verifications-alert.module.scss';

const VerificationStatisticsAlert = () => {
  const { data: statisticsData, isPending } =
    useGetCandidateVerificationStatistics();
  // const { data: currentUserInfo } = useGetCurrentUserBasicInfo();

  const { checklistStatus, identityVerified } = useOnboardingDialogContext();

  const getCondition = () => {
    if (identityVerified) {
      return true;
    } else if (
      checklistStatus &&
      statisticsData?.overall &&
      statisticsData?.overall?.unverified > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {isPending ? (
        <>
          <Box sx={{ height: { xs: 46, md: 34 } }} />
          <Box className={styles.verifications_wrapper}>
            <Box className={styles.verification}>
              <CustomSkeleton variant="text" width="80%" height={20} />
            </Box>
          </Box>
        </>
      ) : !getCondition() ? (
        <>
          <Box sx={{ height: { xs: 46, md: 34 } }} />
          <Box className={styles.verifications_wrapper}>
            <Box className={styles.verification}>
              <Typography className={styles.text_message}>
                You have {statisticsData?.overall?.unverified} verification
                available to be completed
              </Typography>
              <CustomButton
                variant="text"
                label="Start Verification"
                endIcon={<ArrowOutwardIcon />}
                href="/candidate/verification"
                hasLink
              />
            </Box>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default VerificationStatisticsAlert;

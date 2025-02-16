import Image from 'next/image';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';

// import { RecommendationArray } from '@/constants'
import { CustomSkeleton, EmptyRequestsTemplates } from '@/components/shared';
import { UserTypes } from '@/@types/shared/type';
import { CandidateProfileRecommendationDTO } from '@/hooks/candidate/dtos';
import { DateFormat, formatCustomDateOption } from '@/utils';
import styles from './recommendations.module.scss';

type RecommendationProps = {
  recommendationList: Array<CandidateProfileRecommendationDTO>;
  isLoading: boolean;
  sector: 'university' | 'employer' | 'candidate';
};

export const RecommendationsTabPanel: React.FC<RecommendationProps> = (
  props
) => {
  const { recommendationList, isLoading } = props;

  return (
    <Box className={styles.recommendations_page}>
      <Box className={styles.recommendation_container}>
        {/* <Typography component="h3" className={styles.category_title}>{"Companies"}</Typography> */}

        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} className={styles.recommendation}>
              <CustomSkeleton variant="circular" height={72} width={85} />
              <Stack spacing={1} width={1}>
                <CustomSkeleton variant="rounded" height={26} width={150} />
                <CustomSkeleton variant="rounded" height={24} width={250} />
                <CustomSkeleton variant="rounded" height={20} />
                <CustomSkeleton variant="rounded" height={20} />
                <CustomSkeleton variant="rounded" height={20} />
              </Stack>
            </Box>
          ))
        ) : (
          <ul className={styles.recommendation_group}>
            {recommendationList?.length > 0 ? (
              recommendationList?.map((recommendation, index: number) => (
                <li key={index} className={styles.recommendation}>
                  <div className={styles.logo_img}>
                    <Image
                      src={
                        recommendation.recommender?.profilePhoto ||
                        '/assets/images/user-default-image.png'
                      }
                      alt={`${recommendation.recommender?.firstName} recommender photo`}
                      width={72}
                      height={72}
                      className={styles.profile_photo}
                    />
                    {recommendation.recommenderType !== UserTypes.CANDIDATE && (
                      <Image
                        src={
                          recommendation.recommender?.organizationLogo ||
                          '/images/experience-avatar.svg'
                        }
                        alt={`${recommendation.recommender?.organizationName} company logo`}
                        width={20}
                        height={20}
                        className={styles.company_logo}
                      />
                    )}
                  </div>

                  <div className={styles.more_info}>
                    <h4 className={styles.title}>
                      {recommendation.recommender?.firstName}{' '}
                      {recommendation.recommender?.lastName}
                    </h4>
                    <p className={styles.date}>
                      {formatCustomDateOption(
                        recommendation.dateCreated,
                        DateFormat.FullDate
                      )}
                    </p>
                    <p className={styles.description}>
                      {recommendation?.recommendation}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <EmptyRequestsTemplates
                title="Oops. There is No Recommendation For This Candidate Yet."
                imageType="noRequests"
                altName="Empty Recommendated candidate"
                sx={{ mt: 4 }}
              />
            )}
          </ul>
        )}
      </Box>
    </Box>
  );
};

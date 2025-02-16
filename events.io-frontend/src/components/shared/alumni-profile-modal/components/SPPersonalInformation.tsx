import React from 'react';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import { Box, Typography } from '@mui/material';

import { CandidatePublicProfileDTO } from '@/hooks/candidate/dtos';
import styles from './SPPersonalInformation.module.scss';

interface PersonalInformation {
  candidateProfile: CandidatePublicProfileDTO;
  isLoading: boolean;
}

const SPPersonalInformation: React.FC<PersonalInformation> = ({
  candidateProfile,
}) => {
  const { workDetails, personalDetails } = candidateProfile || {};

  return (
    <Box className={styles.jobInformation}>
      <Box className={styles.openJobInformation}>
        <Box className={styles.openTimeLine + ' d-flex '}>
          <Box className={styles.openTimeIcon}>
            <BusinessCenterIcon />
          </Box>
          <Box className={styles.openTimeDetail}>
            <Typography variant="h3">Open to:</Typography>
            <ul>
              {workDetails?.jobTypes?.map((jobType, index) => (
                <li key={index}>
                  <Typography component={'p'}>{jobType}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
        {workDetails?.locations && workDetails?.locations?.length > 0 && (
          <Box className={styles.openTimeLine + ' d-flex '}>
            <Box className={styles.openTimeIcon}>
              <LocationOnIcon />
            </Box>
            <Box className={styles.openTimeDetail}>
              <Typography variant="h3">On-site in or near:</Typography>
              <ul>
                {workDetails?.locations?.map((location, index) => (
                  <li key={index}>
                    <Typography component={'p'}>
                      {location.state && `${location.state},`}{' '}
                      {location.country}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        )}

        {workDetails?.timezones && (
          <Box className={styles.openTimeLine + ' d-flex '}>
            <Box className={styles.openTimeIcon}>
              <WifiIcon />
            </Box>
            <Box className={styles.openTimeDetail}>
              <Typography variant="h3">Remote in timezone:</Typography>
              {workDetails?.timezones?.map((timezone, index) => (
                <Typography key={index} component={'p'}>
                  {timezone}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Box className={styles.titleTalent}>
        <Box className={styles.talent_heading}>Personal</Box>
        <Box className={styles.lineTitleTalent}></Box>
      </Box>
      <Box className={styles.personalContactInformation}>
        <ul>
          <li>
            <Typography component="p" className={styles.content}>
              Address:{' '}
              {candidateProfile?.location?.address ||
                (candidateProfile?.location?.state
                  ? `${candidateProfile.location.state}, `
                  : '')}
              {candidateProfile?.location?.country || 'any'}
            </Typography>
          </li>
          <li>
            <Typography component="p" className={styles.content}>
              Age group: {personalDetails?.ageGroup || 'any'} years
            </Typography>
          </li>
          <li>
            <Typography component="p" className={styles.content}>
              Nationality: {personalDetails?.nationality || 'any'}
            </Typography>
          </li>
          <li>
            <Typography component="p" className={styles.content}>
              Country: {candidateProfile?.location?.country || 'any'}
            </Typography>
          </li>
          <li>
            <Typography component="p" className={styles.content}>
              Languages: &nbsp;
              {personalDetails?.languages &&
              personalDetails?.languages?.length > 0 ? (
                personalDetails?.languages?.map((language, index) => (
                  <span key={index}>
                    {language}
                    {index < personalDetails?.languages?.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                <span>any</span>
              )}
            </Typography>
          </li>
          <li>
            <Typography component="p" className={styles.content}>
              Interests: &nbsp;
              {personalDetails?.interests &&
              personalDetails?.interests?.length > 0 ? (
                personalDetails?.interests?.map((interest, index) => (
                  <span key={index}>
                    {interest}
                    {index < personalDetails?.interests?.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                <span>any</span>
              )}
            </Typography>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default SPPersonalInformation;

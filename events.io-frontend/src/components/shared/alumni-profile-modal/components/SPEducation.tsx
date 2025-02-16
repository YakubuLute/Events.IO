'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Typography } from '@mui/material';

import { MouseOverPopover } from '@/components/shared/';
import {
  CandidateEducationHistory,
  VerificationStatus,
} from '@/hooks/candidate/dtos';
import {
  calculateDateDifference,
  DateFormat,
  formatCustomDateOption,
  truncateString,
} from '@/utils';
import SeeMoreBtns from './SeeMoreBtns';
import styles from './SPWorkExperience.module.scss';

interface EducationData {
  value: CandidateEducationHistory;
  sector: 'university' | 'employer' | 'candidate';
}

const SPEducation: React.FC<EducationData> = ({ value, sector }) => {
  const router = useRouter();

  const [seeMore, setSeeMore] = useState<boolean>(true);
  const [hoverVerifyEl, setHoverVerifyEl] = useState<HTMLButtonElement | null>(
    null
  );
  const openPopover = Boolean(hoverVerifyEl);
  const idPopover = openPopover ? 'mouse-over-verify-popover' : undefined;

  return (
    <Box>
      <Box className={styles.container}>
        <div className={styles.employmentItem}>
          <div className={styles.employmentInfor}>
            <Box sx={{ cursor: 'pointer' }} className={styles.employmentIcon}>
              <Image
                src={value?.institutionLogo || '/images/education-avatar.svg'}
                alt={`${value?.institutionName} logo`}
                width={30}
                height={30}
                onClick={() => {
                  if (sector === 'employer') {
                    router.push(
                      `/employer/schools?schoolId=${value?.institutionId}`
                    );
                  } else if (sector === 'candidate') {
                    router.push(
                      `/candidate/schools?schoolId=${value?.institutionId}`
                    );
                  } else if (sector === 'university') {
                    router.push(
                      `/university/education?schoolId=${value?.institutionId}`
                    );
                  }
                }}
              />
            </Box>
            <Box
              onMouseLeave={() => setHoverVerifyEl(null)}
              className={styles.employmentDetail + ' b-b'}
            >
              <div className={styles.iconWrapper}>
                <Typography component="h4" className={styles.employmentTitle}>
                  {value.credential}
                </Typography>
                {value.verificationStatus === VerificationStatus.VERIFIED && (
                  <Typography
                    aria-owns={idPopover}
                    aria-haspopup="true"
                    className={styles.verifiedIcon}
                    onMouseEnter={(event) =>
                      setHoverVerifyEl(event.currentTarget as HTMLButtonElement)
                    }
                  >
                    <VerifiedIcon className={styles.verifiedIconSvg} />
                  </Typography>
                )}
              </div>
              <MouseOverPopover
                id={idPopover || 'mouse-over-verify-popover'}
                onOpen={openPopover}
                anchorEl={hoverVerifyEl}
                onClose={() => setHoverVerifyEl(null)}
                transformOrigin={{ vertical: -5, horizontal: 50 }}
                content={
                  <Box className={styles.popover_verify}>
                    <Typography component="p" className={styles.popoverText}>
                      Verified by {value.institutionName}
                      {/* , &nbsp; */}
                      {/* <Link href={value?.verificationBlockchainUrl || ''}> view on blockchain</Link> */}
                    </Typography>
                  </Box>
                }
              />

              <Typography
                component="p"
                className={styles.employmentCompany}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (sector === 'employer') {
                    router.push(
                      `/employer/schools?schoolId=${value?.institutionId}`
                    );
                  } else if (sector === 'candidate') {
                    router.push(
                      `/candidate/schools?schoolId=${value?.institutionId}`
                    );
                  } else if (sector === 'university') {
                    router.push(
                      `/university/education?schoolId=${value?.institutionId}`
                    );
                  }
                }}
              >
                {value.institutionName}{' '}
                <span>
                  • {value?.location?.state && `${value.location?.state},`}{' '}
                  {value.location?.country || 'No Location'}
                </span>
              </Typography>
              <p className={styles.employmentDate}>
                {/* <span>{value['date']} •</span> {value['range']} */}
                <span>
                  {`${formatCustomDateOption(
                    value.duration?.start,
                    DateFormat.YearAndMonth
                  )} - ${formatCustomDateOption(
                    value?.duration?.end,
                    DateFormat.YearAndMonth
                  )} •`}
                </span>{' '}
                {calculateDateDifference(
                  value.duration?.start,
                  value?.duration?.end
                )}
              </p>
              <p className={styles.employmentContent}>
                {seeMore
                  ? truncateString(value?.description || '', 300)
                  : value?.description || 'No description provided'}
              </p>

              {value?.description?.length > 300 && (
                <SeeMoreBtns
                  seeMore={seeMore}
                  handleSeeMore={(value: boolean) => setSeeMore(value)}
                />
              )}
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default SPEducation;

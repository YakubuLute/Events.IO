'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Typography } from '@mui/material';

import { CustomButton, MouseOverPopover } from '@/components/shared/';
import {
  CandidateEmploymentHistory,
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

interface ExperienceData {
  value: CandidateEmploymentHistory;
  sector: 'university' | 'employer' | 'candidate';
}

const SPWorkExperience: React.FC<ExperienceData> = ({ value, sector }) => {
  const router = useRouter();

  const [hoverVerifyEl, setHoverVerifyEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [seeMore, setSeeMore] = useState<boolean>(true);
  const openPopover = Boolean(hoverVerifyEl);
  const idPopover = openPopover ? 'mouse-over-verify-popover' : undefined;

  return (
    <Box>
      <Box className={styles.container}>
        <div className={styles.employmentItem}>
          <div className={styles.employmentInfor}>
            <Box sx={{ cursor: 'pointer' }} className={styles.employmentIcon}>
              <Image
                src={value?.employerLogo || '/images/experience-avatar.svg'}
                alt={`${value.jobTitle} company logo`}
                width={30}
                height={30}
                onClick={() => {
                  if (sector === 'employer') {
                    router.push(
                      `/employer/company?employerId=${value?.employerId}`
                    );
                  } else if (sector === 'candidate') {
                    router.push(
                      `/candidate/company-profile?employerId=${value?.employerId}`
                    );
                  } else if (sector === 'university') {
                    router.push(
                      `/university/company-profile?employerId=${value?.employerId}`
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
                <h4 className={styles.employmentTitle}>{value.jobTitle}</h4>
                {value.verificationStatus !== VerificationStatus.VERIFIED && (
                  <Typography
                    aria-owns={idPopover}
                    aria-haspopup="true"
                    className={styles.verifiedIcon}
                    onMouseEnter={(event) =>
                      setHoverVerifyEl(event.currentTarget as HTMLButtonElement)
                    }
                    // onMouseLeave={() => setHoverVerifyEl(null)}
                  >
                    <VerifiedIcon className={styles.verifiedIconSvg} />
                  </Typography>
                )}

                <div className={styles.hired_btn_div}>
                  <CustomButton
                    label="Hired via vaurse"
                    startIcon={
                      <Image
                        src="/favicon.svg"
                        alt="Vaurse logo"
                        width={14}
                        height={14}
                      />
                    }
                    buttonClass="hire_via_vaurse"
                    onClick={() => router.push(`/university/students`)}
                  />
                </div>
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
                      Verified by {value.employerName}
                      {/* , &nbsp; */}
                      {/* <Link href={value?.verificationBlockchainUrl || ''}> view on blockchain</Link> */}
                    </Typography>
                  </Box>
                }
              />
              <Typography
                className={styles.employmentCompany}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (sector === 'employer') {
                    router.push(
                      `/employer/company?employerId=${value?.employerId}`
                    );
                  } else if (sector === 'candidate') {
                    router.push(
                      `/candidate/company-profile?employerId=${value?.employerId}`
                    );
                  } else if (sector === 'university') {
                    router.push(
                      `/university/company-profile?employerId=${value?.employerId}`
                    );
                  }
                }}
              >
                {value.employerName}{' '}
                <span>
                  • {value?.location?.state && `${value.location.state},`}{' '}
                  {value.location.country || 'No Location'}
                </span>
              </Typography>
              <p className={styles.employmentDate}>
                {/* <span>{value.duration.start + '-' + value.duration.end} •</span> {"nedd some calculation"} */}
                <span>
                  {`${formatCustomDateOption(
                    value.duration?.start,
                    DateFormat.YearAndMonth
                  )} - ${formatCustomDateOption(
                    value.duration?.end,
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

export default SPWorkExperience;

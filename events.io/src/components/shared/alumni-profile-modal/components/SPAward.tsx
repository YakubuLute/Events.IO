'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
// import VerifiedIcon from '@mui/icons-material/Verified';

import SeeMoreBtns from '@/components/shared/alumni-profile-modal/components/SeeMoreBtns';
import { formatCustomDateOption, DateFormat, truncateString } from '@/utils';

// import styles from './SPCertification.module.scss';
import styles from './SPWorkExperience.module.scss';

import { CandidateAwards } from '@/hooks/candidate/dtos';

interface AwardeData {
  value: CandidateAwards;
}
const SPAward: React.FC<AwardeData> = ({ value }) => {
  const [seeMore, setSeeMore] = useState<boolean>(true);

  return (
    <Box>
      <Box className={styles.container}>
        <div className={styles.employmentItem}>
          <div className={styles.employmentInfor}>
            <div className={styles.employmentIcon}>
              <Image
                src={value['img'] || '/images/honors-avatar.svg'}
                alt={`${value.title} Award Honors logo`}
                width={30} height={30} />
            </div>

            <div className={styles.employmentDetail + ' b-b'}>
              <div className={styles.iconWrapper}>
                <h4 className={styles.employmentTitle}>{value.title}</h4>
                {/* {value.employerVerified && <VerifiedIcon className={styles.verifiedIcon} />} */}
              </div>
              <p className={styles.employmentCompany}>
                {value.associatedWorkExperienceName}
              </p>
              <p className={styles.employmentDate}>
                <span>
                  Issued {`${formatCustomDateOption(value.issueDate, DateFormat.YearAndMonth)}`}
                </span>
              </p>
              <p className={styles.employmentDate}>
                <span> credential Id </span>
                {`${value.associatedWorkExperienceId || 'N/A'}`}
              </p>
              <p className={styles.employmentContent}>
                {seeMore ? truncateString(value?.description || '', 300) : value?.description || 'No description provided'}
              </p>

              {value?.description?.length > 300 && (
                <SeeMoreBtns
                  seeMore={seeMore}
                  handleSeeMore={(value: boolean) => setSeeMore(value)}
                />
              )}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default SPAward;

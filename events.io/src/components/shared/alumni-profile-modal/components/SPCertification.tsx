'use client';
import Image from 'next/image';
import { Box } from '@mui/material';
// import VerifiedIcon from '@mui/icons-material/Verified';

import { formatCustomDateOption, DateFormat } from '@/utils';
import styles from './SPWorkExperience.module.scss';

import { CandidateCertification } from '@/hooks/candidate/dtos';

interface ExperienceData {
  value: CandidateCertification;
}

const SPCertification: React.FC<ExperienceData> = ({ value }) => {

  return (
    <Box>
      <Box className={styles.container}>
        <div className={styles.employmentItem}>
          <div className={styles.employmentInfor}>
            <div className={styles.employmentIcon}>
              <Image
                src={value['img'] || '/images/education-avatar.svg'}
                alt={`${value.name} certification papper`}
                width={30} height={30} />
            </div>
            <div className={styles.employmentDetail + ' b-b'}>
              <div className={styles.iconWrapper}>
                <h4 className={styles.employmentTitle}>{value.name}</h4>
                {/* {value.employerVerified && <VerifiedIcon className={styles.verifiedIcon} />} */}
              </div>
              <p className={styles.employmentCompany}>
                {value.issuerName} {/*<span>• {value['country']}</span>*/}
              </p>
              <p className={styles.employmentDate}>
                <span>
                  Isued {`${formatCustomDateOption(value.expirationDate, DateFormat.YearAndMonth)} - ${formatCustomDateOption(value.expirationDate, DateFormat.YearAndMonth)}`}
                </span>
              </p>
              <p className={styles.employmentDate}>
                <span>credential Id </span>
                {`${value.issuerId || 'N/A'}`}
              </p>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default SPCertification;

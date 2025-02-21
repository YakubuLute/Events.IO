import React from 'react';
import { Typography } from '@mui/material';

import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import styles from './styles.module.scss';

type Props = {
  emProfile: EmployerDetailsDataDTO;
};

const EmOverview = ({ emProfile }: Props) => {
  return (
    <div className={styles.overviewWrapper}>
      <Typography className={styles.titleText}>
        About {emProfile?.employerName}
      </Typography>
      <Typography
        className={styles.aboutText}
        component="div"
        dangerouslySetInnerHTML={{ __html: emProfile?.about }}
      />
    </div>
  );
};

export default EmOverview;

import React from 'react';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';

import { LocationCircleIcon } from '@/components/shared/SVG-components';
import CustomLinkLogo from '@/components/shared/SVG-components/CustomLinkLogo';
import EmailAltIcon from '@/components/shared/SVG-components/EmailAltIcon';
import TelephoneIcon from '@/components/shared/SVG-components/TelephoneIcon';
import { EmployerDetailsDataDTO } from '@/hooks/employer/dtos';
import { SocialIcons } from '@/constants/shared/shared-constants';
import styles from './styles.module.scss';

type Props = {
  emProfile: EmployerDetailsDataDTO;
};

const EmProfileInfo = ({ emProfile }: Props) => {
  const getSocialLinks = () => {
    const socialLinks: React.ReactNode[] = [];

    Object.keys(emProfile.socialLinks).forEach((social) => {
      const link = (
        <Link
          href={emProfile.socialLinks[social] || ''}
          target="_blank"
          rel="noreferrer"
          key={social}
        >
          <IconButton
            aria-label={`${social} logo`}
            size="small"
            className={styles.socialBtn}
          >
            {SocialIcons[social.toUpperCase()]}
          </IconButton>
        </Link>
      );
      socialLinks.push(link);
    });
    return socialLinks.length ? socialLinks : null;
  };

  return (
    <div className={styles.infoContainer}>
      <Typography component="h2" className={styles.titleText}>
        Contact Information
      </Typography>
      <div className={styles.infoWrapper}>
        <div className={styles.infoItem}>
          <CustomLinkLogo />
          <Link
            href={emProfile?.website || ''}
            target="_blank"
            rel="noreferrer"
          >
            <Typography component="h6" className={styles.text}>
              {emProfile?.website}
            </Typography>
          </Link>
        </div>
        <div className={styles.infoItem}>
          <EmailAltIcon />
          <Typography component="h6" className={styles.text}>
            {emProfile?.email}
          </Typography>
        </div>
        <div className={styles.infoItem}>
          <TelephoneIcon />
          <Typography component="h6" className={styles.text}>
            {emProfile?.phoneNumber}
          </Typography>
        </div>
        <div className={styles.infoItem}>
          <LocationCircleIcon />
          <Typography component="h6" className={styles.text}>
            {emProfile?.location?.city}, {emProfile?.location?.country}
          </Typography>
        </div>
        <div className={styles.socialBox}>
          <Typography className={styles.socialText}>Social Links</Typography>
          <div className={styles.socialWrapper}>{getSocialLinks()}</div>
        </div>
      </div>
    </div>
  );
};

export default EmProfileInfo;

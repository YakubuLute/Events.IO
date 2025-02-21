import React, { useState } from 'react';
import Link from 'next/link';
import { IconButton, Typography } from '@mui/material';

import { LocationCircleIcon } from '@/components/shared/SVG-components';
import CustomLinkLogo from '@/components/shared/SVG-components/CustomLinkLogo';
import EmailAltIcon from '@/components/shared/SVG-components/EmailAltIcon';
import TelephoneIcon from '@/components/shared/SVG-components/TelephoneIcon';
import { UniversityFullProfileResponseDTO } from '@/hooks/university';
import { SocialIcons } from '@/constants/shared/shared-constants';
import { truncateString } from '@/utils';
import ShowMoreButton from '../show-more';
import styles from './styles.module.scss';

type Props = {
  uniProfile: UniversityFullProfileResponseDTO;
};

const UniProfileInfo = ({ uniProfile }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const getSocialLinks = () => {
    const socialLinks: React.ReactNode[] = [];

    Object.keys(uniProfile.socialLinks).forEach((social) => {
      const link = (
        <Link
          href={uniProfile.socialLinks[social] || ''}
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

  const onShowMore = () => {
    setShowMore((state) => !state);
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <Typography component="h2" className={styles.titleText}>
          Contact Information
        </Typography>
        <div className={styles.infoWrapper}>
          <div className={styles.infoItem}>
            <CustomLinkLogo />
            <Link
              href={uniProfile?.website || ''}
              target="_blank"
              rel="noreferrer"
            >
              <Typography component="h6" className={styles.text}>
                {uniProfile?.website}
              </Typography>
            </Link>
          </div>
          <div className={styles.infoItem}>
            <EmailAltIcon />
            <Typography component="h6" className={styles.text}>
              {uniProfile?.email}
            </Typography>
          </div>
          <div className={styles.infoItem}>
            <TelephoneIcon />
            <Typography component="h6" className={styles.text}>
              {uniProfile?.phoneNumber}
            </Typography>
          </div>
          <div className={styles.infoItem}>
            <LocationCircleIcon />
            <Typography component="h6" className={styles.text}>
              {uniProfile?.location.city}, {uniProfile?.location.country}
            </Typography>
          </div>
          <div className={styles.socialBox}>
            <Typography className={styles.socialText}>Social Links</Typography>
            <div className={styles.socialWrapper}>{getSocialLinks()}</div>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <Typography component="h2" className={styles.titleText}>
          About
        </Typography>
        <div className={styles.infoWrapper}>
          <Typography className={styles.aboutText}>
            {!showMore
              ? truncateString(uniProfile?.about || '', 400)
              : uniProfile?.about || ''}
          </Typography>
          {uniProfile?.about && uniProfile?.about?.length > 400 ? (
            <ShowMoreButton onShowMore={onShowMore} showMore={showMore} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UniProfileInfo;

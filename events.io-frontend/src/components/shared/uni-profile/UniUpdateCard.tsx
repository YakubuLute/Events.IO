import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import moment from 'moment';

import { SchoolUpdateResponse } from '@/hooks/university';
import { removeHtmlTags } from '@/utils';
import styles from './styles.module.scss';

type Props = {
  update: SchoolUpdateResponse;
  platform: 'candidate' | 'university' | 'employer';
  showAllContent?: boolean;
};

const UniUpdateCard = ({ update, showAllContent, platform }: Props) => {
  return (
    <div className={styles.updateCard}>
      <div className={styles.dividerBox}>
        <div className={styles.typeWrapper}>
          <span
            className={[styles.statusBox, styles[update?.type]].join(' ')}
          ></span>
          <Typography component="h6">{update?.type}</Typography>
        </div>
        <Typography className={styles.dateText}>
          {moment(update?.dateCreated).format('Do MMM, YYYY')}
        </Typography>
      </div>
      <div className={styles.contentWrapper}>
        {platform === 'candidate' ? (
          <Link href={`/candidate/schools/updates/${update._id}`}>
            <Typography component="h2">
              {update?.title || 'No title'}
            </Typography>
          </Link>
        ) : null}

        {platform === 'university' ? (
          <Link href={`/university/updates/${update._id}`}>
            <Typography component="h2">
              {update?.title || 'No title'}
            </Typography>
          </Link>
        ) : null}

        {!showAllContent ? (
          <Typography className={styles.contentText}>
            {removeHtmlTags(update?.body, 30)}
          </Typography>
        ) : (
          <Typography
            component="div"
            className={styles.contentText}
            dangerouslySetInnerHTML={{ __html: update?.body }}
          />
        )}
      </div>
    </div>
  );
};

export default UniUpdateCard;

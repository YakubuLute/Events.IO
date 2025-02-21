import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';

import styles from './styles.module.scss';

type Props = {
  onShowMore: () => void;
  showMore: boolean;
  text?: string;
};

const ShowMoreButton = ({ onShowMore, showMore, text }: Props) => {
  return (
    <button onClick={onShowMore} className={styles.seeMoreBtn}>
      <Typography variant="body2">
        Show {showMore ? 'Less' : 'More'} {text}
      </Typography>
      <KeyboardArrowDownIcon
        className={[styles.arrowIcon, showMore ? styles.open : null].join(' ')}
      />
    </button>
  );
};

export default ShowMoreButton;

import React, { FC } from 'react';
import { Button } from '@mui/material';

import ArrowBackGrey from '../messages/icons/arrowBackGrey';
import styles from './backButton.module.scss';

interface props {
  onClick?: () => void;
  className?: string;
}

const BackButton: FC<props> = ({ onClick, className, ...rest }) => {
  return (
    <Button {...rest} className={`${styles.btn_wrapper} ${className}`} onClick={onClick}>
      <ArrowBackGrey />
    </Button>
  );
};

export default BackButton;

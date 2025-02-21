import React from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';

import AppleSpinner from '../SVG-components/AppleSpinner';
import styles from './toast.module.scss';

type Props = {
  color: 'success' | 'error';
  title?: string;
  message: string;
};

const ToastBox = ({ color, message, title }: Props) => {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.iconBox}>
        <div className={[styles.icon, styles[color]].join(' ')}>
          <Image
            src={color === 'success' ? '/icons/check.svg' : '/icons/x.svg'}
            alt="success-icon"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={styles.textBox}>
        <Typography variant="h4" component="h4">
          {title ? title : color === 'success' ? 'Awesome!' : 'Too Bad!'}
        </Typography>
        <Typography variant="body2" component="p">
          {message}
        </Typography>
      </div>
    </div>
  );
};

export const ToastBoxLoading = ({ color, message }: Props) => {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.iconBox}>
        <div className={[styles.icon, styles[color]].join(' ')}>
          <AppleSpinner />
        </div>
      </div>
      <div className={styles.textBox}>
        <Typography variant="h4" component="h4">
          Please wait...
        </Typography>
        <Typography variant="body2" component="p">
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default ToastBox;

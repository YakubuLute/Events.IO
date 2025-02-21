'use client';
import React from 'react';
import { Alert } from '@mui/material';
import styles from './alertBox.module.scss';

interface AlertBoxProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  variant?: 'outlined' | 'filled';
  alertClass?: string;
  children?: React.ReactNode;
}

const AlertBox: React.FC<AlertBoxProps> = (props) => {
  const { severity, variant = 'filled', children, alertClass } = props;

  return (
    <Alert
      severity={severity}
      variant={variant}
      className={alertClass ? styles[alertClass] : 'alert-box'}
    >
      {children}
    </Alert>
  );
};

export default AlertBox;

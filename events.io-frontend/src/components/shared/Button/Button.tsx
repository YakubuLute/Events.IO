import { ElementType } from 'react';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import { ButtonClasses, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import styles from './button.module.scss';

// import Button from '@mui/material/Button';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  variant?: 'text' | 'contained' | 'outlined';
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  color?:
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';
  buttonClass?: string;
  selectedClass?: string;
  hasLink?: boolean;
  textColor?: string;
  disabledClass?: string;
  disableRipple?: boolean; // This props remove all the default stlye of the button
  isLoading?: boolean;
  loadingPosition?: 'start' | 'end';
  sx?: SxProps<Theme> | undefined;
  className?: string;
  autoFocus?: boolean;
  classes?: Partial<ButtonClasses> & {
    root?: string | undefined;
  };
  LinkComponent?: ElementType<any> | undefined;
  href?: string | undefined;
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  isLoading,
  buttonClass = '',
  selectedClass = '',
  hasLink = false,
  disabledClass = 'desabled_bg',
  sx,
  className,
  classes,
  href,
  ...props
}) => {

  const url = href ? href : '#';

  return (
    <LoadingButton
      sx={{
        ...sx,
        '&.Mui-disabled span': {
          filter:
            'invert(52%) sepia(8%) saturate(155%) hue-rotate(216deg) brightness(134%) contrast(44%)',
        },
      }}
      variant={variant}
      href={href}
      loading={isLoading}
      className={`${styles[buttonClass]} ${styles[selectedClass]} ${className}`}
      classes={{
        ...classes,
        root: styles[buttonClass],
        disabled: styles[disabledClass], // Interpolate variables
      }}
      {...props}
    >
      {hasLink ? (
        <Link href={url} className={styles.btn_link}>
          {props.label}
        </Link>
      ) : (
        props.label
      )}
    </LoadingButton>
  );
};

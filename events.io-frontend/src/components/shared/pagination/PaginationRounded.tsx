import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { SxProps } from '@mui/system';

interface PaginationProps {
  count: number; // The total number of pages.
  defaultPage?: number;
  page?: number; // The current page.
  siblingCount?: number; // 0=3, 1=5, 2=7, 3=9 The maximum number of page buttons to show on either side of the current page.
  boundaryCount?: number;
  variant?: 'text' | 'outlined';
  shape?: 'circular' | 'rounded';
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  color?: 'primary' | 'secondary' | 'standard';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  showLastButton?: boolean;
  hideNextButton?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  // sx?: React.CSSProperties;
  sx?: SxProps;
}

export const PaginationRounded: React.FC<PaginationProps> = ({ ...props }) => {
  return (
    <Pagination
      count={props.count}
      page={props.page || 1}
      defaultPage={props.defaultPage || 1}
      siblingCount={props.siblingCount || 1}
      variant={props.variant && props.variant}
      shape={props.shape && props.shape}
      onChange={props.onChange}
      color={props.color || 'primary'}
      size={props.size && props.size}
      disabled={props.disabled || false}
      className={props.className}
      sx={props.sx}
    />
  );
}

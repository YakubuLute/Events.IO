import { ChangeEvent } from 'react';
import { Theme } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { SxProps } from '@mui/system';

import styles from './CustomCheckbox.module.scss';

interface MuiCheckboxProps extends CheckboxProps {
  // value?: string;
  // defaultChecked?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'default';
  size?: 'small' | 'medium';
  checkboxClass?: string;
  onChange?:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  inputRef?: React.RefObject<HTMLInputElement>;
  sx?: SxProps<Theme> | undefined;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const CustomCheckbox: React.FC<MuiCheckboxProps> = ({
  defaultChecked,
  color = 'default',
  checkboxClass,
  ...props
}) => {
  return (
    <Checkbox
      {...label}
      color={color}
      className={checkboxClass ? styles[checkboxClass] : ''}
      checked={Boolean(defaultChecked)}
      {...props}
    />
  );
};

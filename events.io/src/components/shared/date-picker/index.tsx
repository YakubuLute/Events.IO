/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DateView } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface props {
  disabled?: boolean;
  views?: readonly DateView[] | undefined;
  format?: string | undefined;
  className?: string | undefined;
  placeholder?: string | undefined;
  onChange: (value: string) => void;
  value: string;
}

const CustomDatePickerAlt: FC<props> = ({
  disabled = false,
  views = ['year', 'month', 'day'],
  format = 'DD-MM-YYYY',
  className,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerStyled
        views={views}
        value={value}
        defaultValue={value}
        onChange={(date) => {
          onChange(date as string);
        }}
        format={format}
        slotProps={{
          textField: {
            size: 'small',
            placeholder: placeholder ?? undefined,
          },
        }}
        disabled={disabled}
        className={className}
      />
    </LocalizationProvider>
  );
};

const DatePickerStyled = styled(DatePicker)({
  width: '100%',
  '& .MuiInputBase-root': {
    flexDirection: 'row-reverse',
    padding: 0,
    backgroundColor: '#ffffff',
  },
  '& .MuiStack-root': {
    padding: 0,
    margin: 0,
  },
  '& .MuiButtonBase-root': {
    borderRight: '1px solid #ECECED',
    border: '1px solid #ECECED',
    borderRadius: '12px 0px 0px 12px',
    marginRight: 0,
    backgroundColor: '#ffffff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiInputBase-input': {
    // backgroundColor: '#fff',
    border: '1px solid #ECECED',
    backgroundColor: '#ffffff',
    borderRadius: '12px 12px 12px 12px',
    '@media (min-width: 992px)': {
      borderRadius: '0px 12px 12px 0px',
    },
  },
  '& .MuiInputAdornment-root': {
    margin: 0,
  },
  '& .MuiFormControl-root': {
    maxWidth: '100%',
    width: '100%',
  },
});

export default CustomDatePickerAlt;

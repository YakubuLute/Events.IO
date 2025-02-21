/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DateView, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller } from 'react-hook-form';

interface props {
  name: string;
  control:
    | Control<{
        [key: string]: string | number | boolean | undefined;
      }>
    | any;
  disabled?: boolean;
  views?: readonly DateView[] | undefined;
  format?: string | undefined;
  className?: string | undefined;
  placeholder?: string | undefined;
}

const CustomDatePicker: FC<props> = ({
  control,
  name,
  disabled = false,
  views = ['year', 'month', 'day'],
  format = 'DD-MM-YYYY',
  className,
  placeholder,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const formatDate = value ? dayjs(value) : value; // when there's no value, it should just show the placeholder instead of showing current date
          return (
            <DatePickerStyled
              views={views}
              value={formatDate}
              defaultValue={value}
              onChange={(event: Dayjs | unknown) => {
                onChange(dayjs(event as Dayjs).format('YYYY/MM/DD'));
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
          );
        }}
      />
    </LocalizationProvider>
  );
};

export const CustomTimePicker: FC<props> = ({
  control,
  name,
  disabled = false,
  className,
  placeholder,
  format,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const formatDate = value ? dayjs(value) : value; // when there's no value, it should just show the placeholder instead of showing current date
          return (
            <TimePickerStyled
              value={formatDate}
              defaultValue={value}
              onChange={(event: Dayjs | unknown) => {
                onChange(dayjs(event as Dayjs).format('HH:mm'));
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  placeholder: placeholder ?? undefined,
                },
              }}
              disabled={disabled}
              className={className}
              format={format || 'HH:mm'}
              views={['hours', 'minutes']}
              ampm={false}
            />
          );
        }}
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

const TimePickerStyled = styled(TimePicker)({
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

export default CustomDatePicker;

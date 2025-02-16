/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { FC } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';
import { Control, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { DateView } from '@mui/x-date-pickers';

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

const CustomStudentDatePicker: FC<props> = ({
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
      <DemoContainer
        components={['DatePicker']}
        sx={{
          '&.MuiStack-root': {
            padding: '0px !important',
          },
          '& .MuiTextField-root': {
            width: '100%',
            maxWidth: '100% !important',
            backgroundColor: '#fafafb',
            minWidth: '70px !important',
            padding: '0px !important',
          },
          '& MuiFormControl-root': {
            padding: 0,
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePickerStyled
              views={views}
            //   value={value || null}
              onChange={(event: Dayjs | unknown) => {
                onChange(dayjs(event as Dayjs));
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
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

const DatePickerStyled = styled(DatePicker)({
  maxWidth: '100%',
  '& .MuiInputBase-root': {
    flexDirection: 'row-reverse',
    padding: 0,
    backgroundColor: '#fafafb',
  },
  '& .MuiStack-root': {
    padding: 0,
  },
  '& .MuiButtonBase-root': {
    borderRight: '1px solid #ECECED',
    border: '1px solid #ECECED',
    borderRadius: 0,
    marginRight: 0,
    backgroundColor: 'rgba(135, 150, 165, 0.075)',
    padding: 0,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '& .MuiInputBase-input': {
    // backgroundColor: '#fff',
    border: '1px solid #ECECED',
    backgroundColor: '#fafafb',
    paddingLeft: '1px',
  },
  '& .MuiInputAdornment-root': {
    margin: 0,
  },
  '& .MuiFormControl-root': {
    maxWidth: '100%',
    width: '100%',
  },
});

export default CustomStudentDatePicker;

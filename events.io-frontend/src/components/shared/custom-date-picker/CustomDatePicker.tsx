import * as React from 'react';
import { SxProps } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateValidationError, DateView } from '@mui/x-date-pickers/models';
import dayjs, { Dayjs } from 'dayjs';

import styles from './date-picker.module.scss';

type DatePickersProps = {
  label?: React.ReactNode;
  value: string; //Dayjs | null;
  defaultValue?: dayjs.Dayjs;
  views?: readonly DateView[] | undefined;
  format?: string | undefined;
  date?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange: (date: Dayjs, context?: FieldChangeHandlerContext<string>) => void;
  onError?: (error: DateValidationError | null, value?: string) => void;
  helperText?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  disablePast?: boolean;
  loading?: boolean;
  renderLoading?: () => React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  sx?: SxProps;
};

export const CustomDatePicker: React.FC<DatePickersProps> = (props) => {
  const {
    defaultValue,
    value,
    inputRef,
    disabled = false,
    views = ['year', 'month', 'day'],
    format = 'DD/MM/YYYY',
    className = 'default_date_picker',
    onChange,
    onError,
    sx = {
      pt: 0,
      '& .MuiTextField-root': {
        width: '100%',
        minWidth: '170px !important',
        maxWidth: '100% !important',
        height: '100% !important', // Solve the over height problem when the helperText is displayed
        // bagColor: '#fafafb',
      },
    },
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={sx}>
        <DatePicker
          label={props.label}
          format={format}
          views={views}
          inputRef={inputRef}
          defaultValue={dayjs(defaultValue)}
          value={dayjs(value)}
          onChange={(event: Dayjs | null) => {
            onChange(dayjs(event as Dayjs));
            //   onChange(dayjs(event as Dayjs).format(format));
          }}
          onError={(error) => onError && onError(error as DateValidationError)}
          disabled={disabled}
          className={styles[className]}
          disablePast={props.disablePast}
          slotProps={{
            textField: {
              helperText: props.helperText,
              size: 'small',
              error: false, // Remove strange red border when the defaultValue or value is an empty string
            },
          }}
          sx={{
            height: '13px',
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

// defaultValue={today}const today = dayjs();
// const twoPM = dayjs().set('hour', 14).startOf('hour');
// const threePM = dayjs().set('hour', 15).startOf('hour');

import * as React from 'react';
import { SxProps } from '@mui/system';
import { FieldSelectedSections } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeValidationError, TimeView } from '@mui/x-date-pickers/models';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs, { Dayjs } from 'dayjs';

import styles from './time-picker.module.scss';

type TimePickersProps = {
  label?: React.ReactNode;
  value: string; // Dayjs | null;
  defaultValue?: dayjs.Dayjs;
  ampm?: boolean;
  format?: string;
  views?: readonly TimeView[] | undefined;
  date?: string;
  className?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange: (
    value: Dayjs | null,
    context?: FieldChangeHandlerContext<string>
  ) => void;
  onError?: (error: TimeValidationError | null, value?: string) => void;
  helperText?: string;
  loading?: boolean;
  renderLoading?: () => React.ReactNode;
  // onClose?: () => void;
  // onOpen?: () => void;
  // onSelectedSectionsChange?: (date: dayjs.Dayjs) => void;
  onSelectedSectionsChange?: (newValue: FieldSelectedSections) => void;
  rightArrowIcon?: React.ReactNode;
  sx?: SxProps;
};

export const CustomerTimePicker: React.FC<TimePickersProps> = (props) => {
  const {
    defaultValue,
    value,
    inputRef,
    disabled = false,
    views = ['hours', 'minutes', 'seconds'],
    format,
    className = 'default_time_picker',
    onChange,
    onError,
    sx = {
      pt: 0,
      '& .MuiTextField-root': {
        minWidth: '130px !important',
        maxWidth: '100% !important',
      },
    },
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']} sx={sx}>
        <TimePicker
          label={props.label}
          format={format}
          views={views}
          inputRef={inputRef}
          // Convert empty string values to null To prevent the components from displaying a red border when the defaultValue or value is an empty string
          defaultValue={defaultValue ? dayjs(defaultValue) : null}
          value={value ? dayjs(value) : null}
          ampm={props.ampm}
          onChange={(date) => onChange(date as dayjs.Dayjs)}
          onError={(error) => onError && onError(error as TimeValidationError)}
          disabled={disabled}
          onSelectedSectionsChange={props.onSelectedSectionsChange}
          className={styles[className]}
          viewRenderers={{
            hours: renderTimeViewClock,
            // minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slotProps={{
            textField: {
              helperText: props.helperText,
              size: 'small',
              // error: false,
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

// onChange={(date, context) => {
//   if (date) {
//     console.log('Selected Date/Time:', date);
//     props.onChange(date, context);
//   }
// }}
// onError={(error, value) => {
//   console.log('error', error, 'value', value);
//   props.onError(error, value);
// }}
// defaultValue={dayjs('2022-04-17T15:30')} // {dayjs('2022-07-17')}
// views={['year', 'month', 'day', 'hours', 'minutes']}

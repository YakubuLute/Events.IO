import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Stack, SxProps } from '@mui/system';
import DatePicker, { DateObject, Value } from 'react-multi-date-picker';

import styles from './select-range.module.scss';

interface Props {
  values: Value | undefined;
  onChange: (selectedDates: DateObject | DateObject[] | null) => false | void;
  placeholder: string;
  format?: string;
  sx?: SxProps;
  className?: string;
}

const SelectRangeDate = (props: Props) => {
  const { values, onChange, placeholder, format } = props;
  return (
    <Stack
      className={styles.date_container}
      direction="row"
      spacing={2}
      alignItems={'center'}
      position={'relative'}
      width={'100%'}
    >
      <CalendarTodayIcon
        sx={{ position: 'absolute', left: 10, color: '#4F4B5C' }}
      />
      <DatePicker
        value={values}
        onChange={onChange}
        format={format}
        range
        placeholder={placeholder}
        inputClass={styles.date_picker}
      />
    </Stack>
  );
};

export default SelectRangeDate;

import { MenuItem, Select } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  options: { label: string; value: string | number | boolean }[];
  value: string | string[] | undefined;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  placeholder?: string;
}

function getStyles(name: string, personName: string[]) {
  return {
    fontWeight: personName.indexOf(name) !== -1 && 700,
    background: personName.indexOf(name) !== -1 && 'rgba(25, 118, 210, 0.08)',
  };
}

const CustomMultipleSelect: FC<Props> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value as string}
      style={{
        height: 40,
      }}
      label={''}
      onChange={onChange}
      multiple
      fullWidth
      // className={styles.select_multipl_wrapper} 
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          value={option.value}
          style={getStyles(option.value, value)}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomMultipleSelect;

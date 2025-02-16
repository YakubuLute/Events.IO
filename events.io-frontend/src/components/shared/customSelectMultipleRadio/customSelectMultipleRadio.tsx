import React, { FC } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface props {
  options: { label: string; value: string | boolean }[];
  value: string | string[] | boolean;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label?: string;
  row?: boolean;
}

const CustomSelectMultipleRadio: FC<props> = ({
  options,
  label,
  value,
  onChange,
  row,
}) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        onChange={onChange}
        name="radio-buttons-group"
        row={row}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomSelectMultipleRadio;

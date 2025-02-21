import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { FC } from 'react';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  options: { label: string; value: string | Date }[];
}

export const CustomFilterRadioCheck: FC<Props> = ({
  onChange,
  value,
  options,
}) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio checked={!!(option.value == value)} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

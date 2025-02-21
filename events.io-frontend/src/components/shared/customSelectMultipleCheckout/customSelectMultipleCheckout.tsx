'use client';

import React, { FC, useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
} from '@mui/material';
import { Control, UseFormSetValue } from 'react-hook-form';

import styles from './custom-select.module.scss';

type optionProps = {
  label: string;
  value: string;
};

interface props {
  name: string;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  options: optionProps[];
  className?: string;
  label?: string;
  disabled?: boolean;
  value: string[];
  onChange: (value: any) => void;
}

const CustomSelectMultipleCheckout: FC<props> = ({
  options,
  name,
  setValue,
  value: initialValue,
  label,
  disabled,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    initialValue || []
  );

  const handleSelect = (value: string) => {
    setSelectedItems((prevItems: string[]) => {
      const isPresent = prevItems?.indexOf(value);
      if (isPresent !== -1) {
        const remaining = prevItems?.filter((item: string) => item !== value);
        setValue(name, remaining); // Update immediately
        onChange(remaining);
        return remaining;
      } else {
        const updatedItems = [...prevItems, value];
        setValue(name, updatedItems);
        onChange(updatedItems);
        return updatedItems;
      }
    });
  };

  useEffect(() => {
    setValue(name, selectedItems);
    onChange(selectedItems); // Notify parent component about the change
  }, [name, selectedItems, setValue, onChange]);

  // console.log('Value ', initialValue);

  return (
    <FormControl>
      {label && (
        <FormLabel
          id="demo-radio-buttons-group-label"
          className={styles.labelText}
        >
          {label}
        </FormLabel>
      )}
      <Stack direction="column">
        {options.map((option, index) => (
          <FormControlLabel
            disabled={disabled}
            key={index}
            value={option.value}
            control={
              <Checkbox
                checked={selectedItems?.includes(option.value)}
                onChange={() => handleSelect(option.value)}
                className={styles.checkBox}
              />
            }
            label={option.label}
            className={styles.labelText}
          />
        ))}
      </Stack>
    </FormControl>
  );
};

export default CustomSelectMultipleCheckout;

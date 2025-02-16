'use client';
import React, { ChangeEventHandler } from 'react';
import VStack from '../stacks/VStack';
import { TextField, Typography } from '@mui/material';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  parentClass?: string;
  labelClass?: string;
  labelId?: string;
  inputClass?: string;
  inputId?: string;
  inputTextClass?: string;
  inputTextId?: string;
  label: string;
  placeholder: string;
  paddingClass?: string;
  paddingId?: string;
  value?: string;
};

const LabelTextField = (props: Props) => {
  const {
    onChange,
    parentClass,
    labelClass,
    inputClass,
    inputTextClass,
    label,
    placeholder,
    paddingClass,
    labelId,
    inputId,
    inputTextId,
    paddingId,
    value,
  } = props;
  return (
    <VStack className={parentClass}>
      <Typography className={labelClass} id={labelId}>
        {label}
      </Typography>
      <TextField
        InputProps={{
          className: inputTextClass,
          id: inputTextId,
          classes: { input: paddingClass },
        }}
        className={inputClass}
        value={value}
        id={inputId}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{
          id: paddingId,
        }}
      />
    </VStack>
  );
};

export default LabelTextField;

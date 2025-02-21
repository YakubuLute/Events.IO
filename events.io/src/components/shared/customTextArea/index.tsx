import React from 'react';
import { TextField } from '@mui/material';

interface props {
  className?: string;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

const CustomTextArea = ({
  className,
  value,
  onBlur,
  onChange,
  rows,
  placeholder,
  disabled,
}: props) => {
  return (
    <TextField
      type="text"
      variant="outlined"
      multiline
      rows={rows}
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
        },
        '&.MuiFormControl-root': {
          width: '100%',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ECECED',
        },
        // Custom ScrollBar
        '& .MuiInputBase-input': {
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#ececec',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--text)',
            borderRadius: 0,
          },
          '&::placeholder': {
            color: 'var(--text)',
            fontSize: '14px',
          },
        },
      }}
      inputProps={{
        style: {
          resize: 'both',
        },
      }}
      disabled={disabled}
    />
  );
};

export default CustomTextArea;

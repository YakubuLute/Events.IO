import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Radio from '@mui/joy/Radio';
import { Box, Radio } from '@mui/material';
import { SxProps } from '@mui/system';

interface RadioProps {
  name: string;
  value: string | number | boolean; // This should accept all the type any
  defaultPage?: number;
  variant?: 'outlined' | 'soft' | 'solid' | 'plain';
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
  defaultChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  // slots?: {
  //   input?: React.HTMLAttributes<HTMLDivElement>;
  // };
  // slots?: { action?: elementType, icon?: elementType, input?: elementType, label?: elementType, radio?: elementType, root?: elementType };
  slots?: { action?: React.ElementType, icon?: React.ElementType, input?: React.ElementType, label?: React.ElementType, radio?: React.ElementType, root?: React.ElementType };
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  sx?: SxProps;
}

export const RadioButtons: React.FC<RadioProps> = (props) => {
  // const [selectedValue, setSelectedValue] = React.useState('a');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Radio
        variant={props.variant}
        name={props.name}
        label={props.label}
        // checked={selectedValue === 'a'}
        value={props.value}
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
        size={props.size || 'md'}
        checkedIcon={props.checkedIcon}
        uncheckedIcon={props.uncheckedIcon}
        slotProps={{ input: { 'aria-label': 'A' } }}
      />
    </Box>
  );
}
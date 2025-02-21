import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface SliderProps {
  ariaLabelledby?: string; // The id of the element containing a label for the slider.
  getAriaLabel?: (index?: number) => string;
  value: Array<number> | number;
  defaultValue?: string;
  hasArrFixedValue?: number;
  onChange?: (event: Event, newValue: number | number[], activeThumb?: number) => void; // activeThumb = Index of the currently moved thumb.
  marks?: Array<{ label?: React.ReactNode, value: number }> | boolean;
  valueLabelDisplay?: "on" | "auto" | "off";
  color?: 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
  size?: 'small' | 'medium';
  disabled?: boolean;
  className?: string;
  // ref?: React.Ref<HTMLInputElement>; 
}

const defaultMarks = [
  { value: 0, label: "0%" },
  { value: 100, label: "100%" }
];

function valuetext(value: number) {
  return `${value}%`;
}

export const RangeSlider: React.FC<SliderProps> = ({ hasArrFixedValue, ...props}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    // Ensure that the second value is always 100
    const updatedValue = Array.isArray(newValue) ? [newValue[0], hasArrFixedValue ?? 100] : [newValue, props.hasArrFixedValue ?? 100];
    props.onChange && props.onChange(event, updatedValue);
  };

  return (
    <Box sx={{ width: 300, pt: 4 }}>
      <Slider
        getAriaLabel={props.getAriaLabel}
        value={props.value}
        // value={[20, 37]}
        onChange={Boolean(hasArrFixedValue) ? handleChange : props.onChange}
        getAriaValueText={valuetext}
        valueLabelDisplay={props.valueLabelDisplay || "on"}
        step={10}
        marks={props.marks || defaultMarks}
        color={props.color || 'success'}
        size={props.size || 'medium'}
        classes={{ root: 'range_slider' }}
        disabled={props.disabled || false}
        sx={{
          '& .MuiSlider-valueLabel': {
            lineHeight: '1',
            fontSize: '10px',
            background: 'unset',
            padding: '0',
            width: '24px',
            height: '24px',
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#6FDAA6',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, 100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
              transform: 'translate(50%, -80%) rotate(-45deg) scale(1)',
            },
            '& > *': {
              transform: 'rotate(45deg)',
            },
          },
        }}
      />
    </Box>
  );
}

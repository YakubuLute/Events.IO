import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const CustomSlider = ({ defaultValue, ariaLabel, valueLabelDisplay, value, onChange}) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={defaultValue} aria-label={ariaLabel} valueLabelDisplay={valueLabelDisplay} onChange={onChange}  value={value}  sx={{
          color: '#0A9C55',
        }}/>
    </Box>
  );
};


export default CustomSlider;

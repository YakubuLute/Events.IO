import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  errors?: {
    [key: string]: {
      message?: string;
    };
  };
  name: string;
}

function Error({ errors, name }: Props) {
  return (
    errors?.[name] && (
      <Typography className="fs-14 text-danger">
        {errors?.[name]?.message}
      </Typography>
    )
  );
}

export default Error;

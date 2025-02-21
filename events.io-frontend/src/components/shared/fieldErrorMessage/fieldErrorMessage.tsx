/* eslint-disable  @typescript-eslint/no-explicit-any */

import React, { CSSProperties, FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';

interface props {
  children: React.ReactNode;
  name: string;
  errors: string | boolean | undefined | any;
  style?: CSSProperties | undefined;
  className?: string;
}

const FieldErrorMessage: FC<props> = ({
  children,
  name,
  errors,
  style,
  className,
}) => {
  return (
    <>
      <div style={style} className={className}>
        {children}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <Typography
            fontSize={12}
            style={{
              color: 'red',
            }}
          >
            {message}
          </Typography>
        )}
      />
    </>
  );
};

export default FieldErrorMessage;

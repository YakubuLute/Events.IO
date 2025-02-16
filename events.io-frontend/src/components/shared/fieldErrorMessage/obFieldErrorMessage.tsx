import React, { CSSProperties, FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
  name: string;
  errors: string | boolean | undefined | any;
  style?: CSSProperties | undefined;
  className?: string;
}

const ObFieldErrorMessage: FC<Props> = ({
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
        render={({ message }: { message: string }) => {
          if (message === 'Expected object, received null') {
            message = 'Invalid Network';
          }
          return (
            <Typography
              fontSize={12}
              style={{
                color: 'red',
              }}
            >
              <>{message}</>
            </Typography>
          );
        }}
      />
    </>
  );
};

export default ObFieldErrorMessage;

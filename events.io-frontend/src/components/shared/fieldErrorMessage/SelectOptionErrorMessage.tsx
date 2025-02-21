import React, { CSSProperties, FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';
import get from 'lodash/get';

interface Props {
  children: React.ReactNode;
  name: string;
  errors: any;
  style?: CSSProperties | undefined;
  className?: string;
}

const SelectOptionErrorMessage: FC<Props> = ({
  children,
  name,
  errors,
  style,
  className,
}) => {
  const getNestedErrorMessage = (error: any): string => {
    if (error == null) return '';
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.label?.message) return error.label.message;
    if (error?.value?.message) return error.value.message;

    if (typeof error === 'object') {
      return Object.values(error)
        .map(getNestedErrorMessage)
        .filter(Boolean)
        .join(', ');
    }

    return '';
  };

  const getErrorForField = (fieldName: string) => {
    const error = get(errors, fieldName);
    return getNestedErrorMessage(error);
  };

  return (
    <>
      <div style={style} className={className}>
        {children}
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={() => {
          const errorMessage = getErrorForField(name);
          return errorMessage ? (
            <Typography
              fontSize={12}
              style={{
                color: 'red',
              }}
            >
              {errorMessage}
            </Typography>
          ) : null;
        }}
      />
    </>
  );
};

export default SelectOptionErrorMessage;

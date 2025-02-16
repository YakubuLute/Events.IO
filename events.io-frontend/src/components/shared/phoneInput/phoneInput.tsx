import React, { FC } from 'react';
import styled from '@emotion/styled';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

interface InputProps {
  value: string | undefined;
  name?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  disabled?: boolean;
}

const PhoneInputField: FC<InputProps> = ({
  value,
  onBlur,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <PhoneInputStyled
      defaultCountry="AE"
      flags={flags}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="input_container"
      disabled={disabled}
    />
  );
};

const PhoneInputStyled = styled(PhoneInput)`
  border-radius: 12px;
  border: 1px solid #ececed;
  width: 100%;
  height: 42px !important;
  background-color: #fafafb;
  padding: 0 10px;
  & input {
    height: 100%;
    border: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: #202020;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  &:hover {
    border: 1px solid transparent;
  }
`;

export default PhoneInputField;

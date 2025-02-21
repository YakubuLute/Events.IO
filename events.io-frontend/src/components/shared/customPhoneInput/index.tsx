import React from 'react';

import { PHONE_CODES } from '@/constants/phoneCodes';
import { CustomSelectInput } from '../customSelectInput/selectInput';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';

const inputCountryCodeStyles = {
  menuList: (base) => ({
    ...base,
    maxHeight: '200px',
    zIndex: 1,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    minWidth: state.selectProps.minWidth,
    color: state.selectProps.menuColor,
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '14px',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '14px',
  }),
};

const DEFAULT_COUNTRY_CODE = {
  label: '🇦🇪 +971',
  value: '+971 United Arab Emirates',
};

type Option = {
  label: string;
  value: string;
};

type Props = {
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: unknown) => void;
};

type CountryCodesProps = Props & {
  id?: string;
  name?: string;
  value: Option;
  disabled?: boolean;
  className?: string;
};

interface PhoneNumberInputProps extends OutlinedInputProps { };

const formatPhoneNumber = (code: Option, str: string) => {
  const phone = str.replace(/^0+/, '');
  const phoneCode = code.value.split(' ')[0];
  return phoneCode + phone;
};

const splitPhoneNumber = (phoneNumber: string) => {
  const arr: string[] = [];
  let codeObj: { value: string; label: string } | null = {
    value: '',
    label: '',
  };
  let phoneStr = '';

  for (const phoneCode of PHONE_CODES) {
    const val = phoneCode.value.replace(
      /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
      ''
    );
    const code = val.split(' ')[0].trim();
    if (phoneNumber?.includes(code)) {
      arr.push(code);
      codeObj = phoneCode;
    }
  }
  if (arr.length > 0) {
    phoneStr = phoneNumber.replace(arr[0], '');
  }
  return { code: codeObj, phone: phoneStr };
};

const CountryCodes = ({
  id,
  name,
  onBlur,
  onChange,
  value,
  disabled,
  className,
}: CountryCodesProps) => {
  return (
    <CustomSelectInput
      id={id || 'phone_code'}
      name={name || 'phone_code'}
      value={value}
      onChange={onChange}
      options={PHONE_CODES}
      placeholder="Select"
      className={className || "fs-14 fw-500 w-full text-sm"}
      classNamePrefix="container_seach_modal"
      styles={inputCountryCodeStyles}
      onBlur={onBlur}
      disabled={disabled}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

const PhoneNumberInput = ({ ...props }: PhoneNumberInputProps) => {
  return (
    <OutlinedInput
      autoComplete="phone"
      placeholder="Enter phone number"
      {...props}
      sx={{
        fontSize: 14,
        fontWeight: 600,
        color: "#4f4b5c",
        borderRadius: '10px',
        height: 38,
        "& .MuiOutlinedInput-input": { height: 0 },
        ...props.sx,
      }}
      inputProps={{
        ...props.inputProps,
        sx: { "&::placeholder": { fontSize: 14 } },
      }}
    />
  );
};

export {
  CountryCodes,
  PhoneNumberInput,
  DEFAULT_COUNTRY_CODE,
  formatPhoneNumber,
  splitPhoneNumber,
};

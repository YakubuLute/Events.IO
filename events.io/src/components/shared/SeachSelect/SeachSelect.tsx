/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Autocomplete, Box, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './seachSelect.module.scss';

export interface OptionValues {
  // This is a combination of CountryType | UserType
  id?: number;
  code?: string;
  label: string;
  phone?: string;
  name?: string;
  email?: string;
  imgUrl?: string | StaticImageData;
  suggested?: boolean;
  value?: string;
}

interface SelectProps {
  id: string;
  type: string;
  value: OptionValues | null;
  options: OptionValues[];
  disabled?: boolean;
  autoComplete?: boolean;
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: OptionValues | null
  ) => void;
  // onChange?: (value: CountryType | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  variant?: 'outlined' | 'standard' | 'filled';
  name: string;
  placeholder: string;
  autoFocus?: boolean;
  inputClass?: string;
  selectClass?: string;
  error?: boolean | undefined;
  helperText?: string | boolean | undefined | any;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const SeachSelect: React.FC<SelectProps> = (props) => {
  const {
    id,
    name,
    type = 'text',
    value,
    placeholder,
    options,
    autoFocus,
    onChange,
    onBlur,
    inputClass,
    selectClass,
    error,
    helperText,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [optionsLoad, setOptionsLoad] = useState<OptionValues[]>([]);
  const loading = open && optionsLoad.length === 0;
  // Use useRef to keep track of the active state
  const activeRef = useRef(true);

  useEffect(() => {
    // Set activeRef to true when the component mounts
    activeRef.current = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.

      if (activeRef.current) {
        setOptionsLoad([...options]);
      }
    })();
    return () => {
      // Set activeRef to false when the component unmounts
      activeRef.current = false;
    };
  }, [loading, options]);

  return (
    <Autocomplete
      id={id}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        // setOptionsLoad([]); // Reset options when the user closes the dropdown
      }}
      options={optionsLoad}
      loading={loading}
      autoHighlight
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => option.label || ''}
      onChange={onChange}
      value={value || null}
      onBlur={onBlur}
      className={`${selectClass ? styles[selectClass] : styles.country_select}`}
      classes={{
        inputRoot: styles.country_select_root,
        input: styles.country_select_input,
        listbox: selectClass ? styles[selectClass] : styles.select_listbox,
        option: styles.select_option,
      }}
      renderOption={(props, option, { selected }) => (
        <Box
          component="li"
          sx={{ backgroundColor: selected ? '#f7f8fa' : 'transparent' }}
          key={option?.id}
          {...props}
        >
          {id === 'country' ? (
            <>
              <Image
                loading={loading ? 'eager' : 'lazy'}
                width="20"
                height="10"
                src={`https://flagcdn.com/w40/${option.code?.toLowerCase()}.png`}
                alt="flag"
              />
              {option.label} ({option.code}) +{option.phone}
            </>
          ) : (
            <>
              {option.imgUrl && (
                <Image
                  loading={loading ? 'eager' : 'lazy'}
                  width="20"
                  height="10"
                  src={option.imgUrl}
                  alt="profile-image"
                  // objectFit='contain'
                />
              )}
              {option.name || option.label}
            </>
          )}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          name={name}
          variant="outlined"
          placeholder={placeholder}
          autoFocus={autoFocus}
          helperText={helperText}
          error={typeof error === 'boolean' ? error : Boolean(error)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <span className={styles.circular}>
                    <CircularProgress color="inherit" size={18} />
                  </span>
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
            autoComplete: 'new-password', // disable autocomplete and autofill
            className: inputClass ? styles[inputClass] : styles.normal_input,
          }}
        />
      )}
    />
  );
};

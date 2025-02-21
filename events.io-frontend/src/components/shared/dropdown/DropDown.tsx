'use client';

import React from 'react';
import {
  ClickAwayListener,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import styles from './DropDown.module.scss';

interface MenuOption {
  label: string;
  value: string;
}
interface DropDownProps {
  value: string;
  label: string;
  searchFieldPlaceholder: string;
  options: Array<MenuOption>;
  onChange?: (event: SelectChangeEvent<string>) => void;
}
interface IClickAwayListenerWrapperProps {
  searchFieldPlaceholder: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const MenuProps = {
  disableAutoFocusItem: false,
  MenuListProps: {
    disableListWrap: false,
  },
  PaperProps: {
    style: {
      maxHeight: 205,
      width: 250,
    },
  },
};

const SearchFieldWrapper: React.FC<IClickAwayListenerWrapperProps> = ({
  searchFieldPlaceholder,
  setQuery,
}) => {
  return (
    <ClickAwayListener onClickAway={() => null}>
      <ListItem>
        <TextField
          fullWidth
          variant="standard"
          placeholder={searchFieldPlaceholder || 'Search...'}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
      </ListItem>
    </ClickAwayListener>
  );
};

const DropDown: React.FC<DropDownProps> = ({
  onChange,
  options,
  label,
  searchFieldPlaceholder,
}) => {
  const [query, setQuery] = React.useState('');

  const renderFilteredOptions = () => {
    const filteredOptions =
      options &&
      options.filter &&
      options.filter((option) => {
        return (
          option.label
            .toString()
            ?.toLowerCase()
            .indexOf(query?.toLowerCase()) !== -1
        );
      });

    return filteredOptions.map((option, index: number) => {
      return (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={label + '-label'}>{label}</InputLabel>}
      <Select
        placeholder={'Select Job Title Placeholder'}
        className={styles.selectForm}
        labelId={label + '-label'}
        // value={value}
        label={label}
        onChange={onChange}
        onOpen={() => {
          setQuery('');
        }}
        onClose={() => {
          setQuery('');
        }}
        MenuProps={MenuProps}
      >
        <SearchFieldWrapper
          searchFieldPlaceholder={searchFieldPlaceholder}
          setQuery={setQuery}
        />
        {renderFilteredOptions()}
      </Select>
    </FormControl>
  );
};

export default DropDown;

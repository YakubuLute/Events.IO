import styled from '@emotion/styled';
import React from 'react';
import {
  ActionMeta,
  GetOptionLabel,
  GetOptionValue,
  Options,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

type option = {
  [key: string]: string | number;
};

interface props {
  options: option[];
  placeholder?: string;
  onChange?:
    | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
    | undefined;
  value?: option | undefined;
  className?: string;
  getOptionLabel?: GetOptionLabel<unknown> | undefined;
  getOptionValue?: GetOptionValue<unknown> | undefined;
  isOptionSelected?:
    | ((option: unknown, selectValue: Options<unknown>) => boolean)
    | undefined;
  filterOption?:
    | ((option: FilterOptionOption<unknown>, inputValue: string) => boolean)
    | null
    | undefined;
}

export default function CustomCreatableSelectInput({
  options,
  placeholder,
  onChange,
  value,
  className,
  getOptionLabel,
  getOptionValue,
  isOptionSelected,
  filterOption,
}: props) {
  return (
    <CreatableSelectStyled
      isClearable
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={className}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      isOptionSelected={isOptionSelected}
      filterOption={filterOption}
      classNamePrefix={'container_wrapper'}
    />
  );
}

const CreatableSelectStyled = styled(CreatableSelect)`
  text-transform: capitalize;
  color: var(--text);

  & .container_wrapper__control {
    background-color: #f7f8fa;
    border-color: #ececed;
    border-radius: 12px;
    min-height: 42px;

    &:hover {
      border-color: #e0e6ed !important;
      box-shadow: 'none';
    }
  }
`;

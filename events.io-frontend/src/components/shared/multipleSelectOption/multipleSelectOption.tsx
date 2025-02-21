import React from 'react';
import styled from '@emotion/styled';
import Select, {
  ActionMeta,
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  MenuPlacement,
  Options,
  StylesConfig,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

type option = {
  [key: string]: string | number;
};

interface Props {
  id?: string;
  name?: string;
  options: option[];
  placeholder?: string;
  onChange:
    | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
    | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: option | undefined | option[] | [] | string;
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
  isMulti?: boolean;
  classNamePrefix?: string;
  isClearable?: boolean;
  menuPlacement?: MenuPlacement | undefined;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined;
  components?:
    | Partial<SelectComponents<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  isLoading?: boolean;
  disabled?: boolean;
  isFixed?: boolean;
  scrollIntoView?: boolean;
  menuPortalTarget?: HTMLElement;
}

export default function MultipleSelectOption({
  id,
  name,
  options,
  placeholder,
  onChange,
  onBlur,
  value,
  className,
  getOptionLabel,
  getOptionValue,
  isOptionSelected,
  filterOption,
  isMulti,
  disabled,
  classNamePrefix = 'container_wrapper',
  isClearable,
  menuPlacement,
  styles,
  components,
  isLoading,
  isFixed,
  scrollIntoView,
  menuPortalTarget,
}: Props) {
  return (
    <SelectStyled
      id={id}
      name={name}
      options={options}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      isMulti={isMulti}
      placeholder={placeholder}
      className={className}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      isOptionSelected={isOptionSelected}
      filterOption={filterOption}
      classNamePrefix={classNamePrefix}
      isClearable={isClearable}
      menuPlacement={menuPlacement}
      styles={styles}
      components={components}
      isLoading={isLoading}
      isDisabled={disabled}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      menuPortalTarget={menuPortalTarget}
    />
  );
}

MultipleSelectOption.Creatable = function CustomSelectInputCreatable({
  id,
  name,
  options,
  placeholder,
  onChange,
  onBlur,
  value,
  className,
  getOptionLabel,
  getOptionValue,
  isOptionSelected,
  filterOption,
  isMulti,
  classNamePrefix = 'container_wrapper',
  isClearable,
  styles,
  components,
  isFixed,
  scrollIntoView,
  menuPortalTarget,
}: Props) {
  return (
    <SelectCretableStyled
      id={id}
      name={name}
      options={options}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      isMulti={isMulti}
      placeholder={placeholder}
      className={className}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      isOptionSelected={isOptionSelected}
      filterOption={filterOption}
      classNamePrefix={classNamePrefix}
      isClearable={isClearable}
      components={components}
      styles={styles}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      menuPortalTarget={menuPortalTarget}
    />
  );
};

const SelectStyled = styled(Select)`
  text-transform: capitalize;
  color: var(--text);

  & .container_wrapper__control {
    background-color: #ffffff;
    border-color: #ececed;
    border-radius: 12px;
    min-height: 42px;
    min-width: 150px;

    &:hover {
      border-color: #e0e6ed !important;
      box-shadow: 'none';
    }
  }

  & .container_wrapper__multi-value {
    background-color: #d6e4ff;
    border-radius: 8px;
    margin: 2px 4px;
    display: flex;
    align-items: center;
    padding: 2px 8px;
  }
`;

const SelectCretableStyled = styled(CreatableSelect)`
  text-transform: capitalize;
  color: var(--text);

  & .container_wrapper__control {
    background-color: #ffffff;
    border-color: #ececed;
    border-radius: 12px;
    min-height: 42px;

    &:hover {
      border-color: #e0e6ed !important;
      box-shadow: 'none';
    }
  }

  & .container_wrapper__multi-value {
    background-color: #d6e4ff;
    border-radius: 8px;
    margin: 2px 4px;
    display: flex;
    align-items: center;
    padding: 2px 8px;
  }
`;

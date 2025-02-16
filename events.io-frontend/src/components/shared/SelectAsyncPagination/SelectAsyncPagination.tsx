import React, { FC } from 'react';
import styled from '@emotion/styled';
import {
  ActionMeta,
  GroupBase,
  MenuPlacement,
  StylesConfig,
} from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { SelectComponents } from 'react-select/dist/declarations/src/components';

export type OptionType = {
  value: string;
  label: string;
};

interface selectAsyncProps {
  id?: string;
  name?: string;
  onChange:
    | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
    | OptionType
    | undefined;
  // onBlur?: void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: void;
  value: OptionType | undefined | null;
  loadOptions: LoadOptions<unknown, GroupBase<unknown>, unknown>;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
  isDisabled?: boolean;
  key?: string | null | undefined;
  fullWidth?: boolean;
  getOptionLabel?: void;
  classNamePrefix?: string;
  isClearable?: boolean;
  menuPlacement?: MenuPlacement | undefined;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined;
  components?:
    | Partial<SelectComponents<unknown, boolean, GroupBase<unknown>>>
    | undefined;
  isFixed?: boolean;
  scrollIntoView?: boolean;
  menuPortalTarget?: HTMLElement;
  classYear?: string;
  dateRange?: string;
  eventId?: string;
  country?: string;
}

const SelectAsyncPaginate: FC<selectAsyncProps> = ({
  onChange,
  onBlur,
  onFocus,
  value,
  loadOptions,
  placeholder,
  name,
  id,
  className,
  isMulti = false,
  isDisabled = false,
  key,
  getOptionLabel = (option: OptionType) => option.label,
  classNamePrefix = 'container_wrapper',
  isClearable,
  menuPlacement,
  styles,
  components,
  isFixed,
  scrollIntoView,
  menuPortalTarget,
  classYear,
  dateRange,
  eventId,
  country,
}) => {
  return (
    <AsyncPaginateStyled
      key={key}
      name={name}
      id={id}
      defaultOptions
      loadOptions={loadOptions}
      isClearable={isClearable}
      isSearchable
      isMulti={isMulti}
      debounceTimeout={500}
      onChange={onChange as any}
      onBlur={onBlur || undefined}
      onFocus={onFocus || undefined}
      className={className}
      value={value}
      isDisabled={isDisabled}
      placeholder={placeholder}
      getOptionLabel={getOptionLabel as any}
      classNamePrefix={classNamePrefix}
      additional={{
        page: 1,
        classYear,
        dateRange,
        eventId,
        country,
      }}
      menuPlacement={menuPlacement}
      styles={styles}
      components={components}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      menuPortalTarget={menuPortalTarget}
    />
  );
};

const AsyncPaginateStyled = styled(AsyncPaginate)`
  text-transform: capitalize;
  color: var(--text);

  & .container_wrapper__control {
    background-color: #ffffff;
    border-color: #ececed;
    border-radius: 12px;
    min-height: 42px;
    font-size: 12px;

    &:hover {
      border-color: #e0e6ed !important;
      box-shadow: 'none';
    }
  }

  & .container_seach_modal__control {
    min-height: 32px;
    color: '#888590';
    border-color: #ececed;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
  }

  & .container_interview_modal__control {
    max-height: 155px;
    height: 40px;
    color: '#888590';
    border-color: #ececed;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export default SelectAsyncPaginate;

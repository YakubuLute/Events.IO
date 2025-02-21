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

export type TOptionSelect = {
  [key: string]: string | number;
};

interface Props {
  id?: string;
  name?: string;
  options: TOptionSelect[];
  placeholder?: string;
  onChange:
  | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
  | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: TOptionSelect | undefined | TOptionSelect[] | [] | string | number | any;
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

export function CustomSelectInput({
  disabled,
  classNamePrefix = 'container_wrapper',
  isFixed,
  scrollIntoView,
  ...props
}: Props) {
  return (
    <SelectStyled
      isDisabled={disabled}
      classNamePrefix={classNamePrefix}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      {...props}
    />
  );
}

CustomSelectInput.Creatable = function CustomSelectInputCreatable({
  classNamePrefix = 'container_wrapper',
  isFixed,
  scrollIntoView,
  ...props
}: Props) {
  return (
    <SelectCretableStyled
      classNamePrefix={classNamePrefix}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      {...props}
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
    background-color: #ffffff;
    tranform: translateY(10px);
  }

  & .container_interview_modal__control {
    min-height: 32px;
    height: 40px;
    color: '#888590';
    border-color: #ececed;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    // z-index: 1000;
  }

  & .container_appointments_modal__control {
    min-height: 42px;
    height: 48px;
    color: '#888590';
    border-color: #ececed;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    padding: 0 4px;
    // z-index: 1000;
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

  & .container_seach_modal__control {
    min-height: 32px;
    color: '#888590';
    border-color: #ececed;
    border-radius: 12px;
    font-size: 12px;
    tranform: translateY(10px);
  }
`;

export const inputSelectStyles = {
  menuList: (base) => ({
    ...base,
    maxHeight: '200px',
    width: '100%',
    minWidth: '160px',
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
    fontSize: '14px', // Set the font size of the selected value
  }),
};

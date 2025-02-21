import type { ReactElement } from 'react';
import styled from '@emotion/styled';
import type { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import {
  LoadOptions,
  withAsyncPaginate,
  type ComponentProps,
  type UseAsyncPaginateParams,
} from 'react-select-async-paginate';
import Creatable, { type CreatableProps } from 'react-select/creatable';

type TOptionType = {
  label: string;
  value: string;
};

interface ICreatablePagination {
  loadOptions: LoadOptions<unknown, GroupBase<unknown>, unknown>;
  value: TOptionType | undefined;
  onChange:
    | ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void)
    | undefined;
  placeholder: string;
  id?: string;
  name?: string;
  isDisabled?: boolean;
  isFixed?: boolean;
  scrollIntoView?: boolean;
  menuPortalTarget?: HTMLElement;
  isMulti?: boolean;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined;
  placement?: 'auto' | 'bottom' | 'top';
}

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable
) as AsyncPaginateCreatableType;

const CreatableAsyncPagination = ({
  loadOptions,
  value,
  onChange,
  placeholder,
  id,
  name,
  isDisabled,
  isFixed,
  isMulti,
  menuPortalTarget,
  scrollIntoView,
  styles,
  placement,
}: ICreatablePagination) => {
  return (
    <CreatableAsyncPaginateStyled
      id={id}
      name={name}
      value={value}
      loadOptions={loadOptions}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable
      isMulti={isMulti}
      classNamePrefix={'container_wrapper'}
      additional={{
        page: 1,
      }}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      menuShouldScrollIntoView={scrollIntoView}
      menuPortalTarget={menuPortalTarget}
      styles={styles}
      menuPlacement={placement}
    />
  );
};

const CreatableAsyncPaginateStyled = styled(CreatableAsyncPaginate)`
  text-transform: capitalize;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;

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
`;

export default CreatableAsyncPagination;

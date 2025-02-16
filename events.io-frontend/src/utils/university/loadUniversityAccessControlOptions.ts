import { GroupBase, OptionsOrGroups } from 'react-select';

import { universityAccessControlService } from '@/services';

type OptionType = {
  value: string;
  label: string;
};

type TLoadedOptions =
  | OptionsOrGroups<OptionType, GroupBase<OptionType>>
  | OptionsOrGroups<unknown, GroupBase<unknown>>;

const optionsPerPage = 10; 

export const loadUniversityAccessControlRoleOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await universityAccessControlService.getUniversityAccessControlRole({
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
    });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!searchQuery) {
    filteredOptions = optionItem;
  } else {
    const searchLower = searchQuery?.toLowerCase();

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      );
    });
  }

  const hasMore = nextPage < totalPages;

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage,
    },
  };
};

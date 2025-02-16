import { GroupBase, OptionsOrGroups } from 'react-select';

import { defaultUserPicture } from '@/components/ui/images';
import { StaffFilterOuts } from '@/@types/shared/type';
import {
  employeeService,
  employerOptionsService,
  employerService,
} from '@/services';

type OptionType = {
  value: string;
  label: string;
};

type TLoadedOptions =
  | OptionsOrGroups<OptionType, GroupBase<OptionType>>
  | OptionsOrGroups<unknown, GroupBase<unknown>>;

// type OptionTypeWithLogo = {
//   value: string;
//   label: string;
//   id: string;
//   logo: string;
// };
const optionsPerPage = 10;

type queryOptionsType = {
  page: number;
  itemsPerPage: number;
  searchQuery: string;
};

export const loadEmployerStaffOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  filterOut: StaffFilterOuts
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const { data } = await employeeService.getEmployeesForVerification({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery,
    filterOut,
  } as queryOptionsType);

  const itemsOption = data.data.items;
  const totalPages = data.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    name: `${item.firstName} ${item.lastName}`,
    value: item.value,
    profilePhoto: item?.profilePhoto ? item?.profilePhoto : defaultUserPicture,
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

export const loadEmployerPositionOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerPositionsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerGroupsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerGroupsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerEmployeesOptions = async (
  search: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  visibility: 'public' | 'private'
) => {
  const nextPage = search ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employerService.getEmployerEmployees({
    itemsPerPage: optionsPerPage,
    page,
    search,
    visibility,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: `${item.firstName} ${item.lastName}`,
    value: item._id,
    profilePhoto: item?.profilePhoto
      ? item?.profilePhoto
      : '/assets/images/user-default-image.png',
  }));

  let filteredOptions: OptionType[];

  if (!search) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = search?.toLowerCase();

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

export const loadEmployerInterviewedCandidatesOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  positionId: string
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getInterviewedCandidatesOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
    positionId,
  });
  const data = response?.data;
  // console.log('options/positions/interviewed-candidates===', data);
  const itemsOption = data.items;
  const totalPages = data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
    profilePhoto: item?.profilePhoto
      ? item?.profilePhoto
      : '/assets/images/user-default-image.png',
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployersIndustriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await employerOptionsService.getEmployerIndustryOptionsFn({
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

export const loadEmployersCompSizeOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await employerOptionsService.getEmployerCompanySizeOptionsFn(
    { itemsPerPage: optionsPerPage, page, searchQuery }
  );
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

export const loadEmployerPositionsJobTitlesOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerPositionsJobTitlesOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerPositionsLocationsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerPositionsLocationsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerPositionsSkillsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerPositionsSkillsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerPositionsJobTypesOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await employeeService.getEmployerPositionsJobTypesOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadEmployerPositionsWorkplaceTypesOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await employeeService.getEmployerPositionsWorkplaceTypesOptions({
      itemsPerPage: optionsPerPage,
      page,
      q,
    });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase();

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

export const loadInterviewAnalysisParametersOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await employerOptionsService.getEmployerInterviewAnalysisParametersOptions({
      itemsPerPage: 40,
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

export const loadCandidateRejectionReasons = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await employerOptionsService.getCandidateRejectionReasons({
    itemsPerPage: 40,
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

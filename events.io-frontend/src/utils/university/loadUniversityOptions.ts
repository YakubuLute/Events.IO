import { GroupBase, OptionsOrGroups } from 'react-select';

import { defaultUserPicture } from '@/components/ui/images';
import { StaffFilterOuts } from '@/@types/shared/type';
import { universityService } from '@/services';

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

// type queryOptionsType = {
//   page: number;
//   itemsPerPage: number;
//   searchQuery: string;
//   filterOut?: StaffFilterOuts;
// };

export const loadUniversityStudentsEmploymentOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await universityService.getUniversityStudentsEmploymentOptions({
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
      classYear,
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

export const loadUniversityStudentIndustriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await universityService.getUniversityStudentsIndustriesOptions({
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
      classYear,
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

export const loadUniversityStudentsCountriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await universityService.getUniversityStudentsCountriesOptions({
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
      classYear,
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

export const loadUniversityStudentCredentials = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await universityService.getUniversityFilterStudentsCredentialsOptions({
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
      classYear,
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

export const loadUniversityStudentJobTypesOption = async () => {
  const response = await universityService.getUniversityStudentsJobTypesOptions(
    { page: 1, itemsPerPage: 20, searchQuery: '' }
  );
  const itemsOption = response.data.items;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));
  return optionItem;
};

export const loadUniversityClassYearOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await universityService.getUniversityClassYearOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery,
    classYear,
  });
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!searchQuery) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
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

// filterOut=verification-team
export const loadUniversityStaffOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  filterOut: StaffFilterOuts
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await universityService.getSettingTeam({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery,
    filterOut,
  });

  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    name: item.name,
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

export const loadUniversityCredentialsOfferOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await universityService.getUniversityCredentialsOfferOptions(
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

export const loadUniversityStudentDisciplinesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await universityService.getUniversityStudentsDisciplinesOptions({
      itemsPerPage: optionsPerPage,
      page,
      q,
      classYear,
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

export const loadUniversityStudentLanguagesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await universityService.getUniversityStudentsLanguagesOptions({
      itemsPerPage: optionsPerPage,
      page,
      q,
      classYear,
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

export const loadUniversityStudentSkillsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await universityService.getUniversityStudentsSkillsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
    classYear,
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

export const loadUniversityStudentInterestsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await universityService.getUniversityStudentsInterestOptions(
    {
      itemsPerPage: optionsPerPage,
      page,
      q,
      classYear,
    }
  );
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

export const loadUniversityStudentJobTitlesOption = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, classYear }: { page: number; classYear: string | undefined }
) => {
  const nextPage = searchQuery ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await universityService.getUniversityStudentsJobTitleOptions(
    {
      itemsPerPage: optionsPerPage,
      page,
      searchQuery,
      classYear,
    }
  );
  const itemsOption = response.data.items;
  const totalPages = response.data.totalPages;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));

  let filteredOptions: OptionType[];

  if (!searchQuery) {
    // If there's no search query, show all options.
    filteredOptions = optionItem;
  } else {
    // Filter options based on the search query.
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

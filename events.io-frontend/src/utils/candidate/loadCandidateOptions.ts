import { GroupBase, OptionsOrGroups } from 'react-select';

import { candidateOffersService, candidateService } from '@/services';

type OptionType = {
  value: string;
  label: string;
};

// type OptionTypeWithLogo = {
// 	value: string;
// 	label: string;
// 	id: string,
// 	logo: string,
// };
const optionsPerPage = 10;

type TLoadedOptions =
  | OptionsOrGroups<OptionType, GroupBase<OptionType>>
  | OptionsOrGroups<unknown, GroupBase<unknown>>;

export const loadCandidateWorkExperienceOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await candidateService.getCandidateWorkExperienceTOptions({
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

export const loadIDTypeOptions = async (
  searchQuery: string,
  loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  { page }: { page: number }
) => {
  const response = await candidateService.getIDDocTypesFn({
    itemsPerPage: 10,
    page,
  });
  const itemsOption = response.data.items;

  return {
    options:
      itemsOption.map((item) => ({
        label: item.name,
        value: item.value,
      })) || [],
    hasMore: itemsOption.length >= 1,
    additional: {
      page: searchQuery ? 2 : page + 1,
    },
  };
};

export const loadPOADocTypeOptions = async (
  searchQuery: string,
  loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  { page }: { page: number }
) => {
  const response = await candidateService.getPOADocTypesFn({
    itemsPerPage: 10,
    page,
  });
  const itemsOption = response.data.items;

  return {
    options:
      itemsOption.map((item) => ({
        label: item.name,
        value: item.value,
      })) || [],
    hasMore: itemsOption.length >= 1,
    additional: {
      page: searchQuery ? 2 : page + 1,
    },
  };
};

export const loadCandidateStudentsCountriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await candidateService.getCandidateStudentsCountriesOptions({
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

export const loadCandidateJobTitleOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateJobTitleOptions({
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

export const loadCandidateStudentIndustriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateStudentIndustriesOptions({
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

export const loadCandidateStudentInstitutions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response =
    await candidateService.getUniversityStudentsInstitionsOptions({
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

export const loadCandidateStudentsEmploymentOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1;
  const response = await candidateService.getCandidateStudentsEmploymentOptions(
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

export const loadAccountDeletionReasonsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getAccountDeletionReasonsOptions({
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

export const loadCandidateMeetupVenuesOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateMeetupVenuesOptions({
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

export const loadCandidateDiscoveryMediumsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateDiscoveryMediumsOptions({
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

export const loadCandidateEmploymentStatusOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateEmploymentStatusOptions({
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

export const loadOffersDeclineReasonsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateOffersService.getOffersDeclineReasonsOptions({
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

export const loadCandidateStudentJobTypesOption = async () => {
  const response = await candidateService.getCandidateStudentsJobTypesOptions({
    page: 1,
    itemsPerPage: 20,
    searchQuery: '',
  });
  const itemsOption = response.data.items;
  const optionItem = itemsOption.map((item) => ({
    label: item.name,
    value: item.value,
  }));
  return optionItem;
};

export const loadCandidateStudentSkillsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateStudentsSkillsOptions({
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

export const loadCandidateStudentInterestsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateStudentsInterestsOptions({
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

export const loadCandidateStudentDisciplinesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await candidateService.getCandidateStudentsDisciplinesOptions({
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

export const loadCandidateStudentLanguagesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateStudentsLanguagesOptions({
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

export const loadCandidateStudentCredentialsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await candidateService.getCandidateStudentsCredentialsOptions({
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

export const loadCandidateAnalyticsLocationOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, dateRange }: { page: number; dateRange: string }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateAnalyticsLocationsOptions(
    {
      itemsPerPage: optionsPerPage,
      page,
      q,
      dateRange,
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

export const loadCandidateAnalyticsEmployersOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, dateRange }: { page: number; dateRange: string }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateAnalyticsEmployersOptions(
    {
      itemsPerPage: optionsPerPage,
      page,
      q,
      dateRange,
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

export const loadCandidateAnalyticsIndustriesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page, dateRange }: { page: number; dateRange: string }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response =
    await candidateService.getCandidateAnalyticsIndustriesOptions({
      itemsPerPage: optionsPerPage,
      page,
      q,
      dateRange,
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

export const loadCandidateStudentVenuesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1;

  // Fetch data for the new page.
  const response = await candidateService.getCandidateStudentsVenuesOptions({
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

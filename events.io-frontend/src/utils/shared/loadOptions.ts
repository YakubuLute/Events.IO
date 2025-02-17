import { GroupBase, OptionsOrGroups } from 'react-select'

import OptionsService from '@/services/shared/shared.service'
import { optionsService } from '@/services/index'

const {
  getEducationCredentialOptions,
  getInstitutionsOptions,
  getJobTitlesOptions,
  getJobTypesOptions,
  getCityOptions,
  getLanguagesOptions,
  getListCountriesOptions,
  getPickupLocationOptions,
  getSkillsOptions,
  getYearsOfExperienceOptions,
  getSocialNetworkOptions,
  getStateOptions,
  getTimeZoneOptions,
  getEmployersOptions,
  getInterestsOptions,
  getAcademicDisciplineOptions,
  getCurrencyOptions,
  getShortTimezomesOptions,
  getEventCategories,
  getAllInstitutions,
  getEventUsers,
  getAttendeesAnalyticsEmployersOptions,
  getAttendeesAnalyticsIndustriesOptions,
  getAttendeesAnalyticsLocationsOptions
} = new OptionsService()

export type OptionType = {
  value: string
  label: string
}

type OptionTypeWithLogo = {
  value: string
  label: string
  id: string
  logo: string
}
const optionsPerPage = 10

type TLoadedOptions =
  | OptionsOrGroups<OptionType, GroupBase<OptionType>>
  | OptionsOrGroups<unknown, GroupBase<unknown>>

export const loadEducationCredentialsOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getEducationCredentialOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadJobTitleOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1

  // Fetch data for the new page.
  const response = await getJobTitlesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    // If there's no search query, show all options.
    filteredOptions = optionItem
  } else {
    // Filter options based on the search query.
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadJobTypeOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getJobTypesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()
    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }
  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadLanguagesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getLanguagesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadInterestOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getInterestsOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCountriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getListCountriesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value,
    flag: item.flag!,
    code: item.code!
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadPickupLocationOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  country: string
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getPickupLocationOptions({
    itemsPerPage: optionsPerPage,
    page,
    country,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadStatesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  country: string
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getStateOptions({
    itemsPerPage: optionsPerPage,
    page,
    country,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCitiesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number },
  body: {
    country: string
    state: string
  }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getCityOptions({
    itemsPerPage: optionsPerPage,
    page,
    body,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadYearsOfExperienceOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getYearsOfExperienceOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  // console.log('Years of experience response ', response);
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadSkillsOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getSkillsOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadSocialsMediaOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getSocialNetworkOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCreatableUniversityOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getInstitutionsOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value,
    id: item?.value,
    logo: item.logo
  }))

  let filteredOptions: OptionTypeWithLogo[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore: hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCreatableDisciplineOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getAcademicDisciplineOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value,
    id: item?.value,
    logo: item.logo
  }))

  let filteredOptions: OptionTypeWithLogo[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore: hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCreatableEmployersOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getEmployersOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value,
    id: item.id,
    logo: item.logo
  }))

  let filteredOptions: OptionTypeWithLogo[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore: hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCreatableSkillsOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getSkillsOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore: hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadTimeZoneOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getTimeZoneOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadCurrenciesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getCurrencyOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

// export const loadUniversityClassYearOptions = async (
//   searchQuery: string,
//   prevOptions: TLoadedOptions,
//   { page }: { page: number }
// ) => {
//   const nextPage = searchQuery ? 1 : page + 1;

//   // Fetch data for the new page.
//   const response = await getUniversityClassYearOptions({
//     itemsPerPage: optionsPerPage,
//     page,
//     searchQuery,
//   });
//   const itemsOption = response.data.items;
//   const totalPages = response.data.totalPages;
//   const optionItem = itemsOption.map((item) => ({
//     label: item?.name,
//     value: item?.value,
//   }));

//   let filteredOptions: OptionType[];

//   if (!searchQuery) {
//     // If there's no search query, show all options.
//     filteredOptions = optionItem;
//   } else {
//     // Filter options based on the search query.
//     const searchLower = searchQuery?.toLowerCase();

//     filteredOptions = optionItem.filter(({ label, value }) => {
//       return (
//         label?.toLowerCase().includes(searchLower) ||
//         value?.toLowerCase().includes(searchLower)
//       );
//     });
//   }

//   const hasMore = nextPage < totalPages;

//   return {
//     options: filteredOptions,
//     hasMore,
//     additional: {
//       page: nextPage,
//     },
//   };
// };

export const loadShortTimezomesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1

  const response = await getShortTimezomesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  // console.log('response is =====', response)
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadSupportTicketSubjectsOptions = async (
  q: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = q ? 1 : page + 1

  // Fetch data for the new page.
  const response = await optionsService.getSupportTicketSubjectsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadEventCategoriesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getEventCategories({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadEventUsersOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getEventUsers({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response?.data?.items
  const totalPages = response?.data?.totalPages

  const optionItem = itemsOption?.map(item => ({
    label: item?.name,
    value: item?.value,
    profilePhoto: item?.profilePhoto,
    jobTitle: item?.jobTitle,
    educationHistory: item?.educationHistory || [],
    employmentHistory: item?.employmentHistory || []
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadEventTimeZonesOptions = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getShortTimezomesOptions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const useGetAllInsitution = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page }: { page: number }
) => {
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getAllInstitutions({
    itemsPerPage: optionsPerPage,
    page,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadAttendeesAnalyticsEmployersOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  {
    page,
    dateRange,
    eventId
  }: { page: number; dateRange: string; eventId: string }
) => {
  const nextPage = q ? 1 : page + 1

  // Fetch data for the new page.
  const response = await getAttendeesAnalyticsEmployersOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
    dateRange,
    eventId
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item.name,
    value: item.value
  }))

  let filteredOptions: OptionType[]

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadAttendeesAnalyticsIndustriesOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  {
    page,
    dateRange,
    eventId
  }: { page: number; dateRange: string; eventId: string }
) => {
  const nextPage = q ? 1 : page + 1

  // Fetch data for the new page.
  const response = await getAttendeesAnalyticsIndustriesOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
    dateRange,
    eventId
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item.name,
    value: item.value
  }))

  let filteredOptions: OptionType[]

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadAttendeesAnalyticsLocationsOption = async (
  q: string,
  prevOptions: TLoadedOptions,
  {
    page,
    dateRange,
    eventId
  }: { page: number; dateRange: string; eventId: string }
) => {
  const nextPage = q ? 1 : page + 1

  // Fetch data for the new page.
  const response = await getAttendeesAnalyticsLocationsOptions({
    itemsPerPage: optionsPerPage,
    page,
    q,
    dateRange,
    eventId
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item.name,
    value: item.value
  }))

  let filteredOptions: OptionType[]

  if (!q) {
    // If there's no search query, show all options.
    filteredOptions = optionItem
  } else {
    // Filter options based on the search query.
    const searchLower = q?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

export const loadStatesOptionsAlt = async (
  searchQuery: string,
  prevOptions: TLoadedOptions,
  { page, country }: { page: number; country: string }
) => {
  console.log('CTY: ', country)
  const nextPage = searchQuery ? 1 : page + 1
  const response = await getStateOptions({
    itemsPerPage: optionsPerPage,
    page,
    country,
    searchQuery
  })
  const itemsOption = response.data.items
  const totalPages = response.data.totalPages
  const optionItem = itemsOption.map(item => ({
    label: item?.name,
    value: item?.value
  }))

  let filteredOptions: OptionType[]

  if (!searchQuery) {
    filteredOptions = optionItem
  } else {
    const searchLower = searchQuery?.toLowerCase()

    filteredOptions = optionItem.filter(({ label, value }) => {
      return (
        label?.toLowerCase().includes(searchLower) ||
        value?.toLowerCase().includes(searchLower)
      )
    })
  }

  const hasMore = nextPage < totalPages

  return {
    options: filteredOptions,
    hasMore,
    additional: {
      page: nextPage
    }
  }
}

import { countries } from 'countries-list'

export const countryCodes = Object.entries(countries)
  .map(([code, info]) => ({
    value: info.phone.length > 0 ? `+${info.phone[0]}` : '',
    label: `${info.phone.length > 0 ? `+${info.phone[0]}` : ''} - ${info.name}`
  }))
  .filter(item => item.value)

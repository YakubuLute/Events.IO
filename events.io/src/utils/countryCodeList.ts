// import { countries } from 'countries-list'

// export const countryCodes = Object.entries(countries)
//   .map(([code, info]) => ({
//     value: info.phone.length > 0 ? `+${info.phone[0]}` : '',
//     label: `${info.phone.length > 0 ? `+${info.phone[0]}` : ''} - ${info.name}`
//   }))
//   .filter(item => item.value)
import { countries } from 'countries-list'

export const countryCodes = Object.entries(countries)
  .map(([code, info]) => {
    const phonePrefix = info.phone.length > 0 ? `+${info.phone[0]}` : ''
    const value = `${phonePrefix}-${code}` // Unique value using country code (e.g., "+1-US", "+1-CA")
    const label = `${phonePrefix} - ${info.name}`
    return { value, label }
  })
  .filter(item => item.value) // Remove entries without a phone prefix
  .sort((a, b) => a.value.localeCompare(b.value)) // Optional: Sort for better UX

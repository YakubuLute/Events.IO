import { ChangeEvent } from 'react'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

// import {
//   PasswordStrengthClass,
//   TUser,
//   YearOption,
// } from '@/@types/shared/type';
import decodeJwt from './jwtDecode'
import { COOKIES_KEY } from './setCookies'

/**
 * @description check if an email is valid using regex
 * @param email
 * @returns
 */
export const isValidEmail = (email: string): boolean => {
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(email)
}

export const truncateWord = (word: string, length: number) => {
  if (typeof word !== 'string' || typeof length !== 'number') {
    throw new Error(
      'Invalid input. Please provide a valid word (string) and length (number).'
    )
  }

  if (length >= 0) {
    if (word.length > length) {
      return word.slice(0, length) + '...'
    } else {
      return word
    }
  } else {
    throw new Error('Invalid length. Please provide a non-negative length.')
  }
}

export function formatBytes (bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const isValidFileType = (fileType: string) => {
  const allowedTypes = ['application/pdf', 'image/', 'video/', 'audio/']
  return allowedTypes.some(type => fileType.includes(type))
}

export const formatString = (str: string) => {
  if (str) {
    const rep = str.replace(/\s/g, '_')
    const res = rep.charAt(0).toUpperCase() + rep.slice(1)
    return res.replace(/\_/g, ' ')
  } else {
    return ''
  }
}

export const formatName = (name: string) => {
  if (name) {
    const nameArr = name.split(' ')
    const res =
      nameArr[0].charAt(0).toUpperCase() +
      nameArr[0].slice(1) +
      ' ' +
      nameArr[1].charAt(0).toUpperCase() +
      nameArr[1].slice(1)
    return res.replace(/\_/g, ' ')
  }
}

export const getFirstCharactersNames = (name: string) => {
  if (name) {
    const nameArr = name.split(' ')
    let nameCharacters = ''
    for (let index = 0; index < nameArr.length; index++) {
      const firstCharacter = nameArr[index][0]
      nameCharacters = nameCharacters + firstCharacter.toUpperCase()
    }

    return nameCharacters
  }
}

export function truncateString (str: string, n: number) {
  if (!str) return str
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}

export function formatReadableDate (inputDate: any) {
  const date = new Date(inputDate)
  const options = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    second: 'numeric' as const,
    timeZoneName: 'short' as const
  }

  return date.toLocaleString('en-US', options)
}

export const getCurrentUser = () => {
  const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN)
  const currentUser = decodeJwt(String(token)) as any
  return currentUser
}

export const validateEmail = (email: string) => {
  return String(email)
    ?.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const handlePasswordStrength = (
  e: ChangeEvent<HTMLInputElement>,
  setStrenghClass: (value) => void,
  setStrengthLabel: (value: string) => void
) => {
  const password = e.target.value
  let strength = 0
  if (!password) strength = 0
  if (password.length > 7) strength += 1
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
    strength += 1
  if (strength === 0) {
    setStrenghClass('none')
    setStrengthLabel('None')
  } else if (strength === 1) {
    setStrenghClass('too_short')
    setStrengthLabel('Too Short')
  } else if (strength === 2) {
    setStrenghClass('weak')
    setStrengthLabel('Weak')
  } else if (strength === 3) {
    setStrenghClass('fair')
    setStrengthLabel('Fair')
  } else if (strength === 4) {
    setStrenghClass('good')
    setStrengthLabel('Good')
  } else if (strength === 5) {
    setStrenghClass('strong')
    setStrengthLabel('Strong')
  }
}

export function validateDate (date: Date | string) {
  return dayjs(date).isValid()
}

export const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop()
}

export function blobToFile (theBlob: Blob, fileName: string, type: string) {
  return new File([theBlob], fileName, { type })
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export function dataURLtoBlob (dataURL: string) {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

export function isURL (url: string) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/
  return regex.test(url)
}

export function formatNumberWithCommas (number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  })
  return formatter.format(number)
}

export function capitalizeWords (str: string) {
  if (str) {
    const words = str.split(' ')
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    return capitalizedWords.join(' ')
  }
  return str
}

export function kebabToCamelCase (str: string) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

export function shuffleArray (array: string[]) {
  // Loop through the array from the last element to the first
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1))

    // Swap the elements at indices i and j
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export function isYouTubeUrl (url: string) {
  // Define a regular expression for YouTube URL patterns
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)(\/.*)?$/

  // Test the URL against the regular expression
  return youtubeRegex.test(url)
}

export function getYouTubeVideoID (url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match && match[1] ? match[1] : null
}

/**
 * @description count number of words in a string
 * @param value
 * @returns
 */
export function countWords (value: string): number {
  return value ? value?.trim().split(/\s+/).length : 0
}

export function generateYears (totalYearsToThePast = 50, futureYears = 10) {
  const currentYear = new Date().getFullYear()
  const totalYears = totalYearsToThePast

  // Calculate the starting year
  const startYear = currentYear - (totalYears - futureYears - 1)

  // Generate the years array
  const years = []
  for (let i = 0; i < totalYears; i++) {
    const year = startYear + i
    years.push({ value: year.toString(), label: year.toString() })
  }

  return years?.reverse()
}

export function getTimeDifference (startTime: string, endTime: string) {
  // Parse the input times
  const [startHours, startMinutes] = startTime.split(':').map(Number)
  const [endHours, endMinutes] = endTime.split(':').map(Number)

  // Convert both times to minutes
  const startTotalMinutes = startHours * 60 + startMinutes
  const endTotalMinutes = endHours * 60 + endMinutes

  // Calculate the difference in minutes
  let differenceInMinutes = endTotalMinutes - startTotalMinutes

  // Handle negative differences (if the end time is earlier than start time)
  if (differenceInMinutes < 0) {
    differenceInMinutes += 24 * 60 // Add 24 hours' worth of minutes
  }

  // Return in hours if the difference is 60 minutes or more
  if (differenceInMinutes >= 60) {
    const hours = Math.floor(differenceInMinutes / 60)
    const minutes = differenceInMinutes % 60
    if (minutes === 0) {
      return `${hours} hr`
    }
    return `${hours} hr ${minutes} min`
  } else {
    return `${differenceInMinutes} min`
  }
}

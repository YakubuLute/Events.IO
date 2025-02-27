// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, {
//   AxiosInstance,
//   AxiosError,
//   AxiosRequestConfig,
//   AxiosResponse,
//   InternalAxiosRequestConfig
// } from 'axios'

// const BASE_URL = '/api'
// const AUTH_ROUTES = {
//   REFRESH: '/auth/refresh',
//   LOGIN: '/auth/login',
//   LOGOUT: '/auth/logout'
// }

// // Define all interfaces
// interface TokenResponse {
//   token: string
//   refreshToken: string
// }

// // Custom config with our additional properties
// interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean
//   skipAuthRefresh?: boolean
// }

// // For use in interceptors
// interface InternalExtendedAxiosRequestConfig
//   extends InternalAxiosRequestConfig {
//   _retry?: boolean
//   skipAuthRefresh?: boolean
// }

// // Type-safe logger
// type LoggerFn = (message: string, data?: any) => void

// interface Logger {
//   error: LoggerFn
//   warn: LoggerFn
//   info: LoggerFn
// }

// const logger: Logger = {
//   error: (message: string, error?: any): void => {
//     console.error(`[API Error] ${message}`, error)
//   },
//   warn: (message: string, data?: any): void => {
//     console.warn(`[API Warning] ${message}`, data)
//   },
//   info: (message: string, data?: any): void => {
//     console.info(`[API Info] ${message}`, data)
//   }
// }

// // Type-safe auth service
// interface AuthService {
//   getRefreshToken: () => string | null
//   setCookies: (accessToken: string, refreshToken: string) => void
// }

// export const logout = async (): Promise<void> => {
//   try {
//     const loggedOut = await api.post<{ message: string }>(AUTH_ROUTES.LOGOUT)
//     logger.info('User logged out successfully')
//     if (loggedOut.data.message) {
//       window.location.href = AUTH_ROUTES.LOGIN
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError<unknown>
//     logger.error(`Logout failed: ${axiosError.message || 'Unknown error'}`, {
//       status: axiosError.response?.status,
//       data: axiosError.response?.data
//     })
//     throw error
//   }
// }

// const authService: AuthService = {
//   getRefreshToken: (): string | null => {
//     return (
//       document.cookie
//         .split('; ')
//         .find(row => row.startsWith('refresh-token='))
//         ?.split('=')[1] || null
//     )
//   },

//   setCookies: (accessToken: string, refreshToken: string): void => {
//     const secure = process.env.NODE_ENV === 'production'
//     document.cookie = `auth-token=${accessToken}; Path=/; HttpOnly; Secure=${secure}; SameSite=Strict; Max-Age=${
//       60 * 60 * 24
//     }`
//     document.cookie = `refresh-token=${refreshToken}; Path=/; HttpOnly; Secure=${secure}; SameSite=Strict; Max-Age=${
//       60 * 60 * 24 * 7
//     }`
//   }
// }

// const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// // Create the API instance with type safety
// const api: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     Accept: 'application/json',
//     'User-Timezone': userTimezone
//   }
// })

// //refresh token function
// export const refreshAccessTokenFn = async (
//   refreshToken: string
// ): Promise<TokenResponse> => {
//   try {
//     const config: ExtendedAxiosRequestConfig = {
//       skipAuthRefresh: true
//     }

//     const response = await api.post<TokenResponse>(
//       AUTH_ROUTES.REFRESH,
//       { refreshToken },
//       config
//     )

//     logger.info('Access token refreshed successfully')
//     return response.data
//   } catch (error) {
//     // Safely cast error to AxiosError with correct generics
//     const axiosError = error as AxiosError<unknown>

//     logger.error(
//       `Failed to refresh token: ${axiosError.message || 'Unknown error'}`,
//       {
//         status: axiosError.response?.status,
//         data: axiosError.response?.data
//       }
//     )
//     throw error
//   }
// }

// // Request Interceptor
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     return config
//   },
//   (error: unknown): Promise<never> => {
//     logger.error('Request interceptor error', error)
//     return Promise.reject(error)
//   }
// )

// // Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => response,
//   async (error: unknown): Promise<never> => {
//     const axiosError = error as AxiosError
//     const originalRequest =
//       axiosError.config as InternalExtendedAxiosRequestConfig

//     if (
//       axiosError.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry &&
//       !originalRequest.skipAuthRefresh
//     ) {
//       logger.warn('Received 401 error, attempting token refresh')

//       if (originalRequest) {
//         originalRequest._retry = true
//       }

//       try {
//         const refreshToken = authService.getRefreshToken()

//         if (!refreshToken) {
//           logger.error('No refresh token available for token refresh')
//           await logout()
//           return Promise.reject(
//             new Error('Authentication failed: No refresh token available')
//           )
//         }

//         const tokenResponse = await refreshAccessTokenFn(refreshToken)

//         if (
//           !tokenResponse ||
//           !tokenResponse.token ||
//           !tokenResponse.refreshToken
//         ) {
//           throw new Error('Invalid token response format')
//         }

//         authService.setCookies(tokenResponse.token, tokenResponse.refreshToken)

//         // Create a new request config from the original request
//         // but strip out internal Axios properties
//         const newRequestConfig: AxiosRequestConfig = {
//           url: originalRequest.url,
//           method: originalRequest.method,
//           data: originalRequest.data,
//           params: originalRequest.params,
//           headers: originalRequest.headers,
//           withCredentials: originalRequest.withCredentials,
//           baseURL: originalRequest.baseURL
//         }

//         return api(newRequestConfig)
//       } catch (refreshError) {
//         logger.error('Token refresh failed, logging out user', refreshError)
//         await logout()
//         return Promise.reject(
//           new Error('Authentication failed: Unable to refresh token')
//         )
//       }
//     }

//     if (axiosError.message === 'Network Error') {
//       logger.error('Network connectivity issue detected', axiosError)
//     } else if (axiosError.response) {
//       const status = axiosError.response.status
//       const data = axiosError.response.data

//       if (status >= 500) {
//         logger.error(`Server error (${status})`, {
//           data,
//           url: originalRequest?.url
//         })
//       } else if (status === 403) {
//         logger.error('Permission denied (403)', {
//           url: originalRequest?.url
//         })
//       } else if (status === 404) {
//         logger.warn('Resource not found (404)', {
//           url: originalRequest?.url
//         })
//       } else {
//         logger.error(`API error (${status})`, {
//           data,
//           url: originalRequest?.url,
//           method: originalRequest?.method
//         })
//       }
//     } else if (axiosError.request) {
//       logger.error('No response received from server', {
//         url: originalRequest?.url,
//         method: originalRequest?.method
//       })
//     } else {
//       logger.error('Request setup error', axiosError)
//     }

//     return Promise.reject(axiosError)
//   }
// )

// export default api
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios'

// Extend AxiosRequestConfig to include skipAuthRefresh
declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
  }
}

const BASE_URL = '/api'
const AUTH_ROUTES = {
  REFRESH: '/auth/refresh',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout'
}

// Define all interfaces
interface TokenResponse {
  token: string
  refreshToken: string
}

// Custom config with our additional properties
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
  skipAuthRefresh?: boolean
}

// For use in interceptors
interface InternalExtendedAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean
  skipAuthRefresh?: boolean
}

// Type-safe logger
type LoggerFn = (message: string, data?: any) => void

interface Logger {
  error: LoggerFn
  warn: LoggerFn
  info: LoggerFn
}

const logger: Logger = {
  error: (message: string, error?: any): void => {
    console.error(`[API Error] ${message}`, error)
  },
  warn: (message: string, data?: any): void => {
    console.warn(`[API Warning] ${message}`, data)
  },
  info: (message: string, data?: any): void => {
    console.info(`[API Info] ${message}`, data)
  }
}

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// Create the API instance with type safety
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies (including HttpOnly) are sent with requests
  headers: {
    Accept: 'application/json',
    'User-Timezone': userTimezone
  }
})

// Refresh token function (relies on cookie, no payload needed)
export const refreshAccessTokenFn = async (): Promise<TokenResponse> => {
  try {
    const response = await api.post<TokenResponse>(
      AUTH_ROUTES.REFRESH,
      {},
      { skipAuthRefresh: true }
    )
    logger.info('Access token refreshed successfully')
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<unknown>
    logger.error(
      `Failed to refresh token: ${axiosError.message || 'Unknown error'}`,
      {
        status: axiosError.response?.status,
        data: axiosError.response?.data
      }
    )
    throw new Error('Authentication failed: Unable to refresh token')
  }
}

// Logout function (triggers server-side logout via API)
export const logout = async (): Promise<void> => {
  try {
    await api.post<{ message: string }>(AUTH_ROUTES.LOGOUT)
    logger.info('User logged out successfully')
    // No client-side redirect here; rely on server or frontend to handle
  } catch (error) {
    const axiosError = error as AxiosError<unknown>
    logger.error(`Logout failed: ${axiosError.message || 'Unknown error'}`, {
      status: axiosError.response?.status,
      data: axiosError.response?.data
    })
    throw new Error(`Logout failed: ${axiosError.message || 'Unknown error'}`)
  }
}

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config
  },
  (error: AxiosError): Promise<never> => {
    logger.error('Request interceptor error', error)
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<never> => {
    const axiosError = error as AxiosError
    const originalRequest =
      axiosError.config as InternalExtendedAxiosRequestConfig

    if (
      axiosError.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      logger.warn('Received 401 error, attempting token refresh')

      originalRequest._retry = true

      try {
        const { token, refreshToken } = await refreshAccessTokenFn()
        // No need to set cookies client-side; server handles it via Set-Cookie

        // Retry the original request
        const newRequestConfig: AxiosRequestConfig = {
          url: originalRequest.url,
          method: originalRequest.method,
          data: originalRequest.data,
          params: originalRequest.params,
          headers: originalRequest.headers,
          withCredentials: originalRequest.withCredentials,
          baseURL: originalRequest.baseURL
        }

        return api(newRequestConfig)
      } catch (refreshError) {
        logger.error('Token refresh failed, logging out user', refreshError)
        await logout()
        return Promise.reject(
          new Error('Authentication failed: Unable to refresh token')
        )
      }
    }

    if (axiosError.message === 'Network Error') {
      logger.error('Network connectivity issue detected', axiosError)
    } else if (axiosError.response) {
      const status = axiosError.response.status
      const data = axiosError.response.data

      if (status >= 500) {
        logger.error(`Server error (${status})`, {
          data,
          url: originalRequest?.url
        })
      } else if (status === 403) {
        logger.error('Permission denied (403)', {
          url: originalRequest?.url
        })
      } else if (status === 404) {
        logger.warn('Resource not found (404)', {
          url: originalRequest?.url
        })
      } else if (status === 400) {
        logger.error(`API error (400)`, {
          data,
          url: originalRequest?.url,
          method: originalRequest?.method
        })
      } else {
        logger.error(`API error (${status})`, {
          data,
          url: originalRequest?.url,
          method: originalRequest?.method
        })
      }
    } else if (axiosError.request) {
      logger.error('No response received from server', {
        url: originalRequest?.url,
        method: originalRequest?.method
      })
    } else {
      logger.error('Request setup error', axiosError)
    }

    return Promise.reject(axiosError)
  }
)

export default api

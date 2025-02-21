import axios, { AxiosInstance } from 'axios'

const BASE_URL = '/api'

// can be option but considering we might
// add a google location when creating event I think we might need
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    Accept: 'application/json',
    'User-Timezone': userTimezone // Optional for now
  }
})

// Refresh token function
export const refreshAccessTokenFn = async (refreshToken: string) => {
  const response = await api.post<{ token: string; refreshToken: string }>(
    '/auth/refresh',
    {
      refreshToken
    },
    { skipAuthRefresh: true }
  ) // Flag to skip interceptor
  return response.data
}

// Request Interceptor
api.interceptors.request.use(
  config => {
    // No need to manually set Authorization header since cookies are used
    // Our middleware reads auth-token from cookies automatically
    return config
  },
  error => Promise.reject(error)
)

// Response Interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // Check if it's a 401 and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      originalRequest._retry = true // Mark as retried

      try {
        // Get refresh token from cookies (assumes client can access it, or fetch from API)
        const refreshToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('refresh-token='))
          ?.split('=')[1]

        if (!refreshToken) throw new Error('No refresh token available')

        const { token: newAccessToken, refreshToken: newRefreshToken } =
          await refreshAccessTokenFn(refreshToken)

        // Update cookies (client-side, less ideal; ideally server updates them)
        document.cookie = `auth-token=${newAccessToken}; Path=/; HttpOnly; Secure=${
          process.env.NODE_ENV === 'production'
        }; SameSite=Strict; Max-Age=${60 * 60 * 24}`
        document.cookie = `refresh-token=${newRefreshToken}; Path=/; HttpOnly; Secure=${
          process.env.NODE_ENV === 'production'
        }; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}`

        // Retry original request with new token (cookie-based, no header needed)
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        // Redirect to signin if refresh fails
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    if (error.message === 'Network Error') {
      console.error('Network Error:', error)
    } else if (error.response?.status >= 500) {
      console.error('Server Error:', error)
    }

    return Promise.reject(error)
  }
)

export default api

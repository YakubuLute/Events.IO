import axios from 'axios';
import Cookies from 'js-cookie';

import { COOKIES_KEY } from '@/utils/setCookies';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'User-Timezone': userTimezone,
  },
});

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'User-Timezone': userTimezone,
  },
});

export const refreshAccessTokenFn = async (access_token: string) => {
  const response = await authApi.post('/candidates/auth/token/refresh', {
    refreshToken: access_token,
  });
  return response.data;
};

// Request interceptor
authApi.interceptors.request.use(
  async (config) => {
    // get access token from the cache
    const access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response Interceptor
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = Cookies.get(COOKIES_KEY.REFRESH_TOKEN) as string;
    const originalRequest = error.config;
    // console.log('error -----', error);
    if (error.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      const response = await refreshAccessTokenFn(refreshToken);
      const { token, expiresIn } = response.data;
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      Cookies.set(COOKIES_KEY.ACCESS_TOKEN, token, { httpOnly: true });
      Cookies.set(COOKIES_KEY.EXPIRE_IN, expiresIn);
      return authApi(originalRequest);
    } else if (
      error.response.data.message.includes('Authentication token missing') &&
      error.response.data.errCode === 'ERR0000' &&
      !document.location.pathname.startsWith('/profiles/candidate')
    ) {
      // document.location.href = '/candidate/signin';
      console.log('Authorization Error: ', error);
    } else if (error.message === 'Network Error') {
      console.log('Network Error: ', error);
    } else if (error.response && error.response.status >= 500) {
      // handle server error
      console.log('Server Error: ', error);
    }
    return Promise.reject(error);
  }
);

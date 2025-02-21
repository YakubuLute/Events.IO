/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
} from 'axios';
import Cookies from 'js-cookie';

import { COOKIES_KEY } from '@/utils/setCookies';
import { ErrorCodes } from '@/enums/shared';

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formDataConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: '*/*',
    'User-Timezone': userTimezone,
  },
});

export const axiosInstancePublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: '*/*',
    'User-Timezone': userTimezone,
  },
});

export const axiosInstanceFn = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    Accept: '*/*',
    Authorization: `Bearer ${Cookies.get(COOKIES_KEY.ACCESS_TOKEN)}`,
    'User-Timezone': userTimezone,
  },
});

class HttpService<T> {
  private CancelToken: CancelTokenStatic;
  private source: CancelTokenSource;
  private useAccessToken: boolean;

  constructor(useAccessToken = true) {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    this.useAccessToken = useAccessToken;

    // Set up request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        if (this.useAccessToken) {
          const access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
          if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Set up response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        if (response) {
          const data = response.data;
          const access_token = data.data?.access_token;
          const refresh_token = data.data?.refresh_token;
          const expires_in = data.data?.expires_in;

          if (access_token) {
            document.cookie = `${COOKIES_KEY.ACCESS_TOKEN}=${access_token}; path=/; max-age=${expires_in}`;
          }
          if (refresh_token) {
            document.cookie = `${COOKIES_KEY.REFRESH_TOKEN}=${refresh_token}; path=/;`;
          }

          const errorCode = response?.data?.errCode as ErrorCodes;

          if (
            errorCode === ErrorCodes.USER_NO_LONGER_EXISTS ||
            errorCode === ErrorCodes.JWT_EXPIRED
          ) {
            localStorage.clear();
            Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
            Cookies.remove(COOKIES_KEY.EXPIRE_IN);
            Cookies.remove(COOKIES_KEY.REFRESH_TOKEN);
            // window.location.href = '/candidate/signin';
          }

          return response;
        }
        return response;
      },

      async (error) => {
        if (error.response?.status === 401) {
          const refresh_token = Cookies.get(COOKIES_KEY.REFRESH_TOKEN);

          if (refresh_token) {
            try {
              // Call a method to perform token refresh
              const newAccessToken = await this.refreshAccessToken(
                refresh_token
              );
              // set the new access token in the cookie
              if (newAccessToken) {
                Cookies.set(COOKIES_KEY.ACCESS_TOKEN, newAccessToken, {
                  httpOnly: true,
                });
              }
              // Retry the failed request with the new access token
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosInstance(error.config);
            } catch (refreshError) {
              return Promise.reject(refreshError);
            }
          }
        } else if (error.response?.status === 400) {
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  // GET request method
  protected get = (
    endpoint: string,
    params?: any,
    useAccessToken?: boolean
  ): Promise<AxiosResponse<T, any>> => {
    const config: any = {
      params,
      cancelToken: this.source.token,
    };
    if (useAccessToken === undefined) {
      useAccessToken = this.useAccessToken;
    }
    if (useAccessToken) {
      config.headers = {
        Authorization: `Bearer ${Cookies.get(COOKIES_KEY.ACCESS_TOKEN)}`,
      };
    }
    return axiosInstance.get<T>(`${BASE_URL}/${endpoint}`, config);
  };

  // POST request method
  protected post = (
    endpoint: string,
    body: any,
    options?: any,
    useAccessToken?: boolean
  ): Promise<AxiosResponse<T, any>> => {
    const config: any = {
      ...options,
      cancelToken: this.source.token,
    };

    if (useAccessToken) {
      config.headers = {
        Authorization: `Bearer ${Cookies.get(COOKIES_KEY.ACCESS_TOKEN)}`,
      };
    } else {
      useAccessToken = this.useAccessToken;
    }

    return axiosInstance.post<T>(`${BASE_URL}/${endpoint}`, body, config);
  };

  // PATCH request method
  protected patch = (
    endpoint: string,
    body: any,
    params?: any,
    useAccessToken?: boolean
  ): Promise<AxiosResponse<T, any>> => {
    const config: any = {
      ...params,
      cancelToken: this.source.token,
    };
    if (useAccessToken === undefined) {
      useAccessToken = this.useAccessToken;
    }
    if (useAccessToken) {
      config.headers = {
        Authorization: `Bearer ${Cookies.get(COOKIES_KEY.ACCESS_TOKEN)}`,
      };
    }
    return axiosInstance.patch<T>(`${BASE_URL}/${endpoint}`, body, {
      ...config,
    });
  };

  // PUT request method
  protected put = (
    endpoint: string,
    body?: any,
    params?: any,
    useAccessToken?: boolean
  ): Promise<AxiosResponse<T, any>> => {
    const config: any = {
      headers: {},
      ...params,
      cancelToken: this.source.token,
    };
    if (useAccessToken === undefined) {
      useAccessToken = this.useAccessToken;
    }
    if (useAccessToken) {
      config.headers.Authorization = `Bearer ${Cookies.get(
        COOKIES_KEY.ACCESS_TOKEN
      )}`;
    }
    return axiosInstance.put<T>(`${BASE_URL}/${endpoint}`, body, config);
  };

  // DELETE request method
  protected delete = (
    endpoint: string,
    params?: any,
    data?: any,
    useAccessToken?: boolean
  ): Promise<AxiosResponse<T, any>> => {
    const config: any = {
      ...params,
      data,
      cancelToken: this.source.token,
    };
    if (useAccessToken === undefined) {
      useAccessToken = this.useAccessToken;
    }
    if (useAccessToken) {
      config.headers = {
        Authorization: `Bearer ${Cookies.get(COOKIES_KEY.ACCESS_TOKEN)}`,
      };
    }
    return axiosInstance.delete<T>(`${BASE_URL}/${endpoint}`, config);
  };

  private updateCancelToken() {
    this.source = this.CancelToken.source();
  }

  cancel = () => {
    this.source.cancel('Explicitly cancelled HTTP request');
    this.updateCancelToken();
  };

  // Method to refresh the access token based on the provided refresh token
  private async refreshAccessToken(refreshToken: string): Promise<string> {
    let refreshEndpoint = '';
    const browserUrl = window.location.pathname;

    if (browserUrl.startsWith('/employer')) {
      refreshEndpoint = `${BASE_URL}/employer/auth/token/refresh`;
    } else if (browserUrl.startsWith('/university')) {
      refreshEndpoint = `${BASE_URL}/university/auth/token/refresh`;
    } else if (browserUrl.startsWith('/candidate')) {
      refreshEndpoint = `${BASE_URL}/candidates/auth/token/refresh`;
    }

    const response = await axios.post(refreshEndpoint, { refreshToken });
    return response.data.access_token;
  }

  // Method to create query strings
  protected createQueryStrings = (queryParams: {
    [key: string]: string | number | boolean;
  }) => {
    // Filter out properties with null values
    if (queryParams !== null) {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([_, value]) =>
            (value !== '' && value !== 'none') ||
            value !== null ||
            value !== undefined
        )
      );
      // Create a query string from the filteredParams object
      const queryString = Object.keys(filteredParams)
        .map((key) => `${key}=${encodeURIComponent(filteredParams[key])}`)
        .join('&');
      return queryString;
    }
    return '';
  };
}

export default HttpService;

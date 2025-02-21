import Cookies from 'js-cookie';

export type DataProps = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  two_fa: string;
};

export enum COOKIES_KEY {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  EXPIRE_IN = 'expires_in',
  USER_INFO = 'user_info',
  TWO_FA = 'two_fa',
  MFA_TOKEN = 'mfa_token', // this is used to resend MFA OTPs
  MFA_TYPE = 'mfa_type',
  REFERRAL_DATA = 'referral_data',
  REFERRAL_CODE = 'referral_code',
  TRAFFIC_SOURCE = 'traffic_source',
  SCAN_AUTH_TOKEN = 'scan_auth_token',
  FROM_URL = 'from_url',
}

export const setCookies = (data: DataProps) => {
  Cookies.set(COOKIES_KEY.ACCESS_TOKEN, data.access_token);
  Cookies.set(COOKIES_KEY.EXPIRE_IN, data.expires_in);
  Cookies.set(COOKIES_KEY.REFRESH_TOKEN, data.refresh_token);
  Cookies.set(COOKIES_KEY.TWO_FA, data.two_fa);

  sessionStorage.setItem(COOKIES_KEY.USER_INFO, JSON.stringify(data));
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    document.cookie = cookies[i]
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  }
};

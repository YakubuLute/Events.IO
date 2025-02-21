import { cookies } from 'next/headers';

import { MFATypes } from '@/enums/shared/mfa_types.enum';
import { COOKIES_KEY } from './setCookies';

type dataProps = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  two_fa: string;
  mfaType?: MFATypes;
  mfaToken?: string;
};

/**
 * @description get cookie
 * @param key the key
 * @returns
 */
export const getOAuthCookie = <T extends string>(
  key: COOKIES_KEY
): { name: string; value: T; path: string } => {
  const newCookie = cookies();

  return newCookie.get(key) as any;
};

export const setOAuthCookies = (data: dataProps) => {
  const newCookie = cookies();
  newCookie.set({
    name: COOKIES_KEY.ACCESS_TOKEN,
    value: data.access_token,
    secure: true,
  });
  newCookie.set({
    name: COOKIES_KEY.EXPIRE_IN,
    value: data.expires_in,
    secure: true,
  });
  newCookie.set({
    name: COOKIES_KEY.REFRESH_TOKEN,
    value: data.refresh_token,
    secure: true,
  });

  if (data?.mfaToken) {
    newCookie.set({
      name: COOKIES_KEY.MFA_TOKEN,
      value: data.mfaToken,
      secure: true,
    });
  }

  if (data?.mfaType) {
    newCookie.set({
      name: COOKIES_KEY.MFA_TYPE,
      value: data.mfaType,
      secure: true,
    });
  }

  newCookie.set({
    name: COOKIES_KEY.TWO_FA,
    value: data.two_fa,
    secure: true,
  });

  newCookie.set({
    name: COOKIES_KEY.TWO_FA,
    value: data.two_fa,
    secure: true,
  });

  // sessionStorage.setItem(COOKIES_KEY.USER_INFO, JSON.stringify(data));
};

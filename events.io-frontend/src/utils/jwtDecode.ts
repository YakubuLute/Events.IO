import jwt_decode from 'jwt-decode';

import Cookies from 'js-cookie';
import { COOKIES_KEY } from '@/utils/setCookies';
import { TAccessToken } from '@/@types/shared/type';


export default function decodeJwt<T>(access_token: string): T {
  try {
    const result = jwt_decode(access_token) || undefined;
    // const result = jwt.decode(access_token);

    return result as T;
  } catch (err) {
    return null as T;
  }
}

const accessToken = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
export const userDecoded: TAccessToken = decodeJwt(accessToken as string);

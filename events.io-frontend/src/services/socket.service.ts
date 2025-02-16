import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

import { COOKIES_KEY } from '@/utils/setCookies';
import { BASE_URL } from './base.service';

const access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
export const socket = io(BASE_URL, {
  autoConnect: true,
  auth: {
    token: `Bearer ${access_token}`,
  },

  extraHeaders: {
    Authorization: `Bearer ${access_token}`,
  },
});

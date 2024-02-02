import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(key, value, { ...option });
};

export const removeCookie = (key: string) => {
  return cookies.remove(key);
};

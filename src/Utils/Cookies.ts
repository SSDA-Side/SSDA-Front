import { Cookies, ReactCookieProps } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: string, options: ReactCookieProps['defaultSetOptions']) => {
  return cookies.set(key, value, { ...options });
};

export const removeCookie = (key: string) => {
  return cookies.remove(key);
};

import { getCookie } from '@Utils/Cookies';
import Axios, { type CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // CORS 문제 해결
  },
  withCredentials: true,
  timeout: 2500,
};

const axios = Axios.create(axiosConfig);

axios.interceptors.request.use(
  (request) => {
    const token = getCookie('accessToken');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios };

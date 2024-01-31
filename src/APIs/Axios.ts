import { getCookie } from '@Utils/Cookies';
import Axios, { type CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: 'http://118.67.143.25:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // CORS 문제 해결
  },
  withCredentials: true,
  timeout: 2500,
};

const axios = Axios.create(axiosConfig);

axios.interceptors.request.use((request) => {
  const token = getCookie('accessToken');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
});

export { axios };

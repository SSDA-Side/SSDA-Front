import Axios, { type CreateAxiosDefaults, AxiosError } from 'axios';

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

axios.interceptors.request.use(
  // 요청이 성공했을 때 실행될 함수
  (config) => {
    return config;
  },
  // 요청이 실패했을 때 실행될 함수
  (error: AxiosError) => {
    console.log('axios request error', error);
    return Promise.reject(error);
  },
);

export { axios };

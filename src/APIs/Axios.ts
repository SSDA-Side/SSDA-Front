import Axios, { type CreateAxiosDefaults, AxiosError } from 'axios';

const getAxiosInstance = () => {
  const axiosConfig: CreateAxiosDefaults = {
    baseURL: '',
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

  return axios;
};

export const axios = getAxiosInstance;

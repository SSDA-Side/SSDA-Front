import Axios, { type CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: '',
  timeout: 2500,
};

const axios = Axios.create(axiosConfig);

export { axios };

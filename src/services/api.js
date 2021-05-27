import axios from 'axios';
import { getToken } from './auth';

const token =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMC4xMTEuMjIyLTAwIiwiaWF0IjoxNjIyMDcwNjM0LCJleHAiOjE2MjI2NzU0MzR9.nDCvCahx-xo6WluglPuxb5laND77WRIMVisZZp1p2Go';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.interceptors.request.use(async (config) => {
  // const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

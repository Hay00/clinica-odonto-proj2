import axios from 'axios';
import { getToken } from './auth';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMC4xMTEuMjIyLTAwIiwiaWF0IjoxNjE5OTI4OTQzLCJleHAiOjE2MjA1MzM3NDN9.ieW0lkn0OKmE_GBG14L_5FQv65NBN1o9GpAVq_Ot9YQ';

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

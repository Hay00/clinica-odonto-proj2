import axios from 'axios';
import { getToken } from './auth';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMC4xMTEuMjIyLTAwIiwiaWF0IjoxNjIwNTM2NTg1LCJleHAiOjE2MjExNDEzODV9.uB0x54IWG0AtTF9lxsFN7jfBj8N9JbIKgk70W0Iulf0';

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

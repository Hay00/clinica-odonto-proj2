import axios from 'axios';
import { getToken } from './auth';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0My4xOTEuMjQwLTgxIiwiaWF0IjoxNjE5NjUwNzI2LCJleHAiOjE2MTk3MzcxMjZ9.Ia_IinB3Vi_u7dr3zGf6AtaoYJs7Z_ef9P4kfwAkTiE';

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

import axios from 'axios';
import { getToken } from './auth';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMC4xMTEuMjIyLTAwIiwiaWF0IjoxNjIxNDY0NjA5LCJleHAiOjE2MjIwNjk0MDl9.FPKzSJfBnaq9Tcobit5YXHAuwxmEnMoWe9u1GUi425k';

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

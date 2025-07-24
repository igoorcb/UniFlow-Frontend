import axios from 'axios';
import auth from '../stores/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  if (auth.state.token) {
    config.headers.Authorization = `Bearer ${auth.state.token}`;
  }
  return config;
});

export default api;
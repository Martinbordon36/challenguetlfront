import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

// Instancia base
const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Interceptor para incluir el token (aunque no lo use la API)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fake_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

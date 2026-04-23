import axios from 'axios';

// Centralized Axios instance for backend communication
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Inject the authorization token into every outgoing request
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('alap_token');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

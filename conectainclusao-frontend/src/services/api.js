import axios from 'axios';

// URL base do seu backend Spring Boot
const API_BASE_URL = import.meta.env.PROD
  ? 'https://SEU_DOMINIO_RENDER.onrender.com/api'
  : 'http://127.0.0.1:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para adicionar o token JWT automaticamente em requisições futuras
// O token é armazenado no localStorage após o login
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
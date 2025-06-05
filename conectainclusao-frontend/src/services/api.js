import axios from 'axios';

// URL base do seu backend Spring Boot
// Certifique-se de que a porta está correta (8080 é o padrão)
const API_BASE_URL = 'http://127.0.0.1:8081/api'; // Mude localhost para 127.0.0.1

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
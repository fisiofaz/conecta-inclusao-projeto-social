import axios from 'axios';

// URL base do seu backend Spring Boot
const API_BASE_URL = import.meta.env.PROD
  ? 'https://conecta-inclusao-backend.onrender.com/api'
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

// ✨ MELHORIA: Interceptor para LIDAR com respostas de erro
api.interceptors.response.use(
  // O primeiro argumento é para respostas de sucesso, apenas as retornamos
  (response) => response,
  // O segundo argumento é para respostas de erro
  (error) => {
    // Verifica se o erro é '401 Unauthorized'
    if (error.response && error.response.status === 401) {
      console.log('Token expirado ou inválido. Deslogando...');
      // Limpa os dados de autenticação do armazenamento local
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('tipoPerfil'); // Limpa também o perfil      
      // Remove o cabeçalho de autorização das futuras requisições
      delete api.defaults.headers.common['Authorization'];
      // Redireciona o usuário para a página de login
      // Usamos window.location para forçar um recarregamento da página, limpando qualquer estado
      window.location.href = '/login';
    }
    // Para qualquer outro erro, apenas o rejeitamos para que possa ser tratado localmente
    return Promise.reject(error);
  }
);

export default api;
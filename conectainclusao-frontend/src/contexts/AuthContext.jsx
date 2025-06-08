import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação que envolverá sua aplicação
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

// Efeito para carregar o token e o tipoPerfil do localStorage ao inicializar o app
useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedTipoPerfil = localStorage.getItem('tipoPerfil');
    if (storedToken && storedTipoPerfil) {
        setAuth({ token: storedToken, tipoPerfil: storedTipoPerfil });
    }
}, []); // O array vazio garante que roda apenas uma vez, na montagem do componente

// Função para login
const login = async (email, senha) => {
    try {
    const response = await api.post('/auth/login', { email, senha });

    if (response.data.token) {
        // Supondo que o backend retorna o tipoPerfil no corpo da resposta do login
        const tipoPerfil = response.data.tipoPerfil;

        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('tipoPerfil', tipoPerfil);
        setAuth({ token: response.data.token, tipoPerfil: tipoPerfil });
        return true;
    } else {
        return false;
    }
    } catch (err) {
    console.error('Erro no login (AuthContext):', err);
      return false; // Login falhou (erro de API)
    }
};

// Função para logout
const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('tipoPerfil');
    setAuth(null);
};

  // Verifica se o usuário está autenticado
const isAuthenticated = () => {
    return !!auth?.token; // Retorna true se houver um token no estado 'auth'
};

// Retorna o tipo de perfil do usuário logado
const getTipoPerfil = () => {
    return auth?.tipoPerfil || null; // Retorna o tipoPerfil ou null
};

// O valor que será disponibilizado para os componentes filhos
const contextValue = {
    auth, // O estado de autenticação completo
    login,
    logout,
    isAuthenticated,
    getTipoPerfil,
};

return (
    <AuthContext.Provider value={contextValue}>
    {children}
    </AuthContext.Provider>
);
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
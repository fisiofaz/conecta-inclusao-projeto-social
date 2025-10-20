import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação que envolverá sua aplicação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efeito para carregar o token e o tipoPerfil do localStorage ao inicializar o app
    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem('jwtToken');

            if (storedToken) {
                try {
                // Define o token no cabeçalho da API para a próxima requisição
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const response = await api.get('/auth/profile'); // Endpoint de exemplo para pegar dados do usuário logado
                    setUser(response.data); // Armazena o objeto do usuário completo
                } catch (error) {
                    console.error("Token inválido ou expirado. Removendo autenticação.", error);
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('tipoPerfil');
                }
            }
            setLoading(false); // Finaliza o loading após a tentativa de verificação
        };
        loadUserFromToken();
    }, []);


    // Função para login
    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });
            // Verificamos por 'token' e 'tipoPerfil', que é o que seu backend envia
            if (response.data.token && response.data.tipoPerfil) {
                const { token, tipoPerfil } = response.data;
                localStorage.setItem('jwtToken', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // Criamos um objeto de usuário simples para o contexto
                // O resto dos dados (nome, email) será buscado pelo useEffect
                setUser({ tipoPerfil: tipoPerfil });
                return true;
            }
            return false;
        } catch (err) {
            console.error('Erro no login (AuthContext):', err);
            return false;
        }
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem('jwtToken');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Verifica se o usuário está autenticado
    const isAuthenticated = () => {
        return !!user; // Retorna true se houver um usuário no estado 'user'
    };

    // Retorna o tipo de perfil do usuário logado
    const getTipoPerfil = () => {
        return user?.tipoPerfil || null; // Retorna o tipoPerfil ou null
    };

    // O valor que será disponibilizado para os componentes filhos
    const contextValue = {
    user, // O estado de autenticação completo
    loading,
    login,
    logout,
    isAuthenticated,
    getTipoPerfil,
    };

    // 5. Enquanto estiver carregando, não renderiza o resto do app
    // Isso previne "piscadas" na tela e redirecionamentos incorretos
    if (loading) {
        return <div>Carregando aplicação...</div>; // Ou um componente de Spinner/Loader
    }

    return (
    <AuthContext.Provider value={contextValue}>
    {children}
    </AuthContext.Provider>
    );
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
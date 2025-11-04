import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState({
        opportunities: new Set(),
        healthResources: new Set()
    });

     // Função para buscar os favoritos do usuário
    const fetchFavorites = async () => {
        try {
            // 👇 CORRIGIDO: Removido /api
            const response = await api.get('/favorites/my-favorites');
            const oppIds = new Set();
            const healthIds = new Set();
            response.data.forEach(item => {
            if (item.type === 'opportunity') {
                    oppIds.add(item.id);
                } else if (item.type === 'health_resource') {
                    healthIds.add(item.id);
                }
            });
            setFavorites({
                opportunities: oppIds,
                healthResources: healthIds
            });
        } catch (error) {
            console.error("Erro ao carregar favoritos:", error);
        }
    };

    // Efeito para carregar o token e o perfil
    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem('jwtToken');

            if (storedToken) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const response = await api.get('/auth/profile'); 
                    setUser(response.data); 
                    await fetchFavorites();
                } catch (error) {
                    console.error("Token inválido ou expirado. Removendo autenticação.", error);
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('tipoPerfil');
                }
            }
            setLoading(false); 
        };
        loadUserFromToken();
    }, []);

    // Função para login
    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });

            if (response.data && response.data.token) {
                const { token } = response.data;

                localStorage.setItem('jwtToken', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                try {
                    const profileResponse = await api.get('/auth/profile');
                    setUser(profileResponse.data);
                    await fetchFavorites();
                    return true;
                } catch (profileError) {
                    console.error("Login bem-sucedido, mas falha ao buscar perfil/favoritos.", profileError); 
                    logout(); 
                    return false;
                }
            } else {
            console.error("FALHA: A resposta do backend não continha 'token'.", response.data);
            return false;
            }

        } catch (err) {
            console.error('ERRO durante a chamada da API no AuthContext:', err); 
            return false;
        }
    };

    // Função para logout
    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tipoPerfil'); 
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setFavorites({ opportunities: new Set(), healthResources: new Set() }); 
    };

    // Verifica se o usuário está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    // Retorna o tipo de perfil do usuário logado
    const getTipoPerfil = () => {
        return user?.tipoPerfil || null;
    };

    // --- Funções para gerenciar favoritos (CORRIGIDAS) ---
    
    const addFavorite = async (type, id) => {
        if (!isAuthenticated()) return; 
        try {
            // 👇 CORRIGIDO: Removido /api
            await api.post(`/favorites/${type}/${id}`);
            const stateKey = type === 'opportunity' ? 'opportunities' : 'healthResources';
            setFavorites(prev => {
                const newSet = new Set(prev[stateKey]);
                newSet.add(id);
                return { ...prev, [stateKey]: newSet };
            });
        } catch (error) {
            console.error(`Erro ao adicionar favorito ${type} ${id}:`, error);
        }
    };

    const removeFavorite = async (type, id) => {
        if (!isAuthenticated()) return;
        try {
            await api.delete(`/favorites/${type}/${id}`);
            const stateKey = type === 'opportunity' ? 'opportunities' : 'healthResources';
            setFavorites(prev => {
                const newSet = new Set(prev[stateKey]);
                newSet.delete(id);
                return { ...prev, [stateKey]: newSet };
            });
        } catch (error) {
            console.error(`Erro ao remover favorito ${type} ${id}:`, error);
        }
    };

    const isFavorite = (type, id) => {
        const stateKey = type === 'opportunity' ? 'opportunities' : 'healthResources';
        return favorites[stateKey]?.has(id) || false;
    };

    // O valor que será disponibilizado
    const contextValue = {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        getTipoPerfil,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };

    if (loading) {
        return <div>Carregando aplicação...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
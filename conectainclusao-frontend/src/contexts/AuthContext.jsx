import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação que envolverá sua aplicação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Usamos 'Set' para performance (adição, remoção e checagem rápidas)
    const [favorites, setFavorites] = useState({
        opportunities: new Set(),
        healthResources: new Set()
    });

    // Função para buscar os favoritos do usuário ---
    const fetchFavorites = async () => {
        try {
            // 1. Chama a nova API que criamos no backend
            const response = await api.get('/favorites/my-favorites');
            
            // 2. Processa os resultados
            const oppIds = new Set();
            const healthIds = new Set();
            
            response.data.forEach(item => {
                if (item.type === 'opportunity') {
                    oppIds.add(item.id);
                } else if (item.type === 'health') {
                    healthIds.add(item.id);
                }
            });
            
            // 3. Salva os IDs no estado
            setFavorites({
                opportunities: oppIds,
                healthResources: healthIds
            });
        } catch (error) {
            console.error("Erro ao carregar favoritos:", error);
            // Não bloqueia o app, apenas não carrega os favoritos
        }
    };


    // Efeito para carregar o token e o perfil (MODIFICADO para buscar favoritos)
    useEffect(() => {
        const loadUserFromToken = async () => {
            const storedToken = localStorage.getItem('jwtToken');

            if (storedToken) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    // 1. Busca o perfil do usuário
                    const response = await api.get('/auth/profile'); 
                     setUser(response.data); // Armazena o objeto do usuário completo
                    
                    // 2. Busca os favoritos do usuário
                    await fetchFavorites(); // 👈 ADICIONADO

                } catch (error) {
                    console.error("Token inválido ou expirado. Removendo autenticação.", error);
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('tipoPerfil'); // Mantendo sua lógica
                }
            }
            setLoading(false); 
        };
        loadUserFromToken();
    }, []);


    // Função para login (MODIFICADA para buscar perfil e favoritos)
    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });

            if (response.data && response.data.token) {
                const { token } = response.data;

                localStorage.setItem('jwtToken', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Agora, após o login, buscamos o perfil completo e os favoritos
                // (Isso unifica a lógica com o useEffect)
                try {
                    // 1. Busca o perfil
                    const profileResponse = await api.get('/auth/profile');
                    setUser(profileResponse.data); // Armazena o objeto do usuário completo
                    
                    // 2. Busca os favoritos
                    await fetchFavorites(); // 👈 ADICIONADO

                } catch (profileError) {
                    console.error("Login bem-sucedido, mas falha ao buscar perfil.", profileError);
                    logout(); // Desloga se não conseguir pegar o perfil
                    return false;
                }
                return true;
            } else {
                console.error("FALHA: A resposta do backend não continha 'token'.", response.data);
                return false;
            }

        } catch (err) {
            console.error('ERRO durante a chamada da API no AuthContext:', err);
            return false;
        }
    };

    // Função para logout (MODIFICADA para limpar favoritos)
    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tipoPerfil'); // Mantendo sua lógica
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        // 👇 ADICIONADO: Limpa o estado dos favoritos ao deslogar
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

    //Novas funções para gerenciar favoritos ---
    
    // 'type' deve ser 'opportunity' ou 'health' (como na API)
    const addFavorite = async (type, id) => {
        if (!isAuthenticated()) return; // Não faz nada se não estiver logado
        try {
            await api.post(`/favorites/${type}/${id}`);
            // Atualiza o estado local para a UI responder imediatamente
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
            // Atualiza o estado local
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

    // 'type' deve ser 'opportunity' ou 'health'
    const isFavorite = (type, id) => {
        const stateKey = type === 'opportunity' ? 'opportunities' : 'healthResources';
        return favorites[stateKey]?.has(id) || false;
    };


    //O valor que será disponibilizado ---
    const contextValue = {
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        getTipoPerfil,
        
        //Funções e estado de Favoritos expostos para o App
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

// Hook personalizado para consumir o contexto
export const useAuth = () => useContext(AuthContext);
import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Seu serviço de API
import OpportunityCard from '../components/OpportunityCard';
import HealthResourceCard from '../components/HealthResourceCard';
import { LoaderCircle, Heart, Briefcase, HeartHandshake } from 'lucide-react'; // Ícones

function MyFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega os favoritos do usuário quando a página é montada
  useEffect(() => {
    const fetchMyFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/favorites/my-favorites');
        setFavorites(response.data);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
        setError("Não foi possível carregar seus favoritos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyFavorites();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Função para renderizar o card correto (igual à da página de Busca)
  const renderFavoriteCard = (item) => {
    switch (item.type) {
      case 'opportunity': {
        // O OpportunityCard espera um objeto 'opportunity'
        const opportunityData = {
          id: item.id,
          titulo: item.titulo,
          descricao: item.descricao,
          localizacao: item.localizacao,
          // (Adicione outros campos se o seu card precisar)
        };
        return (
          <OpportunityCard 
            key={`opp-${item.id}`}
            opportunity={opportunityData}
            canManage={false} // Favoritos não são para gerenciamento
            onDelete={null}
            icon={<Briefcase size={20} className="flex-shrink-0 mr-2 text-blue-500" />}
          />
        );
      }
      case 'health': { // Lembre-se que usamos 'health' no backend
        // O HealthResourceCard espera um objeto 'resource'
        const resourceData = {
          id: item.id,
          nome: item.nome, // O backend envia 'nome' para health
          endereco: item.endereco,
          especialidade: item.especialidade,
          // (Adicione outros campos se o seu card precisar)
        };
        return (
          <HealthResourceCard 
            key={`hr-${item.id}`}
            resource={resourceData}
            canManage={false} // Favoritos não são para gerenciamento
            onDelete={null}
            icon={<HeartHandshake size={20} className="flex-shrink-0 mr-2 text-green-500" />}
          />
        );
      }
      default:
        return null; // Ou um card de 'tipo desconhecido'
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Meus Favoritos
      </h1>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
          <span className="text-lg text-gray-600">Carregando seus favoritos...</span>
        </div>
      )}

      {error && (
         <div className="py-10 text-center text-red-600">
           <p>{error}</p>
         </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          <Heart size={48} className="mx-auto mb-4" />
          <p className="text-xl">Você ainda não salvou nenhum favorito.</p>
          <p>Clique no ícone de coração nas vagas ou serviços para salvá-los aqui.</p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map(renderFavoriteCard)}
        </div>
      )}
    </div>
  );
}

export default MyFavoritesPage;
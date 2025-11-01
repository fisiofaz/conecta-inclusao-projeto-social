import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api'; 

// Cards
import OpportunityCard from '../components/OpportunityCard';
import HealthResourceCard from '../components/HealthResourceCard';
import ComplaintCard from '../components/ComplaintCard'; 
import Button from '../components/Button';

// Ícones
import { Briefcase, HeartHandshake, ShieldAlert, SearchX, LoaderCircle} from 'lucide-react';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams(); 
  const query = searchParams.get('q');
  
  useEffect(() => {
    // ... (O seu useEffect de busca continua o mesmo) ...
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        setSearchResults([]); 
        try {
          const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
          setSearchResults(response.data);
        } catch (err) {
          console.error('Erro ao buscar resultados:', err);
          setError(`Não foi possível realizar a busca por "${query}". Tente novamente.`);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  }, [query]); 

  // --- FUNÇÃO RENDERIZADORA (AGORA 100% CORRIGIDA) ---
  const renderResultCard = (result) => {
    switch (result.type) {
      case 'opportunity': {
        const opportunityData = {
            id: result.id,
            titulo: result.title,
            descricao: result.description,
            localizacao: result.location,
            empresaOuOrgResponsavel: result.company,
            tipoOportunidade: result.details,
        };
        return (
          <OpportunityCard 
            key={`opp-${result.id}`} 
            opportunity={opportunityData} 
            canManage={false} 
            onDelete={null} 
            icon={<Briefcase size={20} className="flex-shrink-0 mr-2 text-blue-500" />}
          />
        );
      }

      case 'health_resource': { // 👈 CHAVE ADICIONADA
        const resourceData = {
            id: result.id,
            nome: result.title,
            especialidade: result.description, 
            endereco: result.location,
            telefone: result.phone,
        };
        return (
          <HealthResourceCard 
            key={`hr-${result.id}`} 
            resource={resourceData} 
            canManage={false} 
            onDelete={null} 
            icon={<HeartHandshake size={20} className="flex-shrink-0 mr-2 text-green-500" />}
          />
        );
      }

      case 'complaint': {
        const complaintData = {
            id: result.id,
            titulo: result.title,
            descricao: result.description,
            localizacaoOcorrencia: result.location,
            tipoProblema: result.details,
            status: result.status,
        };
        return (
          <ComplaintCard
            key={`comp-${result.id}`} 
            complaint={complaintData}
            canManage={false} // A busca é pública
            onDelete={null} 
          />
        );
      }

      default:
        return (
          <div key={`unknown-${result.id}`} className="p-4 text-center bg-gray-100 border rounded col-span-full">
            <p>Resultado de tipo desconhecido: {result.title || `ID ${result.id}`}</p> 
          </div>
        );
      } // Fim do switch
    }; // Fim do renderResultCard
  
  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]"> 
      <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl sm:text-left">
        Resultados da Busca por: <span className="text-blue-600">{query || '...'}</span>
      </h1>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
          <span className="text-lg text-gray-600">Buscando resultados...</span>
        </div>
      )}

      {error && (
        <div className="py-10 text-center">
          <p className="mb-4 font-bold text-red-600">{error}</p>
          <Button onClick={() => window.location.reload()} variant="primary">Tentar Novamente</Button>
        </div>
      )}

      {!loading && !error && searchResults.length === 0 && query && (
        <div className="px-4 py-10 text-center">
          <SearchX size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="mb-2 text-xl text-gray-600">Nenhum resultado encontrado para "{query}".</p>
          <p className="text-gray-500">Tente buscar por termos diferentes ou mais gerais.</p>
        </div>
      )}

      {!loading && !error && searchResults.length === 0 && !query && (
        <p className="py-10 text-center text-gray-600">Use a barra de busca na navegação para encontrar oportunidades ou recursos.</p>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map(renderResultCard)}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
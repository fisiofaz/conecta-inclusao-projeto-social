import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api'; // Nosso serviço de API


import OpportunityCard from '../components/OpportunityCard';
import HealthResourceCard from '../components/HealthResourceCard';
import Button from '../components/Button';

import { Briefcase, HeartHandshake, SearchX, LoaderCircle} from 'lucide-react';


function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams(); // Hook para ler parâmetros da URL

  // Pega o valor do parâmetro 'q' da URL (?q=termo)
  const query = searchParams.get('q');

  useEffect(() => {
    // Só faz a busca se houver um termo na URL
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        setSearchResults([]); // Limpa resultados anteriores
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

  const renderResultCard = (result) => {
    let cardComponent;
    let iconComponent;
    
    switch (result.type) { 
      case 'opportunity':
        iconComponent = <Briefcase size={20} className="flex-shrink-0 mr-2 text-blue-500" />;
        break;
      case 'health_resource':
        iconComponent = <HeartHandshake size={20} className="flex-shrink-0 mr-2 text-green-500" />;
        break;
      default:
        iconComponent = null;
    }
    
    switch (result.type) { 
      case 'opportunity':
        cardComponent = (
          <OpportunityCard 
            key={`opp-${result.id}`} 
            opportunity={result} 
            canManage={false} 
            onDelete={null} 
            icon={iconComponent} // Passa o ícone aqui
          />
        );
        break;
      case 'health_resource':
        cardComponent = (
          <HealthResourceCard 
            key={`hr-${result.id}`} 
            resource={result} 
            canManage={false} 
            onDelete={null} 
            icon={iconComponent} // Passa o ícone aqui
          />
        );
        break;
      default:
      // Mantém o placeholder para tipos desconhecidos
      return (
        <div key={`unknown-${result.id}`} className="p-4 text-center bg-gray-100 border rounded col-span-full">
          {/* Ajuste: Usar result.title ou result.nome para mais flexibilidade */}
          <p>Resultado de tipo desconhecido: {result.title || result.nome || `ID ${result.id}`}</p> 
        </div>
      );
    };
    return cardComponent;
  };
  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]"> 
      <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl sm:text-left">
        Resultados da Busca por: <span className="text-blue-600">{query || '...'}</span>
      </h1>

      {/* 2. Mensagem de Carregamento Melhorada */}
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

      {/* 3. Mensagem "Sem Resultados" Melhorada */}
      {!loading && !error && searchResults.length === 0 && query && (
        <div className="px-4 py-10 text-center">
          <SearchX size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="mb-2 text-xl text-gray-600">Nenhum resultado encontrado para "{query}".</p>
          <p className="text-gray-500">Tente buscar por termos diferentes ou mais gerais.</p>
        </div>
      )}
      
      {/* Mensagem se não houver termo de busca */}
       {!loading && !error && searchResults.length === 0 && !query && (
         <p className="py-10 text-center text-gray-600">Use a barra de busca na navegação para encontrar oportunidades ou recursos.</p>
      )}

      {/* Exibição dos Resultados */}
      {!loading && !error && searchResults.length > 0 && (
        // Grid já era responsivo, mantido como estava
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map(renderResultCard)}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api'; // Nosso serviço de API


import OpportunityCard from '../components/OpportunityCard';
import HealthResourceCard from '../components/HealthResourceCard';


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
   
    switch (result.type) { 
      case 'opportunity':
        return <OpportunityCard key={`opp-${result.id}`} opportunity={result} />;
      case 'health_resource':
        return <HealthResourceCard key={`hr-${result.id}`} resource={result} />;
      default:
        return (
          <div key={`unknown-${result.id}`} className="p-4 bg-gray-100 border rounded">
            <p>Resultado desconhecido: {result.titulo || result.nome}</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-[calc(100vh-200px)]"> {/* Altura mínima para preencher a tela */}
      <h1 className="mb-6 text-3xl font-bold">
        Resultados da Busca por: <span className="text-blue-600">{query}</span>
      </h1>

      {loading && <p className="text-center text-gray-500">Buscando...</p>}
      
      {error && <p className="font-bold text-center text-red-600">{error}</p>}

      {!loading && !error && searchResults.length === 0 && query && (
        <p className="text-center text-gray-600">Nenhum resultado encontrado para "{query}".</p>
      )}
      
      {!loading && !error && searchResults.length === 0 && !query && (
         <p className="text-center text-gray-600">Digite um termo na barra de busca acima.</p>
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
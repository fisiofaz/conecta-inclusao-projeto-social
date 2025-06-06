import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // useEffect é um hook que executa efeitos colaterais em componentes funcionais.
  // Neste caso, faremos a requisição da API quando o componente for montado ([] como segundo argumento).
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Faz a requisição GET para o endpoint de oportunidades do backend
        const response = await api.get('/opportunities');
        setOpportunities(response.data); 
      } catch (err) {
        console.error('Erro ao buscar oportunidades:', err);
        setError('Não foi possível carregar as oportunidades. Tente novamente mais tarde.');
      } finally {
        setLoading(false); 
      }
    };

    fetchOpportunities();
  }, []); 

  if (loading) {
    return <div className="opportunity-list-container">Carregando oportunidades...</div>;
  }

  if (error) {
    return <div className="opportunity-list-container"><p className="opportunity-error-message">{error}</p></div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10">Oportunidades Disponíveis</h2>
      {opportunities.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Nenhuma oportunidade encontrada. Cadastre uma!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">{opportunity.titulo}</h3>
              <p className="text-sm text-gray-700 mb-2"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Local:</strong> {opportunity.localizacao}</p>
              <p className="text-xs text-gray-500 mb-4 flex-grow">{opportunity.requisitosAcessibilidade}</p>
              <Link
                to={`/opportunities/${opportunity.id}`}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600 transition-colors duration-300 self-start"
              >
                Ver Detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OpportunityListPage;
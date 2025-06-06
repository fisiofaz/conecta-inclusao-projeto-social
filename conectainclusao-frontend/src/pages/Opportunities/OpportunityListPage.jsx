import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './OpportunityListPage.css';
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
    <div className="opportunity-list-container">
      <h2 className="opportunity-list-title">Oportunidades Disponíveis</h2>
      {opportunities.length === 0 ? (
        <p className="opportunity-no-found-message">Nenhuma oportunidade encontrada. Cadastre uma!</p>
      ) : (
        <div className="opportunity-list-grid">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="opportunity-card">
              <h3 className="opportunity-card-title">{opportunity.titulo}</h3>
              <p><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
              <p><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
              <p><strong>Local:</strong> {opportunity.localizacao}</p>
              <p><strong>Acessibilidade:</strong> {opportunity.requisitosAcessibilidade}</p>
              <p className="opportunity-card-description">{opportunity.descricao}</p>
              <p className="opportunity-card-contact">Contato: {opportunity.contato}</p>
              <p className="opportunity-card-date">Publicado em: {opportunity.dataPublicacao}</p>
              <Link to={`/opportunities/${opportunity.id}`} className="opportunity-details-button">Ver Detalhes</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OpportunityListPage;
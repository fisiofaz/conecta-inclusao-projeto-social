import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import './HealthResourceListPage.css'; 
import { Link } from 'react-router-dom'; 

function HealthResourceListPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthResources = async () => {
      try {
        setLoading(true);
        setError(null);
        // Faz a requisição GET para o endpoint de recursos de saúde (público)
        const response = await api.get('/health-resources');
        setResources(response.data);
      } catch (err) {
        console.error('Erro ao buscar recursos de saúde:', err);
        setError('Não foi possível carregar os recursos de saúde. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthResources();
  }, []);

  if (loading) {
    return <div className="health-resource-list-container">Carregando recursos de saúde...</div>;
  }

  if (error) {
    return <div className="health-resource-list-container"><p className="health-resource-error-message">{error}</p></div>;
  }

  return (
    <div className="health-resource-list-container">
      <h2 className="health-resource-list-title">Recursos de Saúde e Bem-Estar</h2>
      {resources.length === 0 ? (
        <p className="health-resource-no-found-message">Nenhum recurso de saúde encontrado.</p>
      ) : (
        <div className="health-resource-list-grid">
          {resources.map((resource) => (
            <div key={resource.id} className="health-resource-card">
              <h3 className="health-resource-card-title">{resource.nome}</h3>
              <p><strong>Tipo:</strong> {resource.tipoRecurso}</p>
              <p><strong>Especialidade:</strong> {resource.especialidade}</p>
              <p><strong>Endereço:</strong> {resource.endereco}</p>
              <p><strong>Telefone:</strong> {resource.telefone}</p>
              <p><strong>Acessibilidade:</strong> {resource.acessibilidadeDetalhes}</p>
              <p className="health-resource-card-website">Website: <a href={resource.website} target="_blank" rel="noopener noreferrer">{resource.website}</a></p>
              <p className="health-resource-card-hours">Horário: {resource.horarioFuncionamento}</p>
              <Link to={`/health-resources/${resource.id}`} className="health-resource-details-button">Ver Detalhes</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthResourceListPage;
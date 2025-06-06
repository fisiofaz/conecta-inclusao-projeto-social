import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './HealthResourceDetailsPage.css'; // Importa os estilos para esta página

function HealthResourceDetailsPage() {
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL (ex: /health-resources/1)
  const navigate = useNavigate(); // Hook para navegação programática (ex: botão de voltar)

  const [resource, setResource] = useState(null); // Estado para armazenar o recurso de saúde
  const [loading, setLoading] = useState(true);   // Estado para controle de carregamento
  const [error, setError] = useState(null);     // Estado para armazenar mensagens de erro

  // useEffect para buscar os detalhes do recurso de saúde quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchHealthResource = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null);   // Limpa erros anteriores

        // Faz a requisição GET para o endpoint de detalhes do recurso de saúde
        const response = await api.get(`/health-resources/${id}`);
        setResource(response.data); // Atualiza o estado com os dados do recurso
      } catch (err) {
        console.error('Erro ao buscar detalhes do recurso de saúde:', err);
        // Se o erro foi 404 (Not Found) do backend
        if (err.response && err.response.status === 404) {
          setError('Recurso de saúde não encontrado.');
        } else {
          setError('Não foi possível carregar os detalhes do recurso de saúde. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchHealthResource(); // Chama a função de busca
  }, [id]); // Dependência: o efeito é re-executado se o 'id' da URL mudar

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="health-resource-details-container">Carregando detalhes do recurso de saúde...</div>;
  }

  if (error) {
    return (
      <div className="health-resource-details-container">
        <p className="health-resource-details-error">{error}</p>
        <button onClick={() => navigate('/health-resources')} className="health-resource-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se o recurso não foi encontrado (mas não houve erro de rede/servidor)
  if (!resource) {
    return (
      <div className="health-resource-details-container">
        <p className="health-resource-details-not-found">Recurso de saúde não encontrado.</p>
        <button onClick={() => navigate('/health-resources')} className="health-resource-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes do recurso de saúde
  return (
    <div className="health-resource-details-container">
      <h2 className="health-resource-details-title">{resource.nome}</h2>
      <p><strong>Tipo de Recurso:</strong> {resource.tipoRecurso}</p>
      <p><strong>Especialidade:</strong> {resource.especialidade || 'Não especificado'}</p> {/* Exibe se existir */}
      <p><strong>Endereço:</strong> {resource.endereco}</p>
      <p><strong>Telefone:</strong> {resource.telefone || 'Não disponível'}</p>
      <p><strong>Website:</strong> {resource.website ? <a href={resource.website} target="_blank" rel="noopener noreferrer">{resource.website}</a> : 'Não disponível'}</p>
      <div className="health-resource-details-accessibility">
        <h3>Detalhes de Acessibilidade:</h3>
        <p>{resource.acessibilidadeDetalhes}</p>
      </div>
      <p><strong>Horário de Funcionamento:</strong> {resource.horarioFuncionamento || 'Não informado'}</p>

      {/* Botão para voltar à lista de recursos de saúde */}
      <button onClick={() => navigate('/health-resources')} className="health-resource-details-back-button">
        Voltar para a lista
      </button>
    </div>
  );
}

export default HealthResourceDetailsPage;
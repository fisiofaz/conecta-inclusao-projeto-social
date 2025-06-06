import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importe useNavigate também
import api from '../../services/api';
import './OpportunityDetailsPage.css'; // Importa os estilos para esta página

function OpportunityDetailsPage() {
  const { id } = useParams(); // Hook para obter o parâmetro 'id' da URL
  const navigate = useNavigate(); // Hook para navegação programática (ex: voltar)

  const [opportunity, setOpportunity] = useState(null); // Estado para armazenar a oportunidade
  const [loading, setLoading] = useState(true);     // Estado para controle de carregamento
  const [error, setError] = useState(null);       // Estado para mensagens de erro

  // useEffect para buscar os detalhes da oportunidade quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null);   // Limpa erros anteriores

        // Faz a requisição GET para o endpoint de detalhes da oportunidade
        const response = await api.get(`/opportunities/${id}`);
        setOpportunity(response.data); // Atualiza o estado com os dados da oportunidade
      } catch (err) {
        console.error('Erro ao buscar detalhes da oportunidade:', err);
        // Verifica se o erro foi 404 (Not Found)
        if (err.response && err.response.status === 404) {
          setError('Oportunidade não encontrada.');
        } else {
          setError('Não foi possível carregar os detalhes da oportunidade. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchOpportunity(); // Chama a função de busca
  }, [id]); // Dependência: o efeito é re-executado se o 'id' da URL mudar

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="opportunity-details-container">Carregando detalhes da oportunidade...</div>;
  }

  if (error) {
    return (
      <div className="opportunity-details-container">
        <p className="opportunity-details-error">{error}</p>
        <button onClick={() => navigate('/opportunities')} className="opportunity-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se a oportunidade não foi encontrada (mas não houve erro de rede/servidor)
  if (!opportunity) {
    return (
      <div className="opportunity-details-container">
        <p className="opportunity-details-not-found">Oportunidade não encontrada.</p>
        <button onClick={() => navigate('/opportunities')} className="opportunity-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes da oportunidade
  return (
    <div className="opportunity-details-container">
      <h2 className="opportunity-details-title">{opportunity.titulo}</h2>
      <p><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
      <p><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
      <p><strong>Localização:</strong> {opportunity.localizacao}</p>
      <p><strong>Publicado em:</strong> {opportunity.dataPublicacao}</p>
      <p><strong>Requisitos de Acessibilidade:</strong> {opportunity.requisitosAcessibilidade}</p>
      <div className="opportunity-details-description">
        <h3>Descrição Detalhada:</h3>
        <p>{opportunity.descricao}</p>
      </div>
      <p><strong>Contato:</strong> {opportunity.contato}</p>

      {/* Botão para voltar à lista de oportunidades */}
      <button onClick={() => navigate('/opportunities')} className="opportunity-details-back-button">
        Voltar para a lista
      </button>
    </div>
  );
}

export default OpportunityDetailsPage;
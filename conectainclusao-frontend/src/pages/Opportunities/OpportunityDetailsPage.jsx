import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,  Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import OpportunityDetailsView from '../../components/OpportunityDetailsView';
import Button from '../../components/Button';

function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTipoPerfil } = useAuth();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os detalhes da oportunidade quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/opportunities/${id}`);
        setOpportunity(response.cdata);
      } catch (err) {
        console.error('Erro ao buscar detalhes da oportunidade:', err);
        if (err.response && err.response.status === 404) {
          setError('Oportunidade não encontrada.');
        } else {
          setError('Não foi possível carregar os detalhes da oportunidade. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id]); // Dependência: o efeito é re-executado se o 'id' da URL mudar

  // Função para lidar com a exclusão (similar ao da lista)
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      try {
        setLoading(true);
        await api.delete(`/opportunities/${id}`);
        alert('Oportunidade excluída com sucesso!');
        navigate('/opportunities'); // Redireciona para a lista após exclusão
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setError('Não foi possível excluir a oportunidade.');
      } finally {
        setLoading(false);
      }
    }
  };

  const userTipoPerfil = getTipoPerfil();
  const canManage = userTipoPerfil === 'ADMIN' || userTipoPerfil === 'EMPRESA';

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando detalhes...</div>;
  }

  if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error}</p>
        <Button onClick={() => navigate('/opportunities')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  // Se a oportunidade não foi encontrada (mas não houve erro de rede/servidor)
  if (!opportunity) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 text-lg text-gray-600">Oportunidade não encontrada.</p>
        <Button onClick={() => navigate('/opportunities')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  // Renderização dos detalhes da oportunidade
  return (
    <OpportunityDetailsView 
      opportunity={opportunity}
      canManage={canManage}
      onDelete={handleDelete}
    />
  );
}

export default OpportunityDetailsPage;
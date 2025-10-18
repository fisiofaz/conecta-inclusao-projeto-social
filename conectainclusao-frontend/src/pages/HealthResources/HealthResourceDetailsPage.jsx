import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import HealthResourceDetailsView from '../../components/HealthResourceDetailsView';
import Button from '../../components/Button';

function HealthResourceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTipoPerfil } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os detalhes do recurso de saúde quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchHealthResource = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/health-resources/${id}`);
        setResource(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes do recurso de saúde:', err);
        if (err.response && err.response.status === 404) {
          setError('Recurso de saúde não encontrado.');
        } else {
          setError('Não foi possível carregar os detalhes do recurso de saúde. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHealthResource();
  }, [id]);

  // Função para lidar com a exclusão
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este recurso de saúde?')) {
      try {
        await api.delete(`/health-resources/${id}`);
        alert('Recurso de saúde excluído com sucesso!');
        navigate('/health-resources');
      } catch (err) {
        console.error('Erro ao excluir recurso de saúde:', err);
        setError('Não foi possível excluir o recurso de saúde.');
      }
    }
  };

  const userTipoPerfil = getTipoPerfil();
  const canManageHealthResources = userTipoPerfil === 'ADMIN' || userTipoPerfil === 'ORGAO_APOIO';

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando detalhes do recurso de saúde...</div>;
  }

  if (error || !resource) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error || 'Recurso de saúde não encontrado.'}</p>
        <Button onClick={() => navigate('/health-resources')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  // Renderização dos detalhes do recurso de saúde
  return (
    <HealthResourceDetailsView
      resource={resource}
      canManage={canManageHealthResources}
      onDelete={handleDelete}
    />
  );
}

export default HealthResourceDetailsPage;
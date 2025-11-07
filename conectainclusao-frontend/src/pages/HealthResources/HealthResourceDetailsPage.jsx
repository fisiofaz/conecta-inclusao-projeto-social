import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import HealthResourceDetailsView from '../../components/HealthResourceDetailsView';
import Button from '../../components/Button';
import { LoaderCircle } from 'lucide-react';

function HealthResourceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const userTipoPerfil = user?.tipoPerfil;
  const canManageHealthResources = userTipoPerfil === 'ROLE_ADMIN' || userTipoPerfil === 'ROLE_ORGAO_APOIO';

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
   return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
        <span className="text-lg text-gray-600">Carregando detalhes...</span>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error || 'Recurso de saúde não encontrado.'}</p>
        <Button onClick={() => navigate('/saude')} variant="primary">
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
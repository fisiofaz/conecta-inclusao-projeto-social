import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import HealthResourceCard from '../../components/HealthResourceCard';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';

function HealthResourceListPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const { getTipoPerfil } = useAuth();
  const userTipoPerfil = getTipoPerfil();
  const canManageHealthResources = userTipoPerfil === 'ADMIN' || userTipoPerfil === 'ORGAO_APOIO';

  useEffect(() => {
    const fetchHealthResources = async () => {
      try {
        setLoading(true);
        const response = await api.get('/health-resources');
        setResources(response.data);
      } catch (err) {
        console.error('Erro ao buscar recursos de saúde:', err);
        setError('Não foi possível carregar os recursos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchHealthResources();
  }, []);
  
  // Função para lidar com a exclusão
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este recurso de saúde?')) {
      try {
        await api.delete(`/health-resources/${id}`);
        setFeedback({ type: 'success', message: 'Recurso de saúde excluído com sucesso!' });
        setResources(resources.filter(res => res.id !== id));
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      } catch (err) {
        console.error('Erro ao excluir recurso de saúde:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir o recurso.' });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando recursos de saúde...</div>;
  }

  if (error) {
    return <div className="container p-4 mx-auto font-bold text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-green-700">
        Recursos de Saúde e Bem-Estar
      </h2>
      {canManageHealthResources && (
        <div className="mb-8 text-center">
          <Link to="/health-resources/new">
              <Button variant="primary">Criar Novo Recurso</Button>
          </Link>
        </div>
      )}
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      {resources.length === 0 ? (
        <p className="text-lg text-center text-gray-600">
          Nenhum recurso de saúde encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 2. A MÁGICA ACONTECE AQUI! */}
          {resources.map((resource) => (
            <HealthResourceCard
              key={resource.id}
              resource={resource}
              canManage={canManageHealthResources}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthResourceListPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import ComplaintDetailsView from '../../components/ComplaintDetailsView';
import Button from '../../components/Button';

function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTipoPerfil } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os detalhes da denúncia quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/complaints/${id}`);
        setComplaint(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes da denúncia:', err);
        // Verifica se o erro foi 404 (Not Found)
        setError(err.response?.status === 404 ? 'Denúncia não encontrada.' : 'Não foi possível carregar os detalhes.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  // Função para lidar com a exclusão
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        await api.delete(`/complaints/${id}`);
        alert('Denúncia excluída com sucesso!'); // Feedback simples
        navigate('/complaints'); // Redireciona para a lista após exclusão
      } catch (err) {
        console.error('Erro ao excluir denúncia:', err);
        setError('Não foi possível excluir a denúncia.');
      }
    }
  };

  const userTipoPerfil = getTipoPerfil();
  const canManageComplaints = userTipoPerfil === 'ADMIN';

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando detalhes da denúncia...</div>;
  }

  if (error || !complaint) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error || 'Denúncia não encontrada.'}</p>
        <Button onClick={() => navigate('/complaints')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }
  
  // Renderização dos detalhes da denúncia
  return (
    <ComplaintDetailsView
      complaint={complaint}
      canManage={canManageComplaints}
      onDelete={handleDelete}
    />
  );
}

export default ComplaintDetailsPage;
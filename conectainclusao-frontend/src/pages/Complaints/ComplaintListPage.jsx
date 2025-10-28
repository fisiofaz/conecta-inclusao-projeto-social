import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ComplaintCard from '../../components/ComplaintCard';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';

function ComplaintListPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, getTipoPerfil } = useAuth();
  const userTipoPerfil = getTipoPerfil();
  const canManageComplaints = user?.tipoPerfil === 'ROLE_ADMIN';

  // useEffect para buscar a lista de denúncias quando o componente for montado
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/complaints');
        setComplaints(response.data);
      } catch (err) {
        console.error('Erro ao buscar denúncias:', err);
        setError('Não foi possível carregar as denúncias. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }'
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        setLoading(true);
        await api.delete(`/complaints/${id}`);
        setFeedback({ type: 'success', message: 'Denúncia excluída com sucesso!' });
        // Atualiza a lista após exclusão
        setComplaints(complaints.filter(comp => comp.id !== id));
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      } catch (err) {
        console.error('Erro ao excluir denúncia:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir a denúncia.' });
      }
    }
  };

  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando denúncias...</div>;
  }

  if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error}</p>
        <Button onClick={() => navigate('/')} variant="primary">Voltar para Home</Button>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-red-700">
        Denúncias e Relatos
      </h2>
      {isAuthenticated() && ( 
        <div className="mb-8 text-center">
          <Link to="/complaints/new">
            <Button variant="danger">Registrar Nova Denúncia</Button>
          </Link>
        </div>
      )}
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      {complaints.length === 0 ? (
        <p className="text-lg text-center text-gray-600">
          Nenhuma denúncia ou relato encontrado. Clique em "Registrar Nova Denúncia" para adicionar uma!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 3. Usando nosso novo componente de card */}
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              canManage={canManageComplaints}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintListPage;
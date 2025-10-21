import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link,  useNavigate} from 'react-router-dom'; // Importe useNavigate
import { useAuth } from '../../contexts/AuthContext';
import OpportunityCard from '../../components/OpportunityCard';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';


function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const { user } = useAuth();
  console.log("Perfil atual (getTipoPerfil):", user?.tipoPerfil);
  const canManageOpportunities = user?.tipoPerfil === 'ROLE_ADMIN' || user?.tipoPerfil === 'ROLE_EMPRESA';

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);
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

  // Função para lidar com a exclusão
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      try {
        await api.delete(`/opportunities/${id}`);
        setFeedback({ type: 'success', message: 'Oportunidade excluída com sucesso!' });
        // Atualiza a lista após exclusão
        setOpportunities(opportunities.filter(opp => opp.id !== id));
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir a oportunidade.' });
      }
    }
  };


  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando oportunidades...</div>;
  }

 if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
          <p className="mb-4 font-bold text-red-600">{error}</p>
          <Button onClick={() => navigate('/dashboard')} variant="primary">Voltar para Home</Button>
      </div>
    );
  }

  return (
      <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
        <h2 className="mb-10 text-4xl font-extrabold text-center text-blue-700">
          Lista de Oportunidades
        </h2>
        {canManageOpportunities && (
        <div className="mb-8 text-center"> {/* Centraliza o botão e adiciona margem inferior */}
          <Link to="/opportunities/new">
            <Button variant="primary">
              Criar Nova Oportunidade
            </Button>
          </Link>
        </div>
        )}
        {/* Mensagem de sucesso */}
        <FeedbackMessage type={feedback.type} message={feedback.message} />

        {opportunities.length === 0 ? (
          <p className="text-lg text-center text-gray-600">Nenhuma oportunidade encontrada. Clique em "Criar Nova Oportunidade" para adicionar uma!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6"> {/* Ajuste: sm:grid-cols-2, sm:gap-4, md:gap-6 */}
            {opportunities.map((opportunity) => (
              <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              canManage={canManageOpportunities}
              onDelete={handleDelete}
            />
            ))}
          </div>
        )}
      </div>
  );
}

export default OpportunityListPage;
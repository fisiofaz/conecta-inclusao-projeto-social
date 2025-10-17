import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'; // Importe useNavigate
import { useAuth } from '../../contexts/AuthContext';
import OpportunityCard from '../../components/OpportunityCard';


function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { getTipoPerfil } = useAuth();
  const userTipoPerfil = getTipoPerfil();
  const canManageOpportunities = userTipoPerfil === 'ADMIN' || userTipoPerfil === 'EMPRESA';

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
        setMessage('Oportunidade excluída com sucesso!');
        // Atualiza a lista após exclusão
        setOpportunities(opportunities.filter(opp => opp.id !== id));
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setError('Não foi possível excluir a oportunidade.');
      }
    }
  };


  if (loading) {
    return <div className="container p-4 mx-auto text-center">Carregando oportunidades...</div>;
  }

  if (error) {
    return <div className="container p-4 mx-auto font-bold text-center text-red-600">{error}</div>;
  }

  return (
      <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
        <h2 className="mb-10 text-4xl font-extrabold text-center text-blue-700">
          Lista de Oportunidades
        </h2>
        {canManageOpportunities && (
        <div className="mb-8 text-center"> {/* Centraliza o botão e adiciona margem inferior */}
          <Link to="/opportunities/new" className="inline-block px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"> {/* inline-block para que o text-center funcione */}
            Criar Nova Oportunidade
          </Link>
        </div>
        )}
        {/* Mensagem de sucesso */}
        {message && <p className="mb-4 text-center text-green-600">{message}</p>}

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
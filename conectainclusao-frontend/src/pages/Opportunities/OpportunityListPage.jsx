import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate

function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Para navegação programática

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
        setLoading(true); // Pode ser bom mostrar um loader aqui
        await api.delete(`/opportunities/${id}`);
        setMessage('Oportunidade excluída com sucesso!');
        // Atualiza a lista após exclusão
        setOpportunities(opportunities.filter(opp => opp.id !== id));
        setTimeout(() => {
          navigate('/'); // Exemplo: volta para a Home
        }, 2000);
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setError('Não foi possível excluir a oportunidade.');
      } finally {
        setLoading(false);
      }
    }
  };


  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando oportunidades...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <div className="flex justify-between items-center mb-10"> {/* Flex container para título e botão */}
        <h2 className="text-4xl font-extrabold text-blue-700">Oportunidades Disponíveis</h2>
        <Link to="/opportunities/new" className="bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
          Criar Nova Oportunidade
        </Link>
      </div>
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {opportunities.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Nenhuma oportunidade encontrada. Clique em "Criar Nova Oportunidade" para adicionar uma!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">{opportunity.titulo}</h3>
              <p className="text-sm text-gray-700 mb-2"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Local:</strong> {opportunity.localizacao}</p>
              <p className="text-xs text-gray-500 mb-4 flex-grow">{opportunity.requisitosAcessibilidade}</p>
              <div className="flex justify-between items-center mt-4 space-x-2">
                <Link
                  to={`/opportunities/${opportunity.id}`}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600 transition-colors duration-300 flex-1"
                >
                  Ver Detalhes
                </Link>
                <Link
                  to={`/opportunities/edit/${opportunity.id}`}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md text-center hover:bg-yellow-600 transition-colors duration-300 flex-1"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(opportunity.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-red-600 transition-colors duration-300 flex-1"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OpportunityListPage;
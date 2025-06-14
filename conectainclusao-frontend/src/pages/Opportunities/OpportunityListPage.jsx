import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { useAuth } from '../../contexts/AuthContext';

function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Para navegação programática
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
    return <div className="container p-4 mx-auto text-center">Carregando oportunidades...</div>;
  }

  if (error) {
    return <div className="container p-4 mx-auto font-bold text-center text-red-600">{error}</div>;
  }

  return (
      <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
          Lista de Oportunidades
        </h2>
        {canManageOpportunities && (
        <div className="text-center mb-8"> {/* Centraliza o botão e adiciona margem inferior */}
          <Link to="/opportunities/new" className="bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300 inline-block"> {/* inline-block para que o text-center funcione */}
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
              <div key={opportunity.id} className="flex flex-col justify-between p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"> {/* p-6 padrão é bom */}
                <h3 className="mb-3 text-xl font-semibold text-blue-600 sm:text-lg"> {/* Ajuste: sm:text-lg */}
                  {opportunity.titulo}
                </h3>
                <p className="mb-2 text-sm text-gray-700"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
                <p className="mb-2 text-sm text-gray-700"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
                <p className="mb-4 text-sm text-gray-700"><strong>Local:</strong> {opportunity.localizacao}</p>
                <p className="flex-grow mb-4 text-xs text-gray-500"> {/* Ajuste: mb-4 */}
                  {opportunity.requisitosAcessibilidade}
                </p>
                <div className="flex flex-col items-center justify-between mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Link
                    to={`/opportunities/${opportunity.id}`}
                    className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600 sm:w-auto"
                  >
                    Ver Detalhes
                  </Link>
                  {canManageOpportunities && (
                    <>
                      <Link
                        to={`/opportunities/edit/${opportunity.id}`}
                        className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600 sm:w-auto"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(opportunity.id)}
                        className={'w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600 sm:w-auto'}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}

export default OpportunityListPage;
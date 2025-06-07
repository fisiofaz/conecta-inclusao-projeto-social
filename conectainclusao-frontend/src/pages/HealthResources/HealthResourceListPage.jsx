import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import { Link, useNavigate } from 'react-router-dom'; 

function HealthResourceListPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthResources = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/health-resources');
        setResources(response.data);
      } catch (err) {
        console.error('Erro ao buscar recursos de saúde:', err);
        setError('Não foi possível carregar os recursos de saúde. Tente novamente mais tarde.');
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
        setLoading(true);
        await api.delete(`/health-resources/${id}`);
        setMessage('Recurso de saúde excluído com sucesso!');
        setResources(resources.filter(res => res.id !== id));
        setTimeout(() => {
          navigate('/health-resources');
        }, 2000);
      } catch (err) {
        console.error('Erro ao excluir recurso de saúde:', err);
        setError('Não foi possível excluir o recurso de saúde.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando recursos de saúde...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-green-700">Recursos de Saúde e Bem-Estar</h2>
        <Link to="/health-resources/new" className="bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
          Criar Novo Recurso
        </Link>
      </div>
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {resources.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Nenhum recurso de saúde encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-green-600 mb-3">{resource.nome}</h3>
              <p className="text-sm text-gray-700 mb-2"><strong>Tipo:</strong> {resource.tipoRecurso}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Especialidade:</strong> {resource.especialidade || 'Não especificado'}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Endereço:</strong> {resource.endereco}</p>
              <p className="text-xs text-gray-500 mb-2">Tel: {resource.telefone || 'N/A'}</p>
              <p className="text-xs text-gray-500 mb-4 flex-grow">Acessibilidade: {resource.acessibilidadeDetalhes}</p>
              <div className="flex justify-between items-center mt-4 space-x-2">
                <Link
                  to={`/health-resources/${resource.id}`}
                  className="bg-green-500 text-white py-2 px-4 rounded-md text-center hover:bg-green-600 transition-colors duration-300 flex-1"
                >
                  Ver Detalhes
                </Link>
                <Link
                  to={`/health-resources/edit/${resource.id}`}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md text-center hover:bg-yellow-600 transition-colors duration-300 flex-1"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(resource.id)}
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

export default HealthResourceListPage;
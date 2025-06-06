import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function HealthResourceDetailsPage() {
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL (ex: /health-resources/1)
  const navigate = useNavigate(); // Hook para navegação programática (ex: botão de voltar)

  const [resource, setResource] = useState(null); // Estado para armazenar o recurso de saúde
  const [loading, setLoading] = useState(true);   // Estado para controle de carregamento
  const [error, setError] = useState(null);     // Estado para armazenar mensagens de erro

  // useEffect para buscar os detalhes do recurso de saúde quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchHealthResource = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null);   // Limpa erros anteriores

        // Faz a requisição GET para o endpoint de detalhes do recurso de saúde
        const response = await api.get(`/health-resources/${id}`);
        setResource(response.data); // Atualiza o estado com os dados do recurso
      } catch (err) {
        console.error('Erro ao buscar detalhes do recurso de saúde:', err);
        // Se o erro foi 404 (Not Found) do backend
        if (err.response && err.response.status === 404) {
          setError('Recurso de saúde não encontrado.');
        } else {
          setError('Não foi possível carregar os detalhes do recurso de saúde. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchHealthResource(); // Chama a função de busca
  }, [id]); // Dependência: o efeito é re-executado se o 'id' da URL mudar

  // Renderização condicional baseada nos estados de carregamento e erro
 if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando detalhes do recurso de saúde...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button onClick={() => navigate('/health-resources')} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se o recurso não foi encontrado (mas não houve erro de rede/servidor)  
  if (!resource) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-600 text-lg mb-4">Recurso de saúde não encontrado.</p>
        <button onClick={() => navigate('/health-resources')} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes do recurso de saúde
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg my-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">{resource.nome}</h2>
      <p className="mb-2 text-gray-700"><strong>Tipo de Recurso:</strong> {resource.tipoRecurso}</p>
      <p className="mb-2 text-gray-700"><strong>Especialidade:</strong> {resource.especialidade || 'Não especificado'}</p>
      <p className="mb-2 text-gray-700"><strong>Endereço:</strong> {resource.endereco}</p>
      <p className="mb-2 text-gray-700"><strong>Telefone:</strong> {resource.telefone || 'Não disponível'}</p>
      <p className="mb-4 text-gray-700"><strong>Website:</strong> {resource.website ? <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resource.website}</a> : 'Não disponível'}</p>
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Detalhes de Acessibilidade:</h3>
        <p className="text-gray-700">{resource.acessibilidadeDetalhes}</p>
      </div>
      <p className="text-gray-700"><strong>Horário de Funcionamento:</strong> {resource.horarioFuncionamento || 'Não informado'}</p>

      <button onClick={() => navigate('/health-resources')} className="mt-8 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
        Voltar para a lista
      </button>
    </div>
  );
}

export default HealthResourceDetailsPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importe useNavigate também
import api from '../../services/api';

function OpportunityDetailsPage() {
  const { id } = useParams(); // Hook para obter o parâmetro 'id' da URL
  const navigate = useNavigate(); // Hook para navegação programática (ex: voltar)

  const [opportunity, setOpportunity] = useState(null); // Estado para armazenar a oportunidade
  const [loading, setLoading] = useState(true);     // Estado para controle de carregamento
  const [error, setError] = useState(null);       // Estado para mensagens de erro

  // useEffect para buscar os detalhes da oportunidade quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        setError(null);   // Limpa erros anteriores

        // Faz a requisição GET para o endpoint de detalhes da oportunidade
        const response = await api.get(`/opportunities/${id}`);
        setOpportunity(response.data); // Atualiza o estado com os dados da oportunidade
      } catch (err) {
        console.error('Erro ao buscar detalhes da oportunidade:', err);
        // Verifica se o erro foi 404 (Not Found)
        if (err.response && err.response.status === 404) {
          setError('Oportunidade não encontrada.');
        } else {
          setError('Não foi possível carregar os detalhes da oportunidade. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchOpportunity(); // Chama a função de busca
  }, [id]); // Dependência: o efeito é re-executado se o 'id' da URL mudar

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando detalhes...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button onClick={() => navigate('/opportunities')} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se a oportunidade não foi encontrada (mas não houve erro de rede/servidor)
  if (!opportunity) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-600 text-lg mb-4">Oportunidade não encontrada.</p>
        <button onClick={() => navigate('/opportunities')} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes da oportunidade
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg my-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">{opportunity.titulo}</h2>
      <p className="mb-2 text-gray-700"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
      <p className="mb-2 text-gray-700"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
      <p className="mb-2 text-gray-700"><strong>Localização:</strong> {opportunity.localizacao}</p>
      <p className="mb-2 text-gray-700"><strong>Publicado em:</strong> {opportunity.dataPublicacao}</p>
      <p className="mb-4 text-gray-700"><strong>Requisitos de Acessibilidade:</strong> {opportunity.requisitosAcessibilidade}</p>
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Descrição Detalhada:</h3>
        <p className="text-gray-700">{opportunity.descricao}</p>
      </div>
      <p className="text-gray-700"><strong>Contato:</strong> {opportunity.contato}</p>

      <button onClick={() => navigate('/opportunities')} className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
        Voltar para a lista
      </button>
    </div>
  );
}

export default OpportunityDetailsPage;
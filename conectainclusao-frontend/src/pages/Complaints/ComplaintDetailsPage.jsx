import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function ComplaintDetailsPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);     

  // useEffect para buscar os detalhes da denúncia quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        setLoading(true); 
        setError(null);  

        // Faz a requisição GET para o endpoint de detalhes da denúncia
        const response = await api.get(`/complaints/${id}`);
        setComplaint(response.data); 
      } catch (err) {
        console.error('Erro ao buscar detalhes da denúncia:', err);
        // Verifica se o erro foi 404 (Not Found)
        if (err.response && err.response.status === 404) {
          setError('Denúncia não encontrada.');
        } else {
          setError('Não foi possível carregar os detalhes da denúncia. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchComplaint(); 
  }, [id]); 
  
  const getStatusClasses = (status) => {
    switch (status ? status.toLowerCase() : '') {
      case 'aberto':
        return 'bg-yellow-200 text-yellow-800';
      case 'em_analise':
        return 'bg-blue-200 text-blue-800';
      case 'resolvido':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando detalhes da denúncia...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button onClick={() => navigate('/complaints')} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se a denúncia não foi encontrada (mas não houve erro de rede/servidor)
  if (!complaint) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-600 text-lg mb-4">Denúncia não encontrada.</p>
        <button onClick={() => navigate('/complaints')} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes da denúncia
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg my-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-red-700 text-center mb-6">{complaint.titulo}</h2>
      <p className="mb-2 text-gray-700"><strong>Tipo de Problema:</strong> {complaint.tipoProblema}</p>
      <p className="mb-2 text-gray-700"><strong>Localização da Ocorrência:</strong> {complaint.localizacaoOcorrencia}</p>
      <p className="mb-2 text-gray-700"><strong>Data da Ocorrência:</strong> {complaint.dataOcorrencia}</p>
      <p className="mb-2 text-gray-700">
        <strong>Status:</strong> <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(complaint.status)}`}>{complaint.status}</span>
      </p>
      <p className="mb-4 text-gray-700"><strong>Registrado por:</strong> {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}</p>
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Descrição Detalhada:</h3>
        <p className="text-gray-700">{complaint.descricao}</p>
      </div>

      <button onClick={() => navigate('/complaints')} className="mt-8 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
        Voltar para a lista
      </button>
    </div>
  );
}

export default ComplaintDetailsPage;
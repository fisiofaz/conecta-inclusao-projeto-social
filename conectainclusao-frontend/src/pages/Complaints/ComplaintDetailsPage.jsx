import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './ComplaintDetailsPage.css'; 

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

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return <div className="complaint-details-container">Carregando detalhes da denúncia...</div>;
  }

  if (error) {
    return (
      <div className="complaint-details-container">
        <p className="complaint-details-error">{error}</p>
        <button onClick={() => navigate('/complaints')} className="complaint-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Se a denúncia não foi encontrada (mas não houve erro de rede/servidor)
  if (!complaint) {
    return (
      <div className="complaint-details-container">
        <p className="complaint-details-not-found">Denúncia não encontrada.</p>
        <button onClick={() => navigate('/complaints')} className="complaint-details-back-button">
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderização dos detalhes da denúncia
  return (
    <div className="complaint-details-container">
      <h2 className="complaint-details-title">{complaint.titulo}</h2>
      <p><strong>Tipo de Problema:</strong> {complaint.tipoProblema}</p>
      <p><strong>Localização da Ocorrência:</strong> {complaint.localizacaoOcorrencia}</p>
      <p><strong>Data da Ocorrência:</strong> {complaint.dataOcorrencia}</p>
      <p><strong>Status:</strong> <span className={`status-${complaint.status ? complaint.status.toLowerCase() : 'desconhecido'}`}>{complaint.status}</span></p>
      <p><strong>Registrado por:</strong> {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}</p>
      <div className="complaint-details-description">
        <h3>Descrição Detalhada:</h3>
        <p>{complaint.descricao}</p>
      </div>

      {/* Botão para voltar à lista de denúncias */}
      <button onClick={() => navigate('/complaints')} className="complaint-details-back-button">
        Voltar para a lista
      </button>
    </div>
  );
}

export default ComplaintDetailsPage;
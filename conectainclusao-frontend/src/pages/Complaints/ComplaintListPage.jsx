import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import './ComplaintListPage.css'; 
import { Link } from 'react-router-dom';

function ComplaintListPage() {
  const [complaints, setComplaints] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);     

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
      }
    };

    fetchComplaints(); 
  }, []); 

  if (loading) {
    return <div className="complaint-list-container">Carregando denúncias...</div>;
  }

  if (error) {
    return <div className="complaint-list-container"><p className="complaint-error-message">{error}</p></div>;
  }

  return (
    <div className="complaint-list-container">
      <h2 className="complaint-list-title">Denúncias e Relatos</h2>
      {complaints.length === 0 ? (
        <p className="complaint-no-found-message">Nenhuma denúncia ou relato encontrado. Seja o primeiro a registrar!</p>
      ) : (
        <div className="complaint-list-grid">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3 className="complaint-card-title">{complaint.titulo}</h3>
              <p><strong>Tipo de Problema:</strong> {complaint.tipoProblema}</p>
              <p><strong>Localização:</strong> {complaint.localizacaoOcorrencia}</p>
              <p><strong>Status:</strong> <span className={`status-${complaint.status.toLowerCase()}`}>{complaint.status}</span></p> {/* Estilo condicional para status */}
              <p className="complaint-card-description">{complaint.descricao}</p>
              <p className="complaint-card-date">Ocorrido em: {complaint.dataOcorrencia}</p>
              <p className="complaint-card-user">Registrado por: {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}</p> {/* Exibe o ID do usuário */}
              <Link to={`/complaints/${complaint.id}`} className="complaint-details-button">Ver Detalhes</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintListPage;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
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

  const getStatusClasses = (status) => {
    switch (status ? status.toLowerCase() : '') {
      case 'aberto':
        return 'bg-yellow-200 text-yellow-800'; // Tailwind yellow shades
      case 'em_analise':
        return 'bg-blue-200 text-blue-800'; // Tailwind blue shades
      case 'resolvido':
        return 'bg-green-200 text-green-800'; // Tailwind green shades
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

 if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando denúncias...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <h2 className="text-4xl font-extrabold text-red-700 text-center mb-10">Denúncias e Relatos</h2>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Nenhuma denúncia ou relato encontrado. Seja o primeiro a registrar!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-red-600 mb-3">{complaint.titulo}</h3>
              <p className="text-sm text-gray-700 mb-2"><strong>Tipo de Problema:</strong> {complaint.tipoProblema}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Localização:</strong> {complaint.localizacaoOcorrencia}</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Status:</strong> <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(complaint.status)}`}>{complaint.status}</span>
              </p>
              <p className="text-xs text-gray-500 mb-4 flex-grow">{complaint.descricao}</p>
              <p className="text-xs text-gray-500 mb-2">Ocorrido em: {complaint.dataOcorrencia}</p>
              <p className="text-xs text-gray-500 mb-4">Registrado por: {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}</p>
              <Link
                to={`/complaints/${complaint.id}`}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-red-600 transition-colors duration-300 self-start"
              >
                Ver Detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintListPage;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function ComplaintListPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, getTipoPerfil } = useAuth();
  const userTipoPerfil = getTipoPerfil();
  const canManageComplaints = userTipoPerfil === 'ADMIN';

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        setLoading(true);
        await api.delete(`/complaints/${id}`);
        setMessage('Denúncia excluída com sucesso!');
        // Atualiza a lista após exclusão
        setComplaints(complaints.filter(comp => comp.id !== id));
        setTimeout(() => {
          navigate('/opportunities');
        }, 1500);
      } catch (err) {
        console.error('Erro ao excluir denúncia:', err);
        setError('Não foi possível excluir a denúncia.');
      } finally {
        setLoading(false);
      }
    }
  };

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

if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando denúncias...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <h2 className="text-4xl font-extrabold text-red-700 text-center mb-10">
        Denúncias e Relatos
      </h2>
      {isAuthenticated() && ( 
        <div className="text-center mb-8">
          <Link to="/complaints/new" className="bg-red-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-300 inline-block">
            Registrar Nova Denúncia
          </Link>
        </div>
      )}
      {message && <p className="text-green-600 text-center mb-4">{message}</p>} 
      {complaints.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Nenhuma denúncia ou relato encontrado. Clique em "Registrar Nova Denúncia" para adicionar uma!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-lg font-semibold text-red-600 mb-3">
                {complaint.titulo}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Tipo de Problema:</strong> {complaint.tipoProblema}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Localização:</strong> {complaint.localizacaoOcorrencia}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Status:</strong> <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(complaint.status)}`}>{complaint.status}</span>
              </p>
              <p className="text-xs text-gray-500 mb-4 flex-grow">
                {complaint.descricao}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Ocorrido em: {complaint.dataOcorrencia}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Registrado por: {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <Link
                  to={`/complaints/${complaint.id}`}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-red-600 transition-colors duration-300 w-full sm:w-auto text-sm"
                >
                  Ver Detalhes
                </Link>
                {canManageComplaints && (
                  <>
                    <Link
                      to={`/complaints/edit/${complaint.id}`}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md text-center hover:bg-yellow-600 transition-colors duration-300 w-full sm:w-auto text-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-md text-center hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto text-sm"
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

export default ComplaintListPage;
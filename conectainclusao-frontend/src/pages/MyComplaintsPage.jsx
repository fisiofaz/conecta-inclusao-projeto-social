import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Seu serviço de API
import ComplaintCard from '../components/ComplaintCard'; // O card que já existe
import { LoaderCircle, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Para verificar se o usuário é Admin

function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Pega o usuário logado

  // O usuário logado é um Admin?
  const isAdmin = user?.tipoPerfil === 'ROLE_ADMIN';

  // Função para carregar as denúncias
  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      // Define qual endpoint chamar baseado no perfil do usuário
      const endpoint = isAdmin ? '/complaints' : '/complaints/my-complaints';
      const response = await api.get(endpoint);
      setComplaints(response.data);
    } catch (err) {
      console.error("Erro ao buscar denúncias:", err);
      setError("Não foi possível carregar as denúncias.");
    } finally {
      setLoading(false);
    }
  };

  // Carrega as denúncias quando a página é montada
  useEffect(() => {
    fetchComplaints();
  }, [isAdmin]); // Recarrega se o status de admin mudar

  // Função para deletar (passada para o card, só funciona para admin)
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta denúncia?')) {
      try {
        await api.delete(`/complaints/${id}`);
        // Recarrega a lista após a exclusão
        fetchComplaints();
      } catch (err) {
        console.error('Erro ao excluir denúncia:', err);
        setError('Não foi possível excluir a denúncia.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        {isAdmin ? 'Gerenciar Denúncias' : 'Minhas Denúncias'}
      </h1>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
          <span className="text-lg text-gray-600">Carregando denúncias...</span>
        </div>
      )}

      {error && (
        <div className="py-10 text-center text-red-600">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && complaints.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          <ShieldAlert size={48} className="mx-auto mb-4" />
          <p className="text-xl">
            {isAdmin ? 'Nenhuma denúncia registrada no sistema.' : 'Você ainda não registrou nenhuma denúncia.'}
          </p>
        </div>
      )}

      {!loading && !error && complaints.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {complaints.map(complaint => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              // Passa 'canManage' (true/false) e 'onDelete' para o card
              canManage={isAdmin}
              onDelete={() => handleDelete(complaint.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyComplaintsPage;
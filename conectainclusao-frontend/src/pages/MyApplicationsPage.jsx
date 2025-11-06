import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import ApplicationCard from '../components/ApplicationCard'; // O card que acabamos de criar
import { LoaderCircle, FileText, AlertTriangle } from 'lucide-react';

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Chama a API nova (e segura) que criamos no backend
        const response = await api.get('/candidaturas/my-applications');
        setApplications(response.data);
      } catch (err) {
        console.error("Erro ao buscar candidaturas:", err);
        setError("Não foi possível carregar suas candidaturas.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyApplications();
  }, []); // Roda só uma vez

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Minhas Candidaturas
      </h1>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
          <span className="text-lg text-gray-600">Carregando candidaturas...</span>
        </div>
      )}

      {error && (
        <div className="py-10 text-center text-red-600">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4" />
          <p className="text-xl">Você ainda não se candidatou a nenhuma vaga.</p>
          <p>Explore as oportunidades e clique em "Candidatar-se".</p>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map(app => (
            <ApplicationCard
              key={app.id}
              application={app}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplicationsPage;
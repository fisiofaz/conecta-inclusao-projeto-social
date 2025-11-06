import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import api from '../services/api'; 
import ApplicantCard from '../components/ApplicantCard';
import { LoaderCircle, Users, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';

function ApplicantsListPage() {
  const { id: opportunityId } = useParams();
  const [applications, setApplications] = useState([]);
  const [opportunityTitle, setOpportunityTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Só roda se tiver um ID de vaga
    if (!opportunityId) return;

    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Chama a API de candidatos que criamos no backend
        const response = await api.get(`/candidaturas/opportunity/${opportunityId}`);
        setApplications(response.data);

        // 2. Pega o título da vaga (para o título da página)
        // (Assumindo que a lista de candidaturas não esteja vazia)
        if (response.data.length > 0) {
          setOpportunityTitle(response.data[0].opportunityTitle);
        } else {
          // Se estiver vazia, precisamos buscar o título da vaga separadamente
          try {
            const oppResponse = await api.get(`/opportunities/${opportunityId}`);
            setOpportunityTitle(oppResponse.data.titulo);
          } catch (_oppError) { // O underscore avisa ao linter que é intencional
             console.error("Erro ao buscar título da vaga (vaga pode não existir):", _oppError);
             setOpportunityTitle("Vaga não encontrada");
          }
        }

      } catch (err) {
        console.error("Erro ao buscar candidaturas:", err);
        if (err.response && err.response.status === 403) {
           setError("Você não tem permissão para ver os candidatos desta vaga.");
        } else {
           setError("Não foi possível carregar as candidaturas.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [opportunityId]); // Roda sempre que o ID da vaga na URL mudar

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-[calc(100vh-200px)]">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Candidatos para a Vaga:
      </h1>
      <h2 className="mb-6 text-xl font-semibold text-blue-600">
        {opportunityTitle || "Carregando..."}
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
          <span className="text-lg text-gray-600">Carregando candidatos...</span>
        </div>
      )}

      {error && (
        <div className="py-10 text-center text-red-600">
          <AlertTriangle size={48} className="mx-auto mb-4" />
          <p>{error}</p>
          <Button onClick={() => window.history.back()} variant="secondary" className="mt-4">
            Voltar
          </Button>
        </div>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          <Users size={48} className="mx-auto mb-4" />
          <p className="text-xl">Esta vaga ainda não recebeu nenhuma candidatura.</p>
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map(app => (
            <ApplicantCard
              key={app.id}
              application={app}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicantsListPage;
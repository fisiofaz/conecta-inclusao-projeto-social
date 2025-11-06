import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,  Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import OpportunityDetailsView from '../../components/OpportunityDetailsView';
import Button from '../../components/Button';
import { LoaderCircle } from 'lucide-react';

function OpportunityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LÓGICA DE CANDIDATURA ---
  const [isApplied, setIsApplied] = useState(false); // O usuário já se candidatou?
  const [isApplying, setIsApplying] = useState(false); // Está carregando (clicou no botão)
  const [applyError, setApplyError] = useState(null); // Erro no botão

  // O usuário é um PCD? (Somente PCDs podem se candidatar)
  const isPCD = user?.tipoPerfil === 'ROLE_USER';

  // useEffect para buscar os detalhes da oportunidade quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/opportunities/${id}`);
        setOpportunity(response.data);
      } catch (err) {
        console.error('Erro ao buscar detalhes da oportunidade:', err);
        if (err.response && err.response.status === 404) {
          setError('Oportunidade não encontrada.');
        } else {
          setError('Não foi possível carregar os detalhes da oportunidade. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    // Função para checar se o usuário já se candidatou a esta vaga
    const checkApplicationStatus = async () => {
      if (!isPCD) return; // Só checa se for PCD

      try {
        const response = await api.get('/candidaturas/my-applications');
        // 'response.data' é a lista de todas as candidaturas do usuário
        // Verificamos se alguma delas tem o ID da vaga atual
        const alreadyApplied = response.data.some(
          (app) => app.opportunityId === parseInt(id)
        );
        setIsApplied(alreadyApplied);
      } catch (err) {
        console.error("Erro ao checar status da candidatura:", err);
        // Não define um erro principal, apenas falha em checar
      }
    };
    
    fetchOpportunity();
    checkApplicationStatus();
  }, [id, isPCD]); // Depende do ID e do status de PCD

  // Função para lidar com a exclusão (similar ao da lista)
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      try {
        setLoading(true);
        await api.delete(`/opportunities/${id}`);
        alert('Oportunidade excluída com sucesso!');
        navigate('/opportunities'); // Redireciona para a lista após exclusão
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setError('Não foi possível excluir a oportunidade.');
      } finally {
        setLoading(false);
      }
    }
  };

  // --- FUNÇÃO "CANDIDATAR-SE" ---
  const handleApply = async () => {
    if (!isPCD) return; // Segurança extra

    setIsApplying(true);
    setApplyError(null);
    try {
      // Chama a nova API que criamos no backend
      await api.post(`/candidaturas/apply/${id}`);
      
      // Sucesso!
      setIsApplied(true); // Marca como "aplicado"
      alert("Candidatura enviada com sucesso!");

    } catch (err) {
      console.error("Erro ao enviar candidatura:", err);
      if (err.response && err.response.status === 409) {
        // 409 (Conflict) é o erro que o backend retorna se "já se candidatou"
        setApplyError("Você já se candidatou a esta vaga.");
        setIsApplied(true); // Sincroniza o estado
      } else {
        setApplyError("Não foi possível enviar sua candidatura. Tente novamente.");
      }
    } finally {
      setIsApplying(false);
    }
  };

  const canManage = user?.tipoPerfil === 'ROLE_ADMIN' || user?.tipoPerfil === 'ROLE_EMPRESA';

  // Renderização condicional baseada nos estados de carregamento e erro
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
        <span className="text-lg text-gray-600">Carregando detalhes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 font-bold text-red-600">{error}</p>
        <Button onClick={() => navigate('/opportunities')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  // Se a oportunidade não foi encontrada (mas não houve erro de rede/servidor)
  if (!opportunity) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="mb-4 text-lg text-gray-600">Oportunidade não encontrada.</p>
        <Button onClick={() => navigate('/opportunities')} variant="primary">
          Voltar para a lista
        </Button>
      </div>
    );
  }

  // Renderização dos detalhes da oportunidade
  return (
    <OpportunityDetailsView 
      opportunity={opportunity}
      canManage={canManage}
      onDelete={handleDelete}
      
      // --- (NOVAS PROPS PARA O BOTÃO) ---
      isPCD={isPCD}
      isApplying={isApplying}
      isApplied={isApplied}
      applyError={applyError}
      onApply={handleApply}
    />
  );
}

export default OpportunityDetailsPage;
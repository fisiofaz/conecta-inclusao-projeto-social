import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OpportunityCard from '../../components/OpportunityCard';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormSelect from '../../components/FormSelect';
import FormInput from '../../components/FormInput';
import { X, LoaderCircle } from 'lucide-react'; // Ícones para filtros

// Lista de opções para o filtro, baseada no seu Enum do backend
const opportunityTypes = [
  { value: "", label: "Todos os Tipos" }, // Opção para limpar o filtro
  { value: "EMPREGO", label: "Emprego" },
  { value: "VOLUNTARIADO", label: "Voluntariado" },
  { value: "EVENTO", label: "Evento" },
  { value: "SAUDE_BEM_ESTAR", label: "Saúde e Bem-Estar" },
  { value: "ESTAGIO", label: "Estágio" },
  { value: "CURSO_APRIMORAMENTO", label: "Curso de Aprimoramento" },
  { value: "CURSO_PROFISSIONALIZANTE", label: "Curso Profissionalizante" },
  { value: "PALESTRA", label: "Palestra" }
];

function OpportunityListPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const { user } = useAuth();
  
  // --- MODIFICAÇÃO 2: Estado para os filtros ---
  const [filters, setFilters] = useState({
    tipo: '',
    localizacao: ''
  });

  const canManageOpportunities = user?.tipoPerfil === 'ROLE_ADMIN' || user?.tipoPerfil === 'ROLE_EMPRESA';

    // --- MODIFICAÇÃO 3: useEffect atualizado para FILTRAR ---
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        setError(null);

        //Cria os parâmetros da URL a partir do estado 'filters'
        const params = new URLSearchParams();
        if (filters.tipo) {
          params.append('tipo', filters.tipo);
        }
        if (filters.localizacao) {
          params.append('localizacao', filters.localizacao);
        }
        const queryString = params.toString();
        
        //Envia a requisição com os filtros
        const response = await api.get(`/opportunities?${queryString}`);
        setOpportunities(response.data);
      } catch (err) {
        console.error('Erro ao buscar oportunidades:', err);
        setError('Não foi possível carregar as oportunidades. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
    // O useEffect agora DEPENDE do estado 'filters'
    // Ele vai rodar de novo automaticamente sempre que 'filters' mudar
  }, [filters]); 

  //--- Funções para controlar os filtros ---
  
  // Atualiza o estado dos filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Limpa todos os filtros
  const clearFilters = () => {
    setFilters({ tipo: '', localizacao: '' });
  };


  // Função para lidar com a exclusão (sem mudança)
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      try {
        await api.delete(`/opportunities/${id}`);
        setFeedback({ type: 'success', message: 'Oportunidade excluída com sucesso!' });
        // Atualiza a lista após exclusão
        setOpportunities(opportunities.filter(opp => opp.id !== id));
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      } catch (err) {
        console.error('Erro ao excluir oportunidade:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir a oportunidade.' });
      }
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
        <span className="text-lg text-gray-600">Carregando oportunidades...</span>
      </div>
    );
  }

  if (error) {
   return (
      <div className="container p-4 mx-auto text-center">
          <p className="mb-4 font-bold text-red-600">{error}</p>
          <Button onClick={() => navigate('/dashboard')} variant="primary">Voltar para Home</Button>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
      <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
        <h2 className="text-4xl font-extrabold text-blue-700">
          Oportunidades
        </h2>
        {canManageOpportunities && (
          <div className="mt-4 md:mt-0">
            <Link to="/opportunities/new">
              <Button variant="primary">
                Criar Nova Oportunidade
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* --- Barra de Filtros --- */}
      <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Filtro por Tipo */}
          <FormSelect
            label="Filtrar por Tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
            options={opportunityTypes}
          />
          {/* Filtro por Localização */}
          <FormInput
            label="Filtrar por Localização"
            name="localizacao"
            value={filters.localizacao}
            onChange={handleFilterChange}
            placeholder="Ex: São Paulo, Remoto"
          />
          {/* Botão de Limpar */}
          <div className="flex flex-col justify-end h-full" >
            <Button
              variant="secondary"
              onClick={clearFilters}
              className="w-full h-10" // Ajusta altura
            >
              <X size={16} className="mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>
      {/* --- Fim da Modificação 5 --- */}

      <FeedbackMessage type={feedback.type} message={feedback.message} />

      {opportunities.length === 0 ? (
        // Mensagem de "Nenhum resultado" (seja por filtro ou por estar vazio)
        <p className="py-10 text-lg text-center text-gray-600">
          Nenhuma oportunidade encontrada com os filtros atuais.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              canManage={canManageOpportunities}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OpportunityListPage;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormSelect from '../../components/FormSelect';

function OpportunityForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial do formulário, com valores vazios
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoOportunidade: 'emprego',
    empresaOuOrgResponsavel: '',
    localizacao: '',
    requisitosAcessibilidade: '',
    dataPublicacao: '',
    contato: '',
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // UseEffect para carregar os dados da oportunidade se estiver em modo de edição (se tiver um ID na URL)
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchOpportunity = async () => {
        try {
          const response = await api.get(`/opportunities/${id}`);
          // Preenche o formulário com os dados da oportunidade existente
          setFormData({
            ...response.data,
            // dataPublicacao vindo do backend pode precisar de formatação para input type="date"
            dataPublicacao: response.data.dataPublicacao ? response.data.dataPublicacao : '',
          });
        } catch (err) {
          console.error('Erro ao carregar oportunidade para edição:', err);
          setFeedback({ type: 'error', message: 'Não foi possível carregar a oportunidade para edição.' });
        } finally {
          setLoading(false);
        }
      };
      fetchOpportunity();
    }
  }, [id]); // Depende do ID da URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);

    try {
      let response;
      if (id) { // Se tem ID, é uma edição (PUT)
        response = await api.put(`/opportunities/${id}`, formData);
        setFeedback({ type: 'success', message: 'Oportunidade atualizada com sucesso!' });
      } else { // Se não tem ID, é uma criação (POST)
        const dataToSubmit = { ...formData, dataPublicacao: new Date().toISOString().split('T')[0] };
        response = await api.post('/opportunities', dataToSubmit);
        setFeedback({ type: 'success', message: 'Oportunidade criada com sucesso!' });
      }

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          navigate('/opportunities'); // Redireciona para a lista após sucesso
        }, 2000);
      }
    } catch (err) {
      console.error('Erro ao salvar oportunidade:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao salvar a oportunidade. Verifique os dados e tente novamente.';
      if (err.response) {
        if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (Array.isArray(err.response.data.errors)) {
            const validationErrors = err.response.data.errors.map(e => e.defaultMessage || e.message).join('; ');
            errorMessage = 'Erros de validação: ' + validationErrors;
          }
        } else if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
        }
      }
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) { // Carregando dados para edição
    return <div className="container p-4 mx-auto text-center">Carregando dados da oportunidade para edição...</div>;
  }

  const opportunityTypes = [
    { value: 'emprego', label: 'Emprego' },
    { value: 'voluntariado', label: 'Voluntariado' },
    { value: 'evento', label: 'Evento' },
    { value: 'saude_bem_estar', label: 'Saúde e Bem-Estar' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          {id ? 'Editar Oportunidade' : 'Criar Nova Oportunidade'}
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-full">
            <FormInput name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Oportunidade" required />
          </div>

          <FormTextarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada" required />
          
          <FormSelect name="tipoOportunidade" label="Tipo de Oportunidade:" value={formData.tipoOportunidade} onChange={handleChange} options={opportunityTypes} />

          <FormInput name="empresaOuOrgResponsavel" value={formData.empresaOuOrgResponsavel} onChange={handleChange} placeholder="Empresa/Organização" required />
          <FormInput name="localizacao" value={formData.localizacao} onChange={handleChange} placeholder="Localização" required />

          <FormTextarea name="requisitosAcessibilidade" value={formData.requisitosAcessibilidade} onChange={handleChange} placeholder="Requisitos de Acessibilidade" required rows={2} />
          
          {id && (
            <FormInput label="Data de Publicação:" name="dataPublicacao" type="date" value={formData.dataPublicacao} readOnly />
          )}

          <div className="col-span-full">
            <FormInput name="contato" value={formData.contato} onChange={handleChange} placeholder="Informações de Contato" required />
          </div>

          <button type="submit" className="p-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md col-span-full hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
            {loading ? 'Salvando...' : (id ? 'Atualizar' : 'Criar Oportunidade')}
          </button>
        </form>
        <button onClick={() => navigate('/opportunities')} className="w-full p-3 mt-6 font-semibold text-white transition-colors duration-300 bg-gray-500 rounded-md hover:bg-gray-600">
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
}

export default OpportunityForm;
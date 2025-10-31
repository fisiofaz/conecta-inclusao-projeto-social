import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormSelect from '../../components/FormSelect';
import Button from '../../components/Button';

function OpportunityForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial do formulário, com valores vazios
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoOportunidade: 'emprego',
    empresaOuOrgResponsavel: '',
    cep: '',
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
          const data = response.data;
          // Preenche o formulário com os dados da oportunidade existente
          setFormData({
            ...response.data,
            cep: data.cep || '',
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

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Limpa o CEP

    if (cep.length !== 8) {
      return; // Sai se o CEP não tiver 8 dígitos
    }

    setLoading(true); // Reutiliza seu estado de loading
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setFeedback({ type: 'error', message: 'CEP não encontrado.' });
      } else {
        // Sucesso! Combina os dados em uma única string de localização
        const fullLocation = `${data.logradouro}, ${data.bairro} - ${data.localidade}, ${data.uf}`;
        
        // Atualiza o estado
        setFormData(prevState => ({
          ...prevState,
          localizacao: fullLocation // 👈 Preenche a localização
        }));
        setFeedback({ type: '', message: '' }); // Limpa mensagens de erro
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setFeedback({ type: 'error', message: 'Ocorreu um erro ao buscar o CEP.' });
    } finally {
      setLoading(false);
    }
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
    { value: 'EMPREGO', label: 'Emprego' },
    { value: 'VOLUNTARIADO', label: 'Voluntariado' },
    { value: 'EVENTO', label: 'Evento' },
    { value: 'SAUDE_BEM_ESTAR', label: 'Saúde e Bem-Estar' },
    { value: 'ESTAGIO', label: 'ESTAGIO'},
    { value: 'PALESTRA', label: 'Palestra' },
    { value: 'CURSO_APRIMORAMENTO', label: 'Curso de Aprimoramento' },
    { value: 'CURSO_PROFISSIONALIZANTE', label: 'Curso Profissionalizante' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 sm:p-6">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-700 sm:text-3xl">
          {id ? 'Editar Oportunidade' : 'Criar Nova Oportunidade'}
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
          <div className="md:col-span-2">
            <FormInput name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Oportunidade" required />
          </div>

          <div className="md:col-span-2">
            <FormTextarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada" required />
          </div>
          
          <div className="md:col-span-2">
            <FormSelect name="tipoOportunidade" label="Tipo de Oportunidade:" value={formData.tipoOportunidade} onChange={handleChange} options={opportunityTypes} />
          </div>

          <FormInput name="empresaOuOrgResponsavel" value={formData.empresaOuOrgResponsavel} onChange={handleChange} placeholder="Empresa/Organização" required />
          <FormInput label="CEP" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="CEP (preenche a localização)" maxLength={9} />
          
          <div className="md:col-span-2">
            <FormInput label="Localização (Rua, Bairro, Cidade-UF)" name="localizacao" value={formData.localizacao} onChange={handleChange} placeholder="Localização (preenchimento automático)" required />
          </div>
          
          <div className="md:col-span-2">
            <FormTextarea name="requisitosAcessibilidade" value={formData.requisitosAcessibilidade} onChange={handleChange} placeholder="Requisitos de Acessibilidade" required rows={2} />
          </div>
          
          {id && (
            <div className="md:col-span-2">
              <FormInput label="Data de Publicação:" name="dataPublicacao" type="date" value={formData.dataPublicacao} readOnly />
            </div>
          )}

          <div className="md:col-span-2">
            <FormInput name="contato" value={formData.contato} onChange={handleChange} placeholder="Informações de Contato" required />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? 'Salvando...' : (id ? 'Atualizar Oportunidade' : 'Criar Oportunidade')}
            </Button>
          </div>
        </form>
        <Button onClick={() => navigate('/opportunities')} variant="secondary" className="w-full mt-4">
          Cancelar e Voltar
        </Button>
      </div>
    </div>
  );
}

export default OpportunityForm;
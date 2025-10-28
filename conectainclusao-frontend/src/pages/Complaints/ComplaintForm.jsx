import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import FormSelect from '../../components/FormSelect';
import Button from '../../components/Button';

function ComplaintForm() {
    const { id } = useParams();
    const navigate = useNavigate();

  // Estado inicial do formulário
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        tipoProblema: '',
        localizacaoOcorrencia: '',
        dataOcorrencia: '',
    });

    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false); 

    // useEffect para carregar os dados da denúncia se estiver em modo de edição
    useEffect(() => {
        if (id) { // Se existe um ID, estamos em modo de edição
        setLoading(true);
        const fetchComplaint = async () => {
            try {
            const response = await api.get(`/complaints/${id}`);
                // Preenche o formulário com os dados da denúncia existente
                setFormData({
                    ...response.data,
                    dataOcorrencia: response.data.dataOcorrencia ? response.data.dataOcorrencia : '',
                });
            } catch (error) {
                console.error('Erro ao carregar denúncia para edição:', error);
                setFeedback({ type: 'error', message: 'Não foi possível carregar a denúncia para edição.' });
            } finally {
                setLoading(false);
            }
        };
        fetchComplaint();
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
      if (id) {
        response = await api.put(`/complaints/${id}`, formData);
        setFeedback({ type: 'success', message: 'Denúncia atualizada com sucesso!' });
      } else {
        const dataToSubmit = { ...formData, dataOcorrencia: formData.dataOcorrencia || new Date().toISOString().split('T')[0] };
        response = await api.post('/complaints', dataToSubmit);
        setFeedback({ type: 'success', message: 'Denúncia registrada com sucesso!' });
      }

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => navigate('/complaints'), 2000);
      }
    } catch (err) {
      // Seu tratamento de erro continua o mesmo...
      console.error('Erro ao salvar denúncia:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao salvar a denúncia. Verifique os dados e tente novamente.';
      if (err.response) {
        if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (Array.isArray(err.response.data)) {
            const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
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
        return <div className="container p-4 mx-auto text-center">Carregando dados da denúncia para edição...</div>;
    }

    const problemTypes = [
      { value: 'ACESSIBILIDADE', label: 'Acessibilidade' },
      { value: 'DISCRIMINACAO', label: 'Discriminação' },
      { value: 'FALTA_DE_INFORMACAO', label: 'Falta de Informação' },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-3xl font-bold text-center text-red-700">
                    {id ? 'Editar Denúncia/Relato' : 'Registrar Nova Denúncia/Relato'}
                </h2>
                <FeedbackMessage type={feedback.type} message={feedback.message} />
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <FormInput name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Denúncia" required />
                    <FormTextarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada do problema" required rows={4} />
                    <FormSelect name="tipoProblema" label="TIPO DE PROBLEMA:" value={formData.tipoProblema} onChange={handleChange} options={problemTypes} />
                    <FormInput name="localizacaoOcorrencia" value={formData.localizacaoOcorrencia} onChange={handleChange} placeholder="Localização da Ocorrência" required />
                    <FormInput name="dataOcorrencia" type="date" label="Data da Ocorrência:" value={formData.dataOcorrencia} onChange={handleChange} required />

                    <div className="mt-4">
                        <Button type="submit" variant="danger" disabled={loading} className="w-full">
                            {loading ? 'Salvando...' : (id ? 'Atualizar Denúncia' : 'Registrar Denúncia')}
                        </Button>
                    </div>
                </form>
                <Button onClick={() => navigate('/complaints')} variant="secondary" className="w-full mt-4">
                    Cancelar e Voltar
                </Button>
            </div>
        </div>
    );
}

export default ComplaintForm;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';

function ComplaintForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoProblema: 'acessibilidade',
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
        } catch (err) {
        console.error('Erro ao carregar denúncia para edição:', err);
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
        if (id) { // Se tem ID, é uma edição (PUT)
            response = await api.put(`/complaints/${id}`, formData);
            setFeedback({ type: 'success', message: 'Denúncia atualizada com sucesso!' });
        } else { // Se não tem ID, é uma criação (POST)
            const dataToSubmit = { ...formData, dataOcorrencia: formData.dataOcorrencia || new Date().toISOString().split('T')[0] };
            response = await api.post('/complaints', dataToSubmit);
            setFeedback({ type: 'success', message: 'Denúncia registrada com sucesso!' });
    }

    if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          navigate('/complaints'); // Redireciona para a lista após sucesso
        }, 2000);
    }
    } catch (err) {
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

return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-red-700">
        {id ? 'Editar Denúncia/Relato' : 'Registrar Nova Denúncia/Relato'}
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Denúncia" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-red-500" />
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada do problema" required rows="4" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>

        <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">Tipo de Problema:</label>
            <select name="tipoProblema" value={formData.tipoProblema} onChange={handleChange} className="w-full p-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="acessibilidade">Acessibilidade</option>
            <option value="discriminação">Discriminação</option>
            <option value="falta_de_informacao">Falta de Informação</option>
            </select>
        </div>

        <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Data da Ocorrência:</label>
            <input type="date" name="dataOcorrencia" value={formData.dataOcorrencia} onChange={handleChange} required  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
        </div>

        <input type="text" name="localizacaoOcorrencia" value={formData.localizacaoOcorrencia} onChange={handleChange} placeholder="Localização da Ocorrência" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-red-500" />

        <button
            type="submit"
            className="p-3 font-semibold text-white transition-colors duration-300 bg-red-600 rounded-md col-span-full hover:bg-red-700 disabled:opacity-50" disabled={loading}
        >
            {loading ? 'Salvando...' : (id ? 'Atualizar Denúncia' : 'Registrar Denúncia')}
        </button>
        </form>
        <button onClick={() => navigate('/complaints')} className="w-full p-3 mt-6 font-semibold text-white transition-colors duration-300 bg-gray-500 rounded-md hover:bg-gray-600">
        Cancelar e Voltar
        </button>
    </div>
    </div>
);
}

export default ComplaintForm;
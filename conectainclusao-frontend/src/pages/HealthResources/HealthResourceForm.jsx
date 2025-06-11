import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';

function HealthResourceForm() {
const { id } = useParams();
const navigate = useNavigate();

const [formData, setFormData] = useState({
    nome: '',
    tipoRecurso: 'clínica', // Valor padrão
    especialidade: '',
    endereco: '',
    telefone: '',
    website: '',
    acessibilidadeDetalhes: '',
    horarioFuncionamento: '',
});

const [feedback, setFeedback] = useState({ type: '', message: '' });
const [loading, setLoading] = useState(false);

useEffect(() => {
    if (id) {
    setLoading(true);
    const fetchHealthResource = async () => {
        try {
        const response = await api.get(`/health-resources/${id}`);
        setFormData(response.data);
        } catch (err) {
        console.error('Erro ao carregar recurso de saúde para edição:', err);
        setFeedback({ type: 'error', message: 'Não foi possível carregar o recurso de saúde para edição.' });
        } finally {
        setLoading(false);
        }
    };
    fetchHealthResource();
    }
}, [id]);

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
        response = await api.put(`/health-resources/${id}`, formData);
        setFeedback({ type: 'success', message: 'Recurso de saúde atualizado com sucesso!' });
    } else {
        response = await api.post('/health-resources', formData);
        setFeedback({ type: 'success', message: 'Recurso de saúde criado com sucesso!' });
    }

    if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
        navigate('/health-resources');
        }, 2000);
    }
    } catch (err) {
    console.error('Erro ao salvar recurso de saúde:', err.response || err);
    let errorMessage = 'Ocorreu um erro ao salvar o recurso de saúde. Verifique os dados e tente novamente.';
    if (err.response) {
        if (err.response.data && typeof err.response.data === 'object') {
            if (err.response.data.message) {
                errorMessage = err.response.data.message;
            } else if (Array.isArray(err.response.data.errors)) {
                const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
                errorMessage = 'Erros de validação: ' + validationErrors;
            }
        } else if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
        }
    }
    setFeedback({ type: 'error', message: errorMessage });
    }
    finally {
        setLoading(false);
    }
};

if (loading && id) {
    return <div className="container p-4 mx-auto text-center">Carregando dados do recurso de saúde para edição...</div>;
}

return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-700">
        {id ? 'Editar Recurso de Saúde' : 'Criar Novo Recurso de Saúde'}
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Recurso" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-green-500" />

        <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">Tipo de Recurso:</label>
            <select name="tipoRecurso" value={formData.tipoRecurso} onChange={handleChange} className="w-full p-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="clínica">Clínica</option>
            <option value="hospital">Hospital</option>
            <option value="terapia">Terapia</option>
            <option value="programa">Programa de Saúde</option>
            <option value="profissional">Profissional de Saúde</option>
            </select>
        </div>

        <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} placeholder="Especialidade (Ex: Fisioterapia)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço Completo" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone (Opcional)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website (Opcional)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <textarea name="acessibilidadeDetalhes" value={formData.acessibilidadeDetalhes} onChange={handleChange} placeholder="Detalhes de Acessibilidade (Ex: Rampas, Libras)" required rows="2" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
        <input type="text" name="horarioFuncionamento" value={formData.horarioFuncionamento} onChange={handleChange} placeholder="Horário de Funcionamento (Ex: Seg-Sex 8h-18h)" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-green-500" />

        <button
            type="submit"
            className="p-3 font-semibold text-white transition-colors duration-300 bg-green-600 rounded-md col-span-full hover:bg-green-700 disabled:opacity-50" disabled={loading}
        >
            {loading ? 'Salvando...' : (id ? 'Atualizar Recurso' : 'Criar Recurso')}
        </button>
        </form>
        <button onClick={() => navigate('/health-resources')} className="w-full p-3 mt-6 font-semibold text-white transition-colors duration-300 bg-gray-500 rounded-md hover:bg-gray-600">
        Cancelar e Voltar
        </button>
    </div>
    </div>
);
}

export default HealthResourceForm;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

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

const [message, setMessage] = useState('');
const [error, setError] = useState('');
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
        setError('Não foi possível carregar o recurso de saúde para edição.');
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
    setMessage('');
    setError('');
    setLoading(true);

    try {
    let response;
    if (id) {
        response = await api.put(`/health-resources/${id}`, formData);
        setMessage('Recurso de saúde atualizado com sucesso!');
    } else {
        response = await api.post('/health-resources', formData);
        setMessage('Recurso de saúde criado com sucesso!');
    }

    if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
        navigate('/health-resources');
        }, 2000);
    }
    } catch (err) {
    console.error('Erro ao salvar recurso de saúde:', err.response || err);
    if (err.response && err.response.data && err.response.data.message) {
        setError('Erro: ' + err.response.data.message);
    } else if (err.response && err.response.data && Array.isArray(err.response.data)) {
        const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
        setError('Erros de validação: ' + validationErrors);
    } else {
        setError('Ocorreu um erro ao salvar o recurso de saúde. Verifique os dados e tente novamente.');
    }
    } finally {
    setLoading(false);
    }
};

if (loading && id) {
    return <div className="container mx-auto p-4 text-center">Carregando dados do recurso de saúde para edição...</div>;
}

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        {id ? 'Editar Recurso de Saúde' : 'Criar Novo Recurso de Saúde'}
        </h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Recurso" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />

        <div className="col-span-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Recurso:</label>
            <select name="tipoRecurso" value={formData.tipoRecurso} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="clínica">Clínica</option>
            <option value="hospital">Hospital</option>
            <option value="terapia">Terapia</option>
            <option value="programa">Programa de Saúde</option>
            <option value="profissional">Profissional de Saúde</option>
            </select>
        </div>

        <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} placeholder="Especialidade (Ex: Fisioterapia)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço Completo" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone (Opcional)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Website (Opcional)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
        <textarea name="acessibilidadeDetalhes" value={formData.acessibilidadeDetalhes} onChange={handleChange} placeholder="Detalhes de Acessibilidade (Ex: Rampas, Libras)" required rows="2" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
        <input type="text" name="horarioFuncionamento" value={formData.horarioFuncionamento} onChange={handleChange} placeholder="Horário de Funcionamento (Ex: Seg-Sex 8h-18h)" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />

        <button
            type="submit"
            className="col-span-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold disabled:opacity-50" disabled={loading}
        >
            {loading ? 'Salvando...' : (id ? 'Atualizar Recurso' : 'Criar Recurso')}
        </button>
        </form>
        <button onClick={() => navigate('/health-resources')} className="mt-6 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors duration-300 font-semibold w-full">
        Cancelar e Voltar
        </button>
    </div>
    </div>
);
}

export default HealthResourceForm;
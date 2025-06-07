import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom'; // useParams para edição

function ComplaintForm() {
  const { id } = useParams(); // Pega o ID da URL se estiver em modo de edição
  const navigate = useNavigate();

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoProblema: 'acessibilidade', // Valor padrão
    localizacaoOcorrencia: '',
    dataOcorrencia: '', // Será preenchido automaticamente ao carregar para edição ou na submissão
    // status e userId não são preenchidos pelo formulário de criação/edição comum,
    // o backend irá defini-los ou tratá-los separadamente para admins.
});

const [message, setMessage] = useState('');
const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento do formulário

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
        setError('Não foi possível carregar a denúncia para edição.');
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
    setMessage('');
    setError('');
    setLoading(true);

    try {
    let response;
      if (id) { // Se tem ID, é uma edição (PUT)
        response = await api.put(`/complaints/${id}`, formData);
        setMessage('Denúncia atualizada com sucesso!');
      } else { // Se não tem ID, é uma criação (POST)
        // Para criação, a dataOcorrencia pode ser a data atual do dia da submissão
        const dataToSubmit = { ...formData, dataOcorrencia: formData.dataOcorrencia || new Date().toISOString().split('T')[0] };
        response = await api.post('/complaints', dataToSubmit);
        setMessage('Denúncia registrada com sucesso!');
    }

    if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          navigate('/complaints'); // Redireciona para a lista após sucesso
        }, 2000);
    }
    } catch (err) {
    console.error('Erro ao salvar denúncia:', err.response || err);
    if (err.response && err.response.data && err.response.data.message) {
        setError('Erro: ' + err.response.data.message);
    } else if (err.response && err.response.data && Array.isArray(err.response.data)) {
        const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
        setError('Erros de validação: ' + validationErrors);
    } else {
        setError('Ocorreu um erro ao salvar a denúncia. Verifique os dados e tente novamente.');
    }
    } finally {
    setLoading(false);
    }
};

  if (loading && id) { // Carregando dados para edição
    return <div className="container mx-auto p-4 text-center">Carregando dados da denúncia para edição...</div>;
}

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-6">
        {id ? 'Editar Denúncia/Relato' : 'Registrar Nova Denúncia/Relato'}
        </h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Denúncia" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada do problema" required rows="4" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>

        <div className="col-span-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Problema:</label>
            <select name="tipoProblema" value={formData.tipoProblema} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="acessibilidade">Acessibilidade</option>
            <option value="discriminação">Discriminação</option>
            <option value="falta_de_informacao">Falta de Informação</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Data da Ocorrência:</label>
            <input type="date" name="dataOcorrencia" value={formData.dataOcorrencia} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        <input type="text" name="localizacaoOcorrencia" value={formData.localizacaoOcorrencia} onChange={handleChange} placeholder="Localização da Ocorrência" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />

        <button
            type="submit"
            className="col-span-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition-colors duration-300 font-semibold disabled:opacity-50" disabled={loading}
        >
            {loading ? 'Salvando...' : (id ? 'Atualizar Denúncia' : 'Registrar Denúncia')}
        </button>
        </form>
        <button onClick={() => navigate('/complaints')} className="mt-6 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors duration-300 font-semibold w-full">
        Cancelar e Voltar
        </button>
    </div>
    </div>
);
}

export default ComplaintForm;
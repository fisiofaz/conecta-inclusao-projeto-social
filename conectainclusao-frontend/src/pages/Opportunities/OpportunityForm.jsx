import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom'; // useParams para edição

function OpportunityForm() {
  const { id } = useParams(); // Pega o ID da URL se estiver em modo de edição
  const navigate = useNavigate();

  // Estado inicial do formulário, com valores vazios
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoOportunidade: 'emprego', // Valor padrão
    empresaOuOrgResponsavel: '',
    localizacao: '',
    requisitosAcessibilidade: '',
    dataPublicacao: '', // Será preenchido automaticamente ao carregar para edição
    contato: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento do formulário

  // UseEffect para carregar os dados da oportunidade se estiver em modo de edição (se tiver um ID na URL)
  useEffect(() => {
    if (id) { // Se existe um ID, estamos em modo de edição
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
          setError('Não foi possível carregar a oportunidade para edição.');
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
    setMessage('');
    setError('');
    setLoading(true);

    try {
      let response;
      if (id) { // Se tem ID, é uma edição (PUT)
        response = await api.put(`/opportunities/${id}`, formData);
        setMessage('Oportunidade atualizada com sucesso!');
      } else { // Se não tem ID, é uma criação (POST)
        // Para criação, a dataPublicacao pode ser a data atual do dia da submissão
        const dataToSubmit = { ...formData, dataPublicacao: new Date().toISOString().split('T')[0] };
        response = await api.post('/opportunities', dataToSubmit);
        setMessage('Oportunidade criada com sucesso!');
      }

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          navigate('/opportunities'); // Redireciona para a lista após sucesso
        }, 2000);
      }
    } catch (err) {
      console.error('Erro ao salvar oportunidade:', err.response || err);
      if (err.response && err.response.data && err.response.data.message) {
        setError('Erro: ' + err.response.data.message);
      } else if (err.response && err.response.data && Array.isArray(err.response.data)) {
        const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
        setError('Erros de validação: ' + validationErrors);
      } else {
        setError('Ocorreu um erro ao salvar a oportunidade. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) { // Carregando dados para edição
    return <div className="container mx-auto p-4 text-center">Carregando dados da oportunidade para edição...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {id ? 'Editar Oportunidade' : 'Criar Nova Oportunidade'}
        </h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título da Oportunidade" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição detalhada" required rows="4" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          <div className="col-span-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Oportunidade:</label>
            <select name="tipoOportunidade" value={formData.tipoOportunidade} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="emprego">Emprego</option>
              <option value="voluntariado">Voluntariado</option>
              <option value="evento">Evento</option>
              <option value="saude_bem_estar">Saúde e Bem-Estar</option> {/* Incluímos o novo tipo aqui */}
            </select>
          </div>

          <input type="text" name="empresaOuOrgResponsavel" value={formData.empresaOuOrgResponsavel} onChange={handleChange} placeholder="Empresa/Organização Responsável" required className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="localizacao" value={formData.localizacao} onChange={handleChange} placeholder="Localização (Ex: Remoto, Cidade-UF)" required className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="requisitosAcessibilidade" value={formData.requisitosAcessibilidade} onChange={handleChange} placeholder="Requisitos de Acessibilidade (Ex: rampas, libras, etc.)" required rows="2" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          {/* Data de Publicação não é editável diretamente pelo usuário no front,
              mas é preenchida para a edição e enviada automaticamente na criação */}
          {id && ( // Apenas mostra o campo dataPublicacao no modo de edição
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Data de Publicação:</label>
              <input type="date" name="dataPublicacao" value={formData.dataPublicacao} readOnly className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
            </div>
          )}

          <input type="text" name="contato" value={formData.contato} onChange={handleChange} placeholder="Informações de Contato" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button
            type="submit"
            className="col-span-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold disabled:opacity-50" disabled={loading}
          >
            {loading ? 'Salvando...' : (id ? 'Atualizar Oportunidade' : 'Criar Oportunidade')}
          </button>
        </form>
        <button onClick={() => navigate('/opportunities')} className="mt-6 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors duration-300 font-semibold w-full">
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
}

export default OpportunityForm;
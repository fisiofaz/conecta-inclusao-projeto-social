import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial do formulário (sem senha, ela não é retornada do backend)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: 'PCD',
    dataNascimento: '',
    deficiencia: '',
    cidade: '',
    estado: '',
    bio: '',
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) { // Se existe um ID, estamos em modo de edição
      setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setFormData({
            ...response.data,
            senha: '',
            dataNascimento: response.data.dataNascimento ? response.data.dataNascimento : '',
          });
        } catch (err) {
          console.error('Erro ao carregar usuário para edição:', err);
          setFeedback({ type: 'error', message: 'Não foi possível carregar o usuário para edição. Verifique suas permissões.' });
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
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
      // Para o PUT, enviamos todos os campos, incluindo uma senha vazia se não for alterada
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.senha) {
        delete dataToSubmit.senha;
      }

      response = await api.put(`/users/${id}`, dataToSubmit);
      setFeedback({ type: 'success', message: 'Usuário atualizado com sucesso!' });

      if (response.status === 200) {
        setFeedback({ type: 'success', message: 'Usuário atualizado com sucesso!' });
        setTimeout(() => {
            
            navigate('/users');
        }, 2000);
      }
    
    } catch (err) {
      console.error('Erro ao salvar usuário:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao salvar o usuário. Verifique os dados e tente novamente.';
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

  if (loading && id) {
    return <div className="container p-4 mx-auto text-center">Carregando dados do usuário para edição...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Editar Usuário
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Nova Senha (deixe em branco para manter a atual)" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">Tipo de Perfil:</label>
            <select name="tipoPerfil" value={formData.tipoPerfil} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="PCD">Pessoa com Deficiência</option>
              <option value="Empresa">Empresa</option>
              <option value="ORGAO_APOIO">Órgão de Apoio</option>
              <option value="ADMIN">Administrador</option> {/* Admin pode mudar perfil para Admin */}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <input type="text" name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografia" rows="4" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          <button
            type="submit"
            className="p-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md col-span-full hover:bg-blue-700 disabled:opacity-50" disabled={loading}
          >
            {loading ? 'Salvando...' : 'Atualizar Usuário'}
          </button>
        </form>
        <button onClick={() => navigate('/users')} className="w-full p-3 mt-6 font-semibold text-white transition-colors duration-300 bg-gray-500 rounded-md hover:bg-gray-600">
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
}

export default UserForm;
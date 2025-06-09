import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const { id } = useParams(); // Pega o ID da URL se estiver em modo de edição
  const navigate = useNavigate();

  // Estado inicial do formulário (sem senha, ela não é retornada do backend)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '', // Para edição, a senha não é preenchida, mas pode ser enviada se alterada
    tipoPerfil: 'PCD',
    dataNascimento: '',
    deficiencia: '',
    cidade: '',
    estado: '',
    bio: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) { // Se existe um ID, estamos em modo de edição
      setLoading(true);
      const fetchUser = async () => {
        try {
          // Buscar o usuário pelo ID (essa rota exige autenticação e isAdmin pode ver)
          const response = await api.get(`/users/${id}`);
          setFormData({
            ...response.data,
            senha: '', // Garante que a senha não seja preenchida no formulário
            dataNascimento: response.data.dataNascimento ? response.data.dataNascimento : '',
          });
        } catch (err) {
          console.error('Erro ao carregar usuário para edição:', err);
          setError('Não foi possível carregar o usuário para edição. Verifique suas permissões.');
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
    setMessage('');
    setError('');
    setLoading(true);

    try {
      let response;
      // Para o PUT, enviamos todos os campos, incluindo uma senha vazia se não for alterada
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.senha) {
        delete dataToSubmit.senha; // Se a senha estiver vazia, não a envie no PUT para não sobrescrever
      }

      response = await api.put(`/users/${id}`, dataToSubmit); // PUT sempre com ID
      setMessage('Usuário atualizado com sucesso!');

     if (response.status === 200) {
        setMessage('Usuário atualizado com sucesso!');
        setTimeout(() => {
            
            navigate('/users');
        }, 2000);
    } else {
        
        setError('Ocorreu um erro inesperado ao atualizar o usuário. Status: ' + response.status);
    }

    } catch (err) {
      console.error('Erro ao salvar usuário:', err.response || err);
      if (err.response && err.response.data && err.response.data.message) {
        setError('Erro: ' + err.response.data.message);
      } else if (err.response && err.response.data && Array.isArray(err.response.data)) {
        const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
        setError('Erros de validação: ' + validationErrors);
      } else {
        setError('Ocorreu um erro ao salvar o usuário. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="container mx-auto p-4 text-center">Carregando dados do usuário para edição...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Editar Usuário
        </h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Nova Senha (deixe em branco para manter a atual)" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="col-span-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Perfil:</label>
            <select name="tipoPerfil" value={formData.tipoPerfil} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="PCD">Pessoa com Deficiência</option>
              <option value="Empresa">Empresa</option>
              <option value="ORGAO_APOIO">Órgão de Apoio</option>
              <option value="ADMIN">Administrador</option> {/* Admin pode mudar perfil para Admin */}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <input type="text" name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografia" rows="4" className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          <button
            type="submit"
            className="col-span-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold disabled:opacity-50" disabled={loading}
          >
            {loading ? 'Salvando...' : 'Atualizar Usuário'}
          </button>
        </form>
        <button onClick={() => navigate('/users')} className="mt-6 bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors duration-300 font-semibold w-full">
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
}

export default UserForm;
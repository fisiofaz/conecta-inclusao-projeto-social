import React, { useState } from 'react';
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';

function RegisterPage() {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);

    try {
      const response = await api.post('/users', formData); // Envia para /api/users
      if (response.status === 201) { // Status 201 Created do backend
        setFeedback({ type: 'success', message: 'Usuário registrado com sucesso! Você pode fazer login agora.' });
        // Redireciona para a página de login após um breve atraso
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Erro no registro:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao registrar. Tente novamente.';
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = 'Este e-mail já está em uso. Por favor, use outro.';
        } else if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (Array.isArray(err.response.data.errors)) { // Validação do Spring
            const validationErrors = err.response.data.errors.map(e => e.defaultMessage || e.message).join('; ');
            errorMessage = 'Erros de validação: ' + validationErrors;
          }
        } else if (typeof err.response.data === 'string') {
            errorMessage = err.response.data; // Caso o backend retorne apenas uma string de erro
        }
      }
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">Cadastro de Usuário</h2>
      
      <FeedbackMessage type={feedback.type} message={feedback.message} />
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">Tipo de Perfil:</label>
            <select name="tipoPerfil" value={formData.tipoPerfil} onChange={handleChange} className="w-full p-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ">
              <option value="PCD">Pessoa com Deficiência</option>
              <option value="Empresa">Empresa</option>
              <option value="Orgão_Apoio">Órgão de Apoio</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input type="text" name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografia" rows="4" className="p-3 border border-gray-300 rounded-md col-span-full focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button
            type="submit"
            className="p-3 font-semibold text-white transition-colors duration-300 bg-green-600 rounded-md col-span-full hover:bg-green-700 disabled:opacity-50" disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'} 
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
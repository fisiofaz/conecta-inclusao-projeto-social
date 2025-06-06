import React, { useState } from 'react';
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: 'PCD', // Valor padrão, pode ser alterado
    dataNascimento: '',
    deficiencia: '',
    cidade: '',
    estado: '',
    bio: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa mensagens anteriores
    setError('');   // Limpa erros anteriores

    try {
      const response = await api.post('/users', formData); // Envia para /api/users
      if (response.status === 201) { // Status 201 Created do backend
        setMessage('Usuário registrado com sucesso! Você pode fazer login agora.');
        // Redireciona para a página de login após um breve atraso
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Erro no registro:', err.response || err);
      if (err.response && err.response.status === 409) {
        setError('Este e-mail já está em uso. Por favor, use outro.');
      } else if (err.response && err.response.data && err.response.data.message) {
        setError('Erro no registro: ' + err.response.data.message);
      } else if (err.response && err.response.data && Array.isArray(err.response.data)) {
        // Se o backend retorna uma lista de erros de validação
        const validationErrors = err.response.data.map(e => e.defaultMessage || e.message).join('; ');
        setError('Erros de validação: ' + validationErrors);
      } else {
        setError('Ocorreu um erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Cadastro de Usuário</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required className="col-span-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="col-span-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Perfil:</label>
            <select name="tipoPerfil" value={formData.tipoPerfil} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="PCD">Pessoa com Deficiência</option>
              <option value="Empresa">Empresa</option>
              <option value="Orgão_Apoio">Órgão de Apoio</option>
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
          <button type="submit" className="col-span-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold">Cadastrar </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
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
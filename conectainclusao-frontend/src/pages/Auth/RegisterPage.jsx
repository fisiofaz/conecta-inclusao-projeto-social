import React, { useState } from 'react';
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Cadastro de Usuário</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required />

        <label>Tipo de Perfil:</label>
        <select name="tipoPerfil" value={formData.tipoPerfil} onChange={handleChange}>
          <option value="PCD">Pessoa com Deficiência</option>
          <option value="Empresa">Empresa</option>
          <option value="Orgão_Apoio">Órgão de Apoio</option>
          {/* Adicione outras opções conforme as roles que planeja ter no backend */}
        </select>

        <label>Data de Nascimento:</label>
        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />

        <input type="text" name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" />
        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" />
        <input type="text" name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografia" rows="4"></textarea>

        <button type="submit">Cadastrar</button>
      </form>
      <p style={{ marginTop: '10px' }}>Já tem uma conta? <a href="/login">Faça login aqui</a></p>
    </div>
  );
}

export default RegisterPage;
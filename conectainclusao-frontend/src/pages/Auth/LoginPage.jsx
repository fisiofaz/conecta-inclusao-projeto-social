import React, { useState } from 'react';
import api from '../../services/api'; // Importa a instância do axios configurada
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      const response = await api.post('/auth/login', { email, senha }); // Envia para /api/auth/login

      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token); // Armazena o token no localStorage
        // Pormenor: Você pode também armazenar informações do usuário (como o tipoPerfil) se o token incluir
        // ou se você tiver outro endpoint para pegar o perfil após o login.
        console.log('Login bem-sucedido! Token:', response.data.token);
        // Redireciona para a página principal ou dashboard
        navigate('/'); // Redireciona para a Home Page
        // Você pode adicionar um state ou context aqui para indicar que o usuário está logado
      } else {
        setError('Token não recebido. Verifique suas credenciais.');
      }
    } catch (err) {
      console.error('Erro no login:', err.response || err);
      if (err.response && err.response.status === 403) { // Status 403 Forbidden para credenciais inválidas
        setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        setError('Ocorreu um erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: '10px' }}>Não tem uma conta? <a href="/register">Cadastre-se aqui</a></p>
    </div>
  );
}

export default LoginPage;
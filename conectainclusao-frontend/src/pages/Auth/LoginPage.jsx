import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FeedbackMessage from '../../components/FeedbackMessage'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true); // Inicia o carregamento
    // Chama a função de login do AuthContext
    const success = await login(email, senha);

    if (success) {
      setFeedback({ type: 'success', message: 'Login bem-sucedido! Redirecionando...' });
      setTimeout(() => {
        navigate('/'); // Redireciona para a Home Page após login
      }, 1500); // Dar um tempo para a mensagem aparecer
    } else {
      setFeedback({ type: 'error', message: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">Login</h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-3 transition-colors duration-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="p-3 transition-colors duration-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="p-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">Não tem uma conta? <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se aqui</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
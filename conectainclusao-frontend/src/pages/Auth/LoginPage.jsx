import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FeedbackMessage from '../../components/FeedbackMessage'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  
  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <div className="relative"> {/* Adiciona um contêiner relativo para posicionar o ícone */}
            <input 
              type={showPassword ? 'text' : 'password'} // << Altera o tipo baseado no estado
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Senha" 
              required 
              className="w-full p-3 pr-10 transition-colors duration-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Adiciona pr-10 para espaço do ícone
            />
            <button
              type="button" // << Importante: tipo "button" para não submeter o formulário
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.25l-2.625-2.625m2.625 2.625L10 12.375M13.875 18.25c.014-.15.025-.303.025-.461 0-3.327-2.686-6.009-6-6.009S.896 9.473.896 12.8c0 3.327 2.686 6.009 6 6.009s6.009-2.686 6.009-6.009c0-.158-.011-.311-.025-.461z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              )}
            </button>
          </div>
          <button type="submit" className="p-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">Não tem uma conta? <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se aqui</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
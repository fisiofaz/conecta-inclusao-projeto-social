import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    // Chama a função de login do AuthContext
    const success = await login(email, senha);

    if (success) {
      console.log('Login bem-sucedido via AuthContext!');
      navigate('/'); // Redireciona para a Home Page após login
    } else {
      setError('Credenciais inválidas ou erro no servidor. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          />
        <input 
          type="password" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          placeholder="Senha" 
          required 
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold">Entrar</button>
        </form>
        <p className="text-center text-gray-600 mt-6">Não tem uma conta? <Link to="/register" className="text-blue-600 hover:underline">Cadastre-se aqui</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
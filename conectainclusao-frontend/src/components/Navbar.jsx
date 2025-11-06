import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Menu, X } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMenuOpen(false); // Fecha o menu mobile após a busca
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isAdmin = user?.tipoPerfil === 'ROLE_ADMIN';

  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between p-4 bg-blue-700 shadow-md">
      <Link to="/dashboard" className="text-2xl font-bold text-white transition-colors duration-300 hover:text-blue-200">
        Conecta Inclusão
      </Link>
      {/* Botão Hambúrguer */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Container do Menu Colapsável */}
      {/* Ajustadas as classes para esconder/mostrar e posicionar corretamente */}
      <div className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
        <ul className="flex flex-col w-full md:flex-row md:items-center md:space-x-6 md:w-auto">
          {/* Links de Navegação */}
          <li>
            <Link to="/opportunities" className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>Oportunidades</Link>
          </li>
          <li>
            <Link to="/complaints" className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>Denúncias</Link>
          </li>
          {/* ADICIONE ESTE NOVO LINK (somente se estiver logado) */}
          {isAuthenticated() && (
            <li>
              <Link to="/my-complaints" className="block px-4 py-2 text-lg text-yellow-300 hover:text-white md:px-0" onClick={() => setIsMenuOpen(false)}>
                Minhas Denúncias
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <Link to="/my-favorites" className="block px-4 py-2 text-lg text-yellow-300 hover:text-white md:px-0" onClick={() => setIsMenuOpen(false)}>
                Meus Favoritos
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <Link to="/my-applications" className="block px-4 py-2 text-lg text-yellow-300 hover:text-white md:px-0" onClick={() => setIsMenuOpen(false)}>
                Minhas Candidaturas
              </Link>
            </li>
          )}
          <li>
            <Link to="/saude" className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>Saúde & Bem-Estar</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/users" className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>Usuários</Link>
            </li>
          )}
          
          {/* Formulário de Busca - Integrado */}
          {isAuthenticated() && (
            // Adicionado margem para espaçamento em desktop (md:ml-6) e mobile (mt-4)
            <li className="mt-4 md:mt-0 md:ml-6"> 
              <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // Estilo ajustado para consistência e responsividade
                  className="w-full px-4 py-2 pl-10 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
              </form>
            </li>
          )}

          {/* Botões de Autenticação */}
          {/* Adicionado margem para espaçamento */}
          <li className="mt-4 md:mt-0 md:ml-6">
            {!isAuthenticated() ? (
              <div className="flex flex-col gap-4 md:flex-row">
                <Link to="/login" className="block px-4 py-2 text-lg text-center text-white hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-4 py-2 text-lg text-center text-white hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Cadastro</Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                // Estilo consistente com outros botões
                className="w-full px-4 py-2 text-lg text-white bg-red-500 rounded-md hover:bg-red-600 md:w-auto"
              >
                Sair
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

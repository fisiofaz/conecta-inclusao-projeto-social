import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
const { isAuthenticated, logout, getTipoPerfil } = useAuth();
const navigate = useNavigate();
const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleLogout = () => {
    logout();
    navigate('/login');
};

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

const userTipoPerfil = getTipoPerfil();
const isAdmin = userTipoPerfil === 'ADMIN';

  return (
    <nav className="relative z-10 flex items-center justify-between p-4 bg-blue-700 shadow-md">
      <Link to="/dashboard" className="text-2xl font-bold text-white transition-colors duration-300 hover:text-blue-200">
        Conecta Inclusão
      </Link>
      {/* Botão de Hambúrguer - Visível apenas em telas pequenas (hidden em md e maiores) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>
      {/* Lista de Links - Oculta em telas pequenas por padrão, visível em md e maiores, ou quando isMenuOpen é true */}
      <ul className={`md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-blue-700 md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <li>
          <Link to="/opportunities" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
            Oportunidades
          </Link>
        </li>
        <li>
          <Link to="/complaints" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
            Denúncias
          </Link>
        </li>
        <li>
          <Link to="/saude" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
            Saúde & Bem-Estar
          </Link>
        </li>
      {isAdmin && (
            <li>
                <Link to="/users" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
                    Usuários
                </Link>
            </li>
        )}
        {!isAuthenticated() ? (
          <>
            <li>
              <Link to="/login" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="block px-4 py-2 text-lg text-white transition-colors duration-300 hover:text-blue-200 md:px-0" onClick={() => setIsMenuOpen(false)}>
                Cadastro
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-1 text-lg text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600 md:w-auto"
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

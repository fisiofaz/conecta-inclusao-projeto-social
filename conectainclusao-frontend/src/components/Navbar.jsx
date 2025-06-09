import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
const { isAuthenticated, logout, getTipoPerfil } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate('/login');
};

const userTipoPerfil = getTipoPerfil();
const isAdmin = userTipoPerfil === 'ADMIN';

  return (
    <nav className="bg-blue-700 p-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition-colors duration-300">
        Conecta Inclusão
      </Link>
      <ul className="flex space-x-6">
        <li>
          <Link to="/opportunities" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
            Oportunidades
          </Link>
        </li>
        <li>
          <Link to="/complaints" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
            Denúncias
          </Link>
        </li>
        <li>
          <Link to="/health-resources" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
            Saúde & Bem-Estar
          </Link>
        </li>
      {isAdmin && (
            <li>
                <Link to="/users" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
                    Usuários
                </Link>
            </li>
        )}
        {!isAuthenticated() ? (
          <>
            <li>
              <Link to="/login" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white text-lg hover:text-blue-200 transition-colors duration-300">
                Cadastro
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white text-lg px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
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

import React from 'react';
import { Link } from 'react-router-dom'; 


function Navbar() {
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
      </ul>
    </nav>
  );
}

export default Navbar;

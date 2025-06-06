import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-brand">
        Conecta Inclusão
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/opportunities" className="navbar-item">
            Oportunidades
          </Link>
        </li>
        <li>
          <Link to="/complaints" className="navbar-item">
            Denúncias
          </Link>
        </li>
        <li>
          <Link to="/health-resources" className="navbar-item">
            Saúde & Bem-Estar
          </Link>
        </li>
        <li>
          <Link to="/login" className="navbar-item">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="navbar-item">
            Cadastro
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

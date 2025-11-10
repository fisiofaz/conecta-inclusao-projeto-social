import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Search, Menu, X } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="relative z-10 flex flex-wrap items-center justify-between p-4 bg-blue-700 shadow-md"
      role="navigation"
      aria-label="Menu principal"
    >
      {/* 🔹 Nome e logo do site */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-white transition-colors duration-300 hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
        aria-label="Página inicial Conecta Inclusão"
      >
        Conecta Inclusão
      </Link>

      {/* 🔹 Botão Hambúrguer (visível apenas no mobile) */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Container do Menu Colapsável */}
      <div
        id="menu-mobile"
        className={`w-full md:flex md:items-center md:w-auto ${
          isMenuOpen ? "flex" : "hidden"
        } mt-4 md:mt-0`}
      >
        <ul className="flex flex-col w-full md:flex-row md:items-center md:space-x-6 md:w-auto">
          {/* 🔹 Links de Navegação */}
          <li>
            <Link
              to="/opportunities"
              className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Oportunidades
            </Link>
          </li>
          <li>
            <Link
              to="/complaints"
              className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Denúncias
            </Link>
          </li>
          <li>
            <Link
              to="/saude"
              className="block px-4 py-2 text-lg text-white hover:text-blue-200 md:px-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Saúde &amp; Bem-Estar
            </Link>
          </li>

          {/* 🔹 Campo de Busca */}
          {isAuthenticated() && (
            <li className="mt-4 md:mt-0 md:ml-6">
              <form
                onSubmit={handleSearchSubmit}
                className="relative w-full md:w-auto"
                role="search"
                aria-label="Buscar oportunidades e recursos"
              >
                <label htmlFor="searchInput" className="sr-only">
                  Buscar
                </label>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search
                  className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 pointer-events-none"
                  size={18}
                  aria-hidden="true"
                />
              </form>
            </li>
          )}

          {/* 🔹 Botões de Login / Cadastro / Perfil */}
          <li className="mt-4 md:mt-0 md:ml-6">
            {!isAuthenticated() ? (
              <div className="flex flex-col gap-4 md:flex-row">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-lg text-center text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-lg text-center text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastro
                </Link>
              </div>
            ) : (
              <ProfileDropdown />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

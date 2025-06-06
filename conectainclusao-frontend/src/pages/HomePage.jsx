import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">Bem-vindo ao Conecta Inclusão!</h2>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">O Hub de Inclusão que conecta Pessoas com Deficiência (PCDs) a oportunidades, recursos e comunidades.</p>
      <nav className="flex space-x-6"> {/* flex, space-x-6 */}
        <Link to="/opportunities" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"> {/* button styles */}
          Ver Oportunidades
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 text-lg font-semibold"> {/* button styles */}
          Cadastre-se
        </Link>
      </nav>
    </div>
  );
}

export default HomePage;
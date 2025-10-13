import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-4xl font-extrabold text-center text-blue-700">
        Bem-vindo ao Conecta Inclusão!
      </h2>
      <p className="max-w-2xl mb-8 text-xl text-center text-gray-700">
        O Hub de Inclusão que conecta Pessoas com Deficiência (PCDs) a
        oportunidades, recursos e comunidades.
      </p>
      <nav className="flex space-x-6">
        {" "}
        {/* flex, space-x-6 */}
        <Link
          to="/opportunities"
          className="px-4 py-2 text-base font-semibold text-center text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md sm:px-6 sm:py-3 md:px-8 md:py-4 hover:bg-blue-700 sm:text-lg md:text-xl"
        >
          Ver Oportunidades
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-base font-semibold text-center text-white transition-colors duration-300 bg-green-600 rounded-lg shadow-md sm:px-6 sm:py-3 md:px-8 md:py-4 hover:bg-green-700 sm:text-lg md:text-xl"
        >
          Cadastre-se
        </Link>
      </nav>
    </div>
  );
}

export default HomePage;

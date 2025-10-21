import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function DashboardPage() {
  console.log("DashboardPage: Componente renderizou!");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-4xl font-extrabold text-center text-blue-700">
        Bem-vindo ao Conecta Inclusão!
      </h2>
      <p className="max-w-2xl mb-8 text-xl text-center text-gray-700">
        O Hub de Inclusão que conecta Pessoas com Deficiência (PCDs) a
        oportunidades, recursos e comunidades.
      </p>
    </div>
  );
}

export default DashboardPage;

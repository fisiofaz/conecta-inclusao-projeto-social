import React from "react";

function DashboardPage() {
  console.log("DashboardPage: Componente renderizou!");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-100 sm:p-8">
      <h2 className="mb-6 text-3xl font-extrabold text-blue-700 sm:text-4xl">
        Bem-vindo ao Conecta Inclusão!
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-700 sm:text-xl">
        O Hub de Inclusão que conecta Pessoas com Deficiência (PCDs) a
        oportunidades, recursos e comunidades.
      </p>
    </div>
  );
}

export default DashboardPage;

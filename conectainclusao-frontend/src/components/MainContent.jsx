import React from "react";

export default function MainContent() {
  return (
    <main id="inicio" className="p-6">
      <img
        src="/logo.png"
        alt="Logotipo da Conecta Inclusão"
        className="w-32 mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">
        Bem-vindo ao Conecta Inclusão
      </h1>

      <p className="mb-4">
        Este é um projeto voltado à inclusão digital e acessibilidade para
        pessoas com deficiência (PCD).
      </p>

      <button
        aria-label="Fechar modal"
        className="focus:ring-2 focus:ring-blue-500 mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
      >
        ✖
      </button>
    </main>
  );
}

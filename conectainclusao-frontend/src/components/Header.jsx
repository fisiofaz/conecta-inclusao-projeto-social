import React from "react";

export default function Header() {
  return (
    <nav
      aria-label="Menu principal"
      className="bg-blue-800 text-white p-4 flex justify-center gap-6"
    >
      <a
        href="#inicio"
        className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 px-2 py-1 rounded"
      >
        Início
      </a>
      <a
        href="#sobre"
        className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 px-2 py-1 rounded"
      >
        Sobre
      </a>
      <a
        href="#contato"
        className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 px-2 py-1 rounded"
      >
        Contato
      </a>
    </nav>
  );
}

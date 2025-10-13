import React, { useState } from "react";

export default function SaudeBemEstar() {
  const [showHelp, setShowHelp] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-4">
  {/* Botão Cadastro no canto esquerdo */}
  <button
    onClick={() => navigate('/health-resources/create')}
    className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-green-700 transition"
  >
    ➕ Cadastrar Clínica / Serviço
  </button>

  {/* Botão de Emergência no canto direito */}
  <button
    onClick={() => setShowHelp(true)}
    className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-red-700 transition"
  >
    🚨 Preciso de Ajuda
  </button>
</div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Saúde & Bem-Estar
      </h1>

      <p className="text-center mb-10 text-gray-700 max-w-2xl mx-auto">
        Aqui você encontra informações e recursos para promover uma vida mais
        saudável e equilibrada, com foco em acessibilidade e inclusão para
        Pessoas com Deficiência (PCDs).
      </p>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card Exercícios */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <img
            src="/Images/Saude/exercicios.jpg"
            alt="Exercícios adaptados"
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Exercícios Adaptados
          </h2>
          <p className="text-gray-600 mb-4">
            Atividades físicas adaptadas ajudam a melhorar a mobilidade,
            fortalecer músculos e promover bem-estar, respeitando as
            necessidades de cada pessoa.
          </p>
          <a
            href="https://www.youtube.com/playlist?list=PLn-6v5XJ0DQVE1V4RJZDXvF5Xc9yCzYlb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Ver exercícios adaptados →
          </a>
        </div>

        {/* Card Alimentação */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <img
            src="/Images/Saude/alimentacao.jpg"
            alt="Alimentação saudável"
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Alimentação Saudável
          </h2>
          <p className="text-gray-600 mb-4">
            Uma dieta equilibrada contribui para mais energia, melhor
            imunidade e qualidade de vida. Pequenas mudanças nos hábitos
            alimentares podem fazer toda a diferença.
          </p>
          <a
            href="https://www.tuasaude.com/alimentacao-saudavel/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Saiba mais →
          </a>
        </div>

        {/* Card Saúde Mental */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <img
            src="/Images/Saude/saude-mental.jpg"
            alt="Saúde mental"
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            Saúde Mental
          </h2>
          <p className="text-gray-600 mb-4">
            Cuidar da mente é essencial. Apoio psicológico, meditação e
            conversas abertas ajudam a reduzir o estresse e aumentar o
            bem-estar.
          </p>
          <a
            href="https://www.cvv.org.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Apoio emocional →
          </a>
        </div>
      </div>

      {/* Modal de Ajuda */}
      {showHelp && (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              🚨 Canais de Ajuda
            </h2>
            <ul className="space-y-3 text-lg">
              <li>
                <span className="font-semibold">📞 SAMU (Emergência médica):</span>{" "}
                <a href="tel:192" className="text-blue-600 hover:underline">
                  192
                </a>
              </li>
              <li>
                <span className="font-semibold">💬 CVV (Apoio emocional):</span>{" "}
                <a href="tel:188" className="text-blue-600 hover:underline">
                  188
                </a>
              </li>
              <li>
                <span className="font-semibold">🛡️ Disque Direitos Humanos:</span>{" "}
                <a href="tel:100" className="text-blue-600 hover:underline">
                  100
                </a>
              </li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

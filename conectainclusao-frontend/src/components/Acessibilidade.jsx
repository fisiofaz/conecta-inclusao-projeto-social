import { useEffect, useState } from "react";

export default function AccessibilityTools() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [showHelp, setShowHelp] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // 🔹 Tema de alto contraste
  useEffect(() => {
    if (isHighContrast) {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#FFD700";
      document.body.style.filter = "contrast(130%)";
      setAnnouncement("Modo alto contraste ativado");
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.filter = "none";
      setAnnouncement("Modo alto contraste desativado");
    }
  }, [isHighContrast]);

  // 🔹 Controle de tamanho da fonte
  useEffect(() => {
    document.querySelector("body").style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // 🔹 VLibras
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    };
  }, []);

  return (
    <>
      {/* 🔊 Região de anúncio (para leitores de tela) */}
      <div
        aria-live="polite"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* 🚨 Botão SOS */}
      <button
        onClick={() => setShowHelp(true)}
        aria-label="Abrir menu de ajuda emergencial"
        className="fixed top-3 left-3 z-50 w-10 h-10 bg-white text-red-600 border border-red-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-300 text-lg"
      >
        🚨
      </button>

      {/* ⚡ Botão Alto Contraste */}
      <button
        onClick={() => setIsHighContrast(!isHighContrast)}
        aria-label={
          isHighContrast
            ? "Desativar modo alto contraste"
            : "Ativar modo alto contraste"
        }
        aria-pressed={isHighContrast}
        className="fixed top-16 left-3 z-50 w-10 h-10 bg-white text-yellow-600 border border-yellow-500 rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-300 text-lg"
      >
        ⚡
      </button>

      {/* 🔤 Controle de Fonte */}
      <div
        className="fixed bottom-4 left-4 z-50 bg-white rounded-xl shadow-md p-2 flex flex-col items-center gap-1 border border-gray-200"
        role="group"
        aria-label="Controles de tamanho da fonte"
      >
        <button
          onClick={() => {
            setFontSize((s) => Math.min(s + 20, 400));
            setAnnouncement("Tamanho da fonte aumentado");
          }}
          aria-label="Aumentar tamanho da fonte"
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          A+
        </button>
        <button
          onClick={() => {
            setFontSize((s) => Math.max(s - 20, 60));
            setAnnouncement("Tamanho da fonte diminuído");
          }}
          aria-label="Diminuir tamanho da fonte"
          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          A-
        </button>
      </div>

      {/* 🆘 Modal de ajuda */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
        >
          <div className="bg-white text-black p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 id="help-modal-title" className="text-xl font-bold mb-4">
              🚨 Ajuda Emergencial
            </h2>
            <p className="mb-4">
              Se você está em perigo ou precisa de assistência, entre em contato
              com os serviços de emergência:
            </p>
            <ul className="text-left mb-4">
              <li className="font-semibold mb-2">📞 190 — Polícia</li>
              <li className="font-semibold mb-2">🚑 192 — SAMU</li>
              <li className="font-semibold mb-2">🔥 193 — Bombeiros</li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              aria-label="Fechar janela de ajuda"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

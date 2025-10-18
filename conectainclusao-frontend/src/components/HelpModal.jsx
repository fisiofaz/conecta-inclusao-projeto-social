import React from 'react';
import Button from './Button'; // Reutilizando nosso botão

function HelpModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-red-600">
          🚨 Canais de Ajuda
        </h2>
        <ul className="space-y-3 text-lg">
          <li>
            <span className="font-semibold">📞 SAMU (Emergência médica):</span>{" "}
            <a href="tel:192" className="text-blue-600 hover:underline">192</a>
          </li>
          <li>
            <span className="font-semibold">💬 CVV (Apoio emocional):</span>{" "}
            <a href="tel:188" className="text-blue-600 hover:underline">188</a>
          </li>
          <li>
            <span className="font-semibold">🛡️ Disque Direitos Humanos:</span>{" "}
            <a href="tel:100" className="text-blue-600 hover:underline">100</a>
          </li>
        </ul>
        <Button onClick={onClose} variant="primary" className="w-full mt-6">
          Fechar
        </Button>
      </div>
    </div>
  );
}

export default HelpModal;
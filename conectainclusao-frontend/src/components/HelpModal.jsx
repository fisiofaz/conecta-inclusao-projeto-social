import React from 'react';
import Button from './Button'; // Reutilizando nosso botão
import Modal from './Modal';

function HelpModal({ isOpen, onClose }) {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚨 Canais de Ajuda">
      
      {/* Todo o conteúdo específico do modal vai aqui dentro */}
      <ul className="space-y-3 text-lg">
        <li>
          <span className="font-semibold">📞 SAMU (Emergência):</span>{" "}
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
      
    </Modal>
  );
}

export default HelpModal;
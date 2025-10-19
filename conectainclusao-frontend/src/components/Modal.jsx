import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // Fundo escuro (overlay) que fecha o modal ao clicar
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose} 
    >
      {/* Container do Modal que impede o fechamento ao clicar dentro dele */}
      <div 
        className="w-full max-w-lg p-6 bg-white shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Cabeçalho do Modal com Título e Botão de Fechar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-3xl font-light text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        {/* Conteúdo específico que será passado para o modal */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
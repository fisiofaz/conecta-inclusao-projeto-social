import React from 'react';

function FeedbackMessage({ type, message }) {
  if (!message) {
    return null; // Não renderiza nada se não houver mensagem
  }

  // Define classes Tailwind baseadas no tipo da mensagem
  const baseClasses = "p-3 rounded-md mb-4 text-center font-medium";
  let typeClasses = "";

  switch (type) {
    case 'success':
      typeClasses = "bg-green-100 text-green-800 border border-green-300";
      break;
    case 'error':
      typeClasses = "bg-red-100 text-red-800 border border-red-300";
      break;
    case 'info':
      typeClasses = "bg-blue-100 text-blue-800 border border-blue-300";
      break;
    default:
      typeClasses = "bg-gray-100 text-gray-800 border border-gray-300";
  }

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {message}
    </div>
  );
}

export default FeedbackMessage;
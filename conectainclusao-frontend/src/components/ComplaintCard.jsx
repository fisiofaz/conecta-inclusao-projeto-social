import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

// A lógica de estilo pertence à view, então ela fica aqui.
const getStatusClasses = (status) => {
  switch (status ? status.toLowerCase() : '') {
    case 'aberto':
      return 'bg-yellow-200 text-yellow-800';
    case 'em_analise':
      return 'bg-blue-200 text-blue-800';
    case 'resolvido':
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

function ComplaintCard({ complaint, canManage, onDelete }) {
  if (!complaint) {
    return null;
  }

  return (
    <div
      role="article"
      aria-labelledby={`complaint-title-${complaint.id}`}
      className="flex flex-col justify-between h-full p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl"
    >
      <div>
        <h3 id={`complaint-title-${complaint.id}`} className="mb-3 text-xl font-semibold text-red-600">{complaint.titulo}</h3>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Tipo:</strong> {complaint.tipoProblema}
        </p>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Local:</strong> {complaint.localizacaoOcorrencia}
        </p>
        <p className="mb-4 text-sm text-gray-700">
          <strong>Status:</strong> <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(complaint.status)}`}>{complaint.status}</span>
        </p>
        <p className="flex-grow mb-4 text-xs text-gray-500 truncate">
          {complaint.descricao}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 mt-4 sm:flex-row">
        <Link
          to={`/complaints/${complaint.id}`}
          aria-label={`Ver detalhes da reclamação ${complaint.titulo}`}
          className="w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-red-500 rounded-md sm:w-auto hover:bg-red-600"
        >
          Ver Detalhes
        </Link>
        {canManage && (
          <div className="flex w-full gap-2 sm:w-auto">
            <Link
              to={`/complaints/edit/${complaint.id}`}
              aria-label={`Editar reclamação ${complaint.titulo}`}
              className="flex-1 px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Editar
            </Link>
            <Button 
              onClick={() => onDelete(complaint.id)} 
              variant="secondary"
              aria-label={`Excluir reclamação ${complaint.titulo}`}
              className="flex-1 text-sm"
            >
              Excluir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintCard;
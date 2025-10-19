import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

// A função de estilo do status pertence à view, então ela fica aqui.
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

function ComplaintDetailsView({ complaint, canManage, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="container p-6 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-center text-red-700 sm:text-4xl">{complaint.titulo}</h2>
      
      <div className="mb-6 space-y-2 text-base text-gray-700 sm:text-lg">
        <p><strong>Tipo de Problema:</strong> {complaint.tipoProblema}</p>
        <p><strong>Localização:</strong> {complaint.localizacaoOcorrencia}</p>
        <p><strong>Data da Ocorrência:</strong> {complaint.dataOcorrencia}</p>
        <p>
          <strong>Status:</strong> <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(complaint.status)}`}>{complaint.status}</span>
        </p>
        <p><strong>Registrado por:</strong> {complaint.userId ? `ID ${complaint.userId}` : 'Anônimo'}</p>
      </div>

      <div className="p-4 mb-6 text-base border border-gray-200 rounded-md bg-gray-50 sm:text-lg">
        <h3 className="mb-3 text-xl font-semibold text-gray-800">Descrição Detalhada:</h3>
        <p className="text-gray-700">{complaint.descricao}</p>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mt-8 sm:flex-row">
        <Button onClick={() => navigate('/complaints')} variant="secondary" className="w-full sm:w-auto">
          Voltar para a lista
        </Button>
        
        {canManage && (
          <div className="flex flex-col w-full gap-4 sm:flex-row sm:w-auto">
            <Link
              to={`/complaints/edit/${complaint.id}`}
              className="w-full px-4 py-3 font-semibold text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md sm:w-auto hover:bg-yellow-600"
            >
              Editar
            </Link>
            <Button onClick={onDelete} variant="danger" className="w-full sm:w-auto">
              Excluir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetailsView;
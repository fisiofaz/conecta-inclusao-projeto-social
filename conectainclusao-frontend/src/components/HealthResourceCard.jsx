import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; 

function HealthResourceCard({ resource, canManage, onDelete }) {
  if (!resource) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
      <div>
        <h3 className="mb-3 text-xl font-semibold text-green-600">
          {resource.nome}
        </h3>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Tipo:</strong> {resource.tipoRecurso}
        </p>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Especialidade:</strong> {resource.especialidade || 'Não especificado'}
        </p>
        <p className="mb-4 text-sm text-gray-700">
          <strong>Endereço:</strong> {resource.endereco}
        </p>
        <p className="flex-grow mb-4 text-xs text-gray-500">
          <strong>Acessibilidade:</strong> {resource.acessibilidadeDetalhes}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 mt-4 sm:flex-row">
        <Link
          to={`/health-resources/${resource.id}`}
          className="w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-green-500 rounded-md sm:w-auto hover:bg-green-600"
        >
          Ver Detalhes
        </Link>
        {canManage && (
          <div className="flex w-full gap-2 sm:w-auto">
            <Link
              to={`/health-resources/edit/${resource.id}`}
              className="flex-1 px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Editar
            </Link>
            <Button 
              onClick={() => onDelete(resource.id)} 
              variant="danger" 
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

export default HealthResourceCard;
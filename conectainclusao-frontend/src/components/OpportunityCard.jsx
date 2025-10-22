import React from 'react';
import { Link } from 'react-router-dom';

function OpportunityCard({ opportunity, canManage, onDelete, icon = null }) {
  // Se não receber uma oportunidade, não renderiza nada para evitar erros.
  if (!opportunity) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
      <div> {/* Div para agrupar o conteúdo principal */}
        <div className="flex items-center mb-3"> 
          {icon} {/* Renderiza o ícone se ele for passado */}
          <h3 className="text-xl font-semibold text-blue-600 sm:text-lg">
            {opportunity.titulo}
          </h3>
        </div>
        <p className="mb-2 text-sm text-gray-700"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
        <p className="mb-2 text-sm text-gray-700"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
        <p className="mb-4 text-sm text-gray-700"><strong>Local:</strong> {opportunity.localizacao}</p>
        <p className="flex-grow mb-4 text-xs text-gray-500">
          {opportunity.requisitosAcessibilidade}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Link
          to={`/opportunities/${opportunity.id}`}
          className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600 sm:w-auto"
        >
          Ver Detalhes
        </Link>
        {canManage && (
          <>
            <Link
              to={`/opportunities/edit/${opportunity.id}`}
              className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600 sm:w-auto"
            >
              Editar
            </Link>
            <button
              onClick={() => onDelete(opportunity.id)}
              className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600 sm:w-auto"
            >
              Excluir
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OpportunityCard;
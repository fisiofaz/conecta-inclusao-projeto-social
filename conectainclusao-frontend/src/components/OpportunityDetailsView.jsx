import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

function OpportunityDetailsView({ opportunity, canManage, onDelete, isPCD, isApplying, isApplied, applyError, onApply }) {
  
  const navigate = useNavigate();

  return (
    <div className="container p-6 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-center text-blue-700 sm:text-4xl">
        {opportunity.titulo}
      </h2>
      
      <div className="text-base text-gray-700 sm:text-lg">
        <p className="mb-2"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
        <p className="mb-2"><strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}</p>
        <p className="mb-2"><strong>Localização:</strong> {opportunity.localizacao}</p>
        <p className="mb-2"><strong>Publicado em:</strong> {opportunity.dataPublicacao}</p>
        <p className="mb-4"><strong>Requisitos de Acessibilidade:</strong> {opportunity.requisitosAcessibilidade}</p>
      </div>

      <div className="p-4 mb-6 text-base border border-gray-200 rounded-md bg-gray-50 sm:text-lg">
        <h3 className="mb-3 text-xl font-semibold text-gray-800">Descrição Detalhada:</h3>
        <p className="text-gray-700">{opportunity.descricao}</p>
      </div>
      <p className="text-base text-gray-700 sm:text-lg"><strong>Contato:</strong> {opportunity.contato}</p>

      <div className="flex flex-col items-center justify-between mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button onClick={() => navigate('/opportunities')} className="flex-1 w-full px-4 py-2 text-white transition-colors duration-300 bg-gray-500 rounded-md hover:bg-gray-600 sm:flex-none sm:w-auto">
          Voltar para a lista
        </button>
        {/* Mostra "Editar/Excluir" SE for Admin/Empresa */}
        {canManage && (
          <>
            <Link
              to={`/opportunities/${opportunity.id}/applicants`}
              className="flex-1 w-full px-4 py-2 text-center text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700 sm:flex-none sm:w-auto"
            >
              Ver Candidatos
            </Link>
            <Link
              to={`/opportunities/edit/${opportunity.id}`}
              className="flex-1 w-full px-4 py-2 text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600 sm:flex-none sm:w-auto"
            >
              Editar
            </Link>
            <button
              onClick={onDelete} // Usamos a função recebida via props
              className="flex-1 w-full px-4 py-2 text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600 sm:flex-none sm:w-auto"
            >
              Excluir
            </button>
          </>
        )}
        
        {/* Mostra "Candidatar-se" SE for PCD (ROLE_USER) */}
        {isPCD && (
          <div className="flex-1 w-full sm:w-auto"> {/* Wrapper para o botão e o erro */}
            <button
              onClick={onApply}
              disabled={isApplying || isApplied} // Desabilita se estiver carregando ou já se candidatou
              className={`
                flex-1 w-full px-4 py-2 text-center text-white transition-colors duration-300 rounded-md sm:flex-none sm:w-auto
                flex items-center justify-center 
                ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
                ${isApplying ? 'bg-green-700 opacity-75 cursor-wait' : ''}
              `}
            >
              {isApplying && <LoaderCircle size={18} className="mr-2 animate-spin" />}
              
              {/* Muda o texto do botão baseado no estado */}
              {isApplying ? "Enviando..." : (isApplied ? "Candidatura Enviada" : "Candidatar-se")}
            </button>
            
            {/* Mostra a mensagem de erro (Ex: "Você já se candidatou") */}
            {applyError && (
              <p className="mt-2 text-sm text-center text-red-600">{applyError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OpportunityDetailsView;
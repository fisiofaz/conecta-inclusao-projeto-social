import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'lucide-react';
import InclusionSeal from './InclusionSeal';

function OpportunityCard({ opportunity, canManage, onDelete, icon = null }) {
  // Pegamos as funções do nosso Contexto de Autenticação
  const { isAuthenticated, isFavorite, addFavorite, removeFavorite } = useAuth();
  
  if (!opportunity) {
    return null;
  }

  const isFav = isFavorite('opportunity', opportunity.id);

  // Função que será chamada ao clicar no coração
  const handleFavoriteClick = (e) => {
    // e.stopPropagation() impede que o clique no coração 
    // acione o clique no card inteiro (se houver)
    e.stopPropagation(); 
    e.preventDefault();

    if (isFav) {
      removeFavorite('opportunity', opportunity.id);
    } else {
      addFavorite('opportunity', opportunity.id);
    }
  };

  return (
    <div role="article" aria-labelledby={`opp-title-${opportunity.id}`} className="flex flex-col justify-between h-full p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
      <div> {/* Div para agrupar o conteúdo principal */}
        <div className="flex items-start justify-between mb-3"> 
          {/* Div para agrupar ícone e título */}
          <div className="flex items-center">
            <span aria-hidden="true">{icon}</span>
            <h3 id={`opp-title-${opportunity.id}`} className="text-xl font-semibold text-blue-600 sm:text-lg">
              {opportunity.titulo}
            </h3>
          </div>
          {/* O botão de coração só aparece se o usuário estiver logado */}
          {isAuthenticated() && (
            <button
              onClick={handleFavoriteClick}
              className="p-1 text-gray-400 rounded-full hover:bg-red-50"
              aria-label={isFav ? `Remover ${opportunity.titulo} dos favoritos` : `Adicionar ${opportunity.titulo} aos favoritos`}
            >
              <Heart
                size={20}
                // Muda a cor e preenchimento se for favorito
                className={isFav ? 'text-red-500 fill-red-500' : 'hover:text-red-500'}
              />
            </button>
          )}
        </div>
        <p className="mb-2 text-sm text-gray-700"><strong>Tipo:</strong> {opportunity.tipoOportunidade}</p>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm text-gray-700">
            <strong>Empresa:</strong> {opportunity.empresaOuOrgResponsavel}
          </p>
          <InclusionSeal ownerId={opportunity.ownerId} />
        </div>
        <p className="mb-4 text-sm text-gray-700"><strong>Local:</strong> {opportunity.localizacao}</p>
        <p className="flex-grow mb-4 text-xs text-gray-500">
          {opportunity.requisitosAcessibilidade}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Link
          to={`/opportunities/${opportunity.id}`}
          aria-label={`Ver detalhes da vaga ${opportunity.titulo}`}
          className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600 sm:w-auto"
        >
          Ver Detalhes
        </Link>
        {canManage && (
          <>
            <Link
              to={`/opportunities/edit/${opportunity.id}`}
              aria-label={`Editar vaga ${opportunity.titulo}`}
              className="w-full px-4 py-2 text-sm text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600 sm:w-auto"
            >
              Editar
            </Link>
            <button
              onClick={() => onDelete(opportunity.id)}
              aria-label={`Excluir vaga ${opportunity.titulo}`}
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
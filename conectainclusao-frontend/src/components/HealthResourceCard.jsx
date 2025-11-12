import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; 
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'lucide-react';


function HealthResourceCard({ resource, canManage, onDelete, icon = null }) {
  const { isAuthenticated, isFavorite, addFavorite, removeFavorite } = useAuth();

  if (!resource) {
    return null;
  }

  const isFav = isFavorite('health', resource.id);

  // Função que será chamada ao clicar no coração
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault();

    if (isFav) {
      removeFavorite('health', resource.id);
    } else {
      addFavorite('health', resource.id);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
      <div>
        <div className="flex items-start justify-between mb-3">
          {/* Div para agrupar ícone e título */}
          <div className="flex items-center">
            <span aria-hidden="true">{icon}</span>
            <h3 id={`hr-title-${resource.id}`} className="mb-3 text-xl font-semibold text-green-600">
              {resource.nome}
            </h3>
          </div>

          {/* O botão de coração só aparece se o usuário estiver logado */}
          {isAuthenticated() && (
            <button
              onClick={handleFavoriteClick}
              className="p-1 text-gray-400 rounded-full hover:bg-red-50"
              aria-label={isFav ? `Remover ${resource.nome} dos favoritos` : `Adicionar ${resource.nome} aos favoritos`}
            >
              <Heart
                size={20}
                className={isFav ? 'text-red-500 fill-red-500' : 'hover:text-red-500'}
              />
            </button>
          )}
        </div>

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
          to={`/saude/${resource.id}`}
          className="w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-green-500 rounded-md sm:w-auto hover:bg-green-600"
        >
          Ver Detalhes
        </Link>
        {canManage && (
          <div className="flex w-full gap-2 sm:w-auto">
            <Link
              to={`/saude/edit/${resource.id}`}
              aria-label={`Editar serviço ${resource.nome}`}
              className="flex-1 px-4 py-2 text-sm font-semibold text-center text-white transition-colors duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Editar
            </Link>
            <Button 
              onClick={() => onDelete(resource.id)} 
              variant="danger" 
              aria-label={`Excluir serviço ${resource.nome}`}
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
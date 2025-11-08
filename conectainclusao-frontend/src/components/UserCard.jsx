import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

function UserCard({ user, onDelete }) {
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between h-full p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
      <div>
        <h3 className="mb-3 text-xl font-semibold text-gray-800 truncate">
          {user.nome}
        </h3>
        <p className="mb-2 text-sm text-gray-700 truncate">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Perfil:</strong> {user.tipoPerfil}
        </p>
        <p className="flex-grow mb-4 text-sm text-gray-700">
          <strong>Deficiência:</strong> {user.deficiencia || 'Não informada'}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 mt-4">
        {/* Botão NOVO para Detalhes/Atividade */}
        <Link to={`/users/details/${user.id}`} className="w-full">
          <Button variant="primary" className="w-full text-sm">
            Atividade
          </Button>
        </Link>
        {/* Botão Editar */}
        <Link to={`/users/edit/${user.id}`} className="w-full">
          <Button variant="secondary" className="w-full text-sm">
            Editar
          </Button>
        </Link>
        {/* Botão Excluir*/}
        <Button onClick={() => onDelete(user.id)} variant="danger" className="w-full text-sm">
          Excluir
        </Button>
      </div>
    </div>
  );
}

export default UserCard;
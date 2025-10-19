import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-extrabold text-blue-700">404</h1>
      <h2 className="mt-4 mb-2 text-3xl font-bold">Página Não Encontrada</h2>
      <p className="max-w-sm mb-8 text-gray-600">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/">
        <Button variant="primary">Voltar para a Página Inicial</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
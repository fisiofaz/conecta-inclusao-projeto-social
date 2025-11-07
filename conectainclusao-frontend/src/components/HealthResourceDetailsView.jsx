import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

function HealthResourceDetailsView({ resource, canManage, onDelete }) {
  const navigate = useNavigate();

  // --- Estado para recarregar a lista ---
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSuccess = () => {
    // Incrementa a chave para forçar o recarregamento do ReviewList
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <div className="container p-6 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-700 sm:text-4xl">{resource.nome}</h2>
      
        <div className="mb-6 space-y-2 text-base text-gray-700 sm:text-lg">
          <p><strong>Tipo de Recurso:</strong> {resource.tipoRecurso}</p>
          <p><strong>Especialidade:</strong> {resource.especialidade || 'Não especificado'}</p>
          <p><strong>Endereço:</strong> {resource.endereco}</p>
          <p><strong>Telefone:</strong> {resource.telefone || 'Não disponível'}</p>
          <p>
            <strong>Website:</strong> {resource.website ? 
              <a href={resource.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">{resource.website}</a> : 'Não disponível'}
          </p>
          <p><strong>Horário de Funcionamento:</strong> {resource.horarioFuncionamento || 'Não informado'}</p>
        </div>

        <div className="p-4 mb-6 text-base border border-gray-200 rounded-md bg-gray-50 sm:text-lg">
          <h3 className="mb-3 text-xl font-semibold text-gray-800">Detalhes de Acessibilidade:</h3>
          <p className="text-gray-700">{resource.acessibilidadeDetalhes}</p>
        </div>
      
        <div className="flex flex-col items-center justify-between gap-4 mt-8 sm:flex-row">
          <Button onClick={() => navigate('/health-resources')} variant="secondary" className="w-full sm:w-auto">
            Voltar para a lista
          </Button>
        
          {canManage && (
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:w-auto">
              <Link
                to={`/saude/edit/${resource.id}`}
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
      {/* Nova Seção de Avaliações --- */}
      <div className="container p-6 mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Avaliações deste Serviço
        </h2>

        {/* Formulário para DEIXAR uma avaliação */}
        <div className="mb-8">
          <ReviewForm 
            entityId={resource.id}
            entityType="HEALTH_RESOURCE" // Tipo EXATO do Enum do backend
            onReviewSubmit={handleReviewSuccess} // A função que recarrega a lista
          />
        </div>

        {/* Lista de avaliações JÁ FEITAS */}
        <ReviewList 
          entityId={resource.id}
          entityType="HEALTH_RESOURCE"
          refreshKey={refreshKey} // O "gatilho" para recarregar
        />
      </div>
    </>
  );
}

export default HealthResourceDetailsView;
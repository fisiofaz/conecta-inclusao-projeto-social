import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StarRating from './StarRating';
import { LoaderCircle, MessageSquare, AlertTriangle } from 'lucide-react';

/**
 * Componente para LISTAR todas as avaliações de um item.
 * * Props:
 * - entityId (Number): O ID do item (ex: ID da Oportunidade)
 * - entityType (String): O tipo do item (ex: "OPPORTUNITY" ou "HEALTH_RESOURCE")
 * - refreshKey (Number/String): Um "gatilho" que, ao mudar, força o componente a recarregar
 */
function ReviewList({ entityId, entityType, refreshKey }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito que busca as avaliações
  useEffect(() => {
    if (!entityId || !entityType) return; 

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/reviews/${entityType}/${entityId}`);
        setReviews(response.data);
      } catch (err) {
        console.error("Erro ao carregar avaliações:", err);
        setError("Não foi possível carregar as avaliações.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [entityId, entityType, refreshKey]); 

  // --- Lógica para Média das Estrelas ---
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length);
  };
  const averageRating = calculateAverageRating();


  if (loading) {
    return (
      <div className="flex items-center justify-center py-5">
        <LoaderCircle size={24} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5 text-center text-red-600">
        <AlertTriangle size={32} className="mx-auto mb-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-2xl font-semibold">Avaliações</h3>
      
      {/* --- Card de Resumo (Média) --- */}
      {reviews.length > 0 && (
        <div className="p-4 mb-6 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800">Resumo</h4>
          <div className="flex items-center mt-2 space-x-2">
            <StarRating rating={averageRating} readOnly={true} />
            <span className="font-bold text-gray-700">{averageRating.toFixed(1)} de 5</span>
            <span className="text-gray-500">({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})</span>
          </div>
        </div>
      )}

      {/* --- Lista de Comentários Individuais --- */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4" />
            <p>Este item ainda não possui avaliações.</p>
            <p>Seja o primeiro a avaliar!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                {/* Estrelas da avaliação */}
                <StarRating rating={review.rating} readOnly={true} />
                {/* Nome do Autor */}
                <span className="text-sm font-semibold text-gray-800">{review.authorName || "Anônimo"}</span>
              </div>
              
              {/* Comentário */}
              {review.comment && (
                <p className="italic text-gray-700">"{review.comment}"</p>
              )}
              
              {/* Data */}
              <p className="mt-2 text-xs text-gray-400">
                Avaliado em: {new Date(review.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewList;
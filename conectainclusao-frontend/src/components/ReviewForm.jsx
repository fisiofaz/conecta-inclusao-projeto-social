import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import StarRating from './StarRating'; // O componente que acabamos de criar
import Button from './Button';
import FeedbackMessage from './FeedbackMessage';

/*
 * Formulário para criar uma nova avaliação (Review).
 * * Props:
 * - entityId (Number): O ID do item (ex: ID da Oportunidade)
 * - entityType (String): O tipo do item (ex: "OPPORTUNITY" ou "HEALTH_RESOURCE")
 * - onReviewSubmit (Function): Função para ser chamada após o sucesso (para recarregar a lista de reviews)
 */
function ReviewForm({ entityId, entityType, onReviewSubmit }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0); // Estado para as estrelas
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setFeedback({ type: 'error', message: 'Por favor, selecione uma nota (de 1 a 5 estrelas).' });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      // 1. Monta o DTO que o backend espera
      const reviewData = {
        entityId: entityId,
        entityType: entityType, // Ex: "OPPORTUNITY"
        rating: rating,
        comment: comment
      };

      // 2. Chama a API que criamos
      await api.post('/reviews', reviewData);

      setFeedback({ type: 'success', message: 'Sua avaliação foi enviada com sucesso!' });
      
      // 3. Limpa o formulário e avisa o componente "pai"
      setRating(0);
      setComment("");
      if (onReviewSubmit) {
        onReviewSubmit(); // Isso vai recarregar a lista de reviews
      }

    } catch (err) {
      console.error("Erro ao enviar avaliação:", err);
      if (err.response && err.response.status === 409) {
        // 409 (Conflict) é o erro que o backend retorna se "já avaliou"
        setFeedback({ type: 'error', message: 'Você já avaliou este item.' });
      } else {
        setFeedback({ type: 'error', message: 'Não foi possível enviar sua avaliação.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="p-4 text-center text-gray-600 bg-gray-100 rounded-lg">
        Você precisa estar <a href="/login" className="text-blue-600 underline">logado</a> para deixar uma avaliação.
      </p>
    );
  }

  return (
    <div className="p-5 bg-white border rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-semibold">Deixe sua Avaliação</h3>
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Componente de Estrelas */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">Sua nota:</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>

        {/* Campo de Comentário */}
        <div className="flex flex-col">
          <label htmlFor="comment" className="mb-2 font-medium text-gray-700">Seu comentário (opcional):</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte mais sobre sua experiência..."
            rows={4}
            className="w-full p-3 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" variant="primary" disabled={loading} className="w-full">
          {loading ? "Enviando..." : "Enviar Avaliação"}
        </Button>
      </form>
    </div>
  );
}

export default ReviewForm;
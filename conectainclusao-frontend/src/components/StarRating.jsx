import React, { useState } from 'react';
import { Star } from 'lucide-react';

/*
 * Componente de Avaliação por Estrelas
 * * Props:
 * - rating (Number): A nota atual (de 1 a 5).
 * - setRating (Function): Uma função (do useState) para definir a nota quando o usuário clicar.
 * - readOnly (Boolean): Se for true, as estrelas não serão clicáveis (usado para exibir médias).
 */
function StarRating({ rating, setRating, readOnly = false }) {
  // Estado 'hover' para o efeito de "passar o mouse"
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1; // Valor da estrela (1, 2, 3, 4, 5)

        return (
          <label key={ratingValue}>
            {/* O input radio real fica escondido, usamos o label (a estrela) para controlá-lo */}
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={readOnly ? null : () => setRating(ratingValue)}
              className="sr-only" // "Screen-reader only" (esconde o input visualmente)
              disabled={readOnly}
            />
            <Star
              className={`cursor-pointer transition-colors ${
                readOnly ? 'cursor-default' : 'hover:text-yellow-500'
              }`}
              color={ratingValue <= (hover || rating) ? "#FFC107" : "#e4e5e9"}
              fill={ratingValue <= (hover || rating) ? "#FFC107" : "none"}
              size={24}
              onMouseEnter={readOnly ? null : () => setHover(ratingValue)}
              onMouseLeave={readOnly ? null : () => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
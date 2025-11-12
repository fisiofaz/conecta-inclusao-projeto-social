import React, { useState } from 'react';
import { Star } from 'lucide-react';

/*
 * ⭐ Componente de Avaliação por Estrelas
 * Props:
 * - rating (Number): nota atual (de 0 a 5, pode ter decimais)
 * - setRating (Function): função para atualizar nota (caso interativo)
 * - readOnly (Boolean): se true, apenas exibe (sem clique)
 */
function StarRating({ rating = 0, setRating = () => {}, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        // Valor exibido (hover tem prioridade sobre rating normal)
        const displayValue = hover || rating;

        // Cálculo da porcentagem de preenchimento
        const fillPercentage =
          displayValue >= ratingValue
            ? 100
            : displayValue + 1 > ratingValue
            ? (displayValue % 1) * 100
            : 0;

        return (
          <label key={ratingValue} className="relative">
            {/* Ícone da estrela */}
            <Star
              size={20}
              className={`transition-all ${
                readOnly ? '' : 'cursor-pointer hover:scale-110'
              }`}
              color="#e4e5e9"
              fill={`url(#grad-${ratingValue})`}
              onMouseEnter={readOnly ? null : () => setHover(ratingValue)}
              onMouseLeave={readOnly ? null : () => setHover(0)}
              onClick={readOnly ? null : () => setRating(ratingValue)}
            />

            {/* Gradiente para simular meia estrela */}
            <svg width="0" height="0">
              <linearGradient id={`grad-${ratingValue}`}>
                <stop offset={`${fillPercentage}%`} stopColor="#FFC107" />
                <stop offset={`${fillPercentage}%`} stopColor="transparent" />
              </linearGradient>
            </svg>
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;

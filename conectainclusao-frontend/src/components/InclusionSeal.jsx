import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Medal, Shield, XCircle, LoaderCircle } from 'lucide-react';
import StarRating from './StarRating';

const Tooltip = ({ message, children }) => (
  <div className="relative group">
    {children}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
      {message}
    </span>
  </div>
);

function InclusionSeal({ ownerId }) {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Não faz nada se não tiver um ID de dono
    if (!ownerId) {
      setLoading(false);
      return;
    }

    const fetchScore = async () => {
      setLoading(true);
      try {
        // Chama a API que criámos no backend
        const response = await api.get(`/inclusion-score/user/${ownerId}`);
        setScoreData(response.data);
      } catch (err) {
        console.error(`Erro ao buscar pontuação para owner ${ownerId}:`, err);
        setScoreData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [ownerId]); // Recarrega se o ID do dono mudar

  // Se estiver a carregar, mostra um ícone pequeno
  if (loading) {
    return <LoaderCircle size={16} className="animate-spin text-gray-400" />;
  }

  // Se não houver dados (ou a pontuação for "NENHUM"), não mostra nada
  if (!scoreData || scoreData.sealLevel === "NENHUM") {
    return null; // Não renderiza nada
  }

  // Objeto de configuração dos selos
  const seals = {
    BRONZE: {
      icon: <Medal size={16} className="text-yellow-600" />,
      text: "Selo Bronze",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      tooltip: `Bronze: ${scoreData.opportunityCount} vagas | Média ${scoreData.averageRating?.toFixed(1) || 'N/A'} ★`,
    },
    PRATA: {
      icon: <Medal size={16} className="text-gray-500" />,
      text: "Selo Prata",
      bgColor: "bg-gray-200",
      textColor: "text-gray-700",
      tooltip: `Prata: ${scoreData.opportunityCount} vagas | Média ${scoreData.averageRating?.toFixed(1) || 'N/A'} ★`,
    },
    OURO: {
      icon: <Shield size={16} className="text-yellow-500" />,
      text: "Selo Ouro",
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-800",
      tooltip: `Ouro: ${scoreData.opportunityCount} vagas | Média ${scoreData.averageRating?.toFixed(1) || 'N/A'} ★`,
    },
  };

  const seal = seals[scoreData.sealLevel];

  // Se o nível de selo não for reconhecido, não mostra nada
  if (!seal) {
    return null;
  }

  return (
    <Tooltip message={seal.tooltip}>
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${seal.bgColor}`}>
        {seal.icon}
        <span className={`text-xs font-semibold ${seal.textColor}`}>
          {seal.text}
        </span>
        {scoreData?.averageRating ? (
            <StarRating rating={scoreData.averageRating} readOnly={true} />
        ) : (
            <span className="text-xs text-gray-500">Sem avaliações</span>
        )}
      </div>
    </Tooltip>
  );
}

export default InclusionSeal;
import React from 'react';
import { User, Mail, Clock } from 'lucide-react';

// Função para dar cor ao Status
const getStatusClasses = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  switch (status.toUpperCase()) {
    case 'APLICADA':
      return 'bg-blue-100 text-blue-800';
    case 'VISUALIZADA':
    case 'EM_PROCESSO':
      return 'bg-yellow-100 text-yellow-800';
    case 'APROVADA':
      return 'bg-green-100 text-green-800';
    case 'REJEITADA':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

function ApplicantCard({ application }) {
  // Pega os dados do DTO que o backend enviou
  const {
    status,
    dataCandidatura,
    userName, // Nome do candidato
    userEmail // Email do candidato
  } = application;

  // Formata a data
  const formattedDate = new Date(dataCandidatura).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="p-5 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      <h3 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-800">
        <User size={20} className="text-blue-600" />
        {userName}
      </h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <Mail size={16} />
          <a href={`mailto:${userEmail}`} className="text-blue-600 hover:underline">
            {userEmail}
          </a>
        </p>
        
        <p className="flex items-center gap-2">
          <Clock size={16} />
          Candidatou-se em: {formattedDate}
        </p>
        
        <p className="flex items-center gap-2">
          Status: 
          <span className={`px-2 py-0.5 rounded-full font-semibold text-xs ${getStatusClasses(status)}`}>
            {status ? status.replace('_', ' ') : 'N/A'}
          </span>
        </p>
      </div>

      {/* No futuro, podemos adicionar botões aqui para a Empresa "Aprovar" ou "Rejeitar" o candidato */}
    </div>
  );
}

export default ApplicantCard;
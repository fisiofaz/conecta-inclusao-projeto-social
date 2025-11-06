import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, FileText } from 'lucide-react';

// Função para dar cor ao Status
const getStatusClasses = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
        switch (status.toUpperCase()) {
            case 'APLICADA':
            return 'bg-blue-100 text-blue-800'; // Azul (Enviada)
            case 'VISUALIZADA':
            case 'EM_PROCESSO':
            return 'bg-yellow-100 text-yellow-800'; // Amarelo (Em análise)
        case 'APROVADA':
            return 'bg-green-100 text-green-800'; // Verde (Sucesso)
        case 'REJEITADA':
            return 'bg-red-100 text-red-800'; // Vermelho (Rejeitada)
        default:
        return 'bg-gray-100 text-gray-800'; // Padrão
    }
};

function ApplicationCard({ application }) {
   
    const {
        status,
        dataCandidatura,
        opportunityId,
        opportunityTitle,
        opportunityCompany
    } = application;

    // Formata a data para (dd/mm/aaaa)
    const formattedDate = new Date(dataCandidatura).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="flex flex-col justify-between h-full p-5 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
        <div>
            <div className="flex items-center mb-3">
            <Briefcase size={20} className="flex-shrink-0 mr-2 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{opportunityTitle}</h3>
            </div>
            <p className="mb-4 text-sm font-semibold text-gray-700">{opportunityCompany}</p>
        
            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                    <FileText size={16} />
                    Status:
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-xs ${getStatusClasses(status)}`}>
                        {status ? status.replace('_', ' ') : 'N/A'}
                    </span>
                </p>
                <p className="flex items-center gap-2">
                    <Clock size={16} />
                    Aplicado em: {formattedDate}
                </p>
            </div>
        </div>
        <div className="pt-4 mt-5 border-t">
            {/* Link para o usuário rever a vaga original */}
            <Link
                to={`/opportunities/${opportunityId}`}
                className="font-semibold text-blue-600 hover:text-blue-800"
            >
                Ver Vaga Original
            </Link>
        </div>
        </div>
    );
}

export default ApplicationCard;
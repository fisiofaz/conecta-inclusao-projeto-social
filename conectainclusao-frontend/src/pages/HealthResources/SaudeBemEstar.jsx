import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import ModalCadastroClinica from "../../components/ModalCadastroClinica";
import api from '../../services/api';
import HealthResourceCard from "../../components/HealthResourceCard";
import InfoCard from "../../components/InfoCard";
import HelpModal from "../../components/HelpModal";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

const infoCardData = [
  {
    imageSrc: "/Images/Saude/exercicios.jpg",
    altText: "Exercícios adaptados",
    title: "Exercícios Adaptados",
    description: "Atividades físicas adaptadas ajudam a melhorar a mobilidade, fortalecer músculos e promover bem-estar.",
    linkHref: "https://www.youtube.com/watch?v=09sqYInEKXI",
    linkText: "Ver exercícios adaptados",
  },
  {
    imageSrc: "/Images/Saude/alimentacao.jpg",
    altText: "Alimentação saudável",
    title: "Alimentação Saudável",
    description: "Uma dieta equilibrada contribui para mais energia, melhor imunidade e qualidade de vida. Pequenas mudanças nos hábitos alimentares podem fazer toda a diferença.",
    linkHref: "https://amigosmultiplos.org.br/noticia/a-importancia-da-alimentacao-balanceada-para-a-pessoa-com-deficiencia/#:~:text=Quais%20os%20alimentos%20n%C3%A3o%20podem,as%20necessidades%20de%20cada%20pessoa.&text=Al%C3%A9m%20de%20serem%20ricos%20em,e%20tamb%C3%A9m%20previne%20doen%C3%A7as%20cardiovasculares.&text=Os%20ovos%20s%C3%A3o%20prote%C3%ADnas%20magras,e%20no%20combate%20%C3%A0%20hipertens%C3%A3o.&text=Ingerir%20grandes%20quantidades%20de%20folhas,sals%C3%A3o",
    linkText: "Ver alimentação saudável",
  },
  {
    imageSrc: "/Images/Saude/saude-mental.jpg",
    altText: "Saúde mental",
    title: "Saúde Mental",
    description: "Cuidar da mente é essencial. Apoio psicológico, meditação e conversas abertas ajudam a reduzir o estresse e aumentar o bem-estar.",
    linkHref: "https://www.cvv.org.br/",
    linkText: "Ver saúde mental",
  },
];

export default function SaudeBemEstar() {
  const [showHelp, setShowHelp] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false); // Estado para controlar o modal de cadastro
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log("Perfil do usuário LOGADO (SaudeBemEstar):", user?.tipoPerfil);
  const canRegisterClinic = user?.tipoPerfil === 'ROLE_ADMIN' || user?.tipoPerfil === 'ROLE_ORGAO_APOIO'

  
  const carregarClinicas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/health-resources");
      setClinicas(response.data);
    } catch (error) {
      console.error("Erro ao carregar clínicas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar clínicas do backend
  useEffect(() => {
    carregarClinicas();
  }, []);

  const handleCadastroSuccess = () => {
    // Recarregar lista de clínicas após cadastro bem-sucedido
    carregarClinicas();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este recurso?')) {
      try {
        await api.delete(`/health-resources/${id}`);
        // Recarrega a lista após a exclusão
        carregarClinicas();
        // Você pode querer adicionar um FeedbackMessage aqui
      } catch (err) {
        console.error('Erro ao excluir recurso:', err);
        // Adicionar feedback de erro
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between mb-4">
        {/* Botão Cadastro no canto esquerdo */}
        {canRegisterClinic && (
          <Button onClick={() => setShowCadastro(true)} variant="primary" className="flex items-center gap-2">
            <UserPlus size={20} />
            Cadastrar Serviço
          </Button>
        )}

      </div>

      <h1 className="mb-6 text-4xl font-extrabold text-center">
        Saúde & Bem-Estar
      </h1>

      <p className="max-w-2xl mx-auto mb-10 text-center text-gray-700">
        Aqui você encontra recursos para promover uma vida mais saudável e equilibrada, com foco em acessibilidade e inclusão.
      </p>

      {/* Grid de Cards (seus cards existentes) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {infoCardData.map(card => (
          <InfoCard key={card.title} {...card} />
        ))}
      </div>

      {/* Seção de Clínicas Cadastradas */}
      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-bold text-center text-blue-700">
          Clínicas e Serviços Cadastrados
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : clinicas.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            Nenhuma clínica cadastrada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Reutilizando o HealthResourceCard que já fizemos! */}
            {clinicas.map((clinica) => (
              <HealthResourceCard 
                key={clinica.id} 
                resource={clinica}
                canManage={canRegisterClinic} // <<< ISSO JÁ HABILITA O BOTÃO "EDITAR"
                onDelete={() => handleDelete(clinica.id)} // Passa a função de deletar
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Ajuda (seu modal existente) */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <ModalCadastroClinica
        isOpen={showCadastro}
        onClose={() => setShowCadastro(false)}
        onSuccess={handleCadastroSuccess}
      />
    </div>
  );
}

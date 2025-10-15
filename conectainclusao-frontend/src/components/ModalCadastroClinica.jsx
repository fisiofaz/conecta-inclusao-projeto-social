import React, { useState } from "react";
import { X } from "lucide-react"; // Certifique-se de ter o pacote lucide-react instalado (npm install lucide-react)

export default function ModalCadastroClinica({ isOpen, onClose, onSuccess }) {
  const [clinica, setClinica] = useState({
    nome: "",
    tipoServico: "",
    endereco: "",
    telefone: "",
    email: "",
    site: "",
    acessibilidade: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClinica({ ...clinica, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Conectar com seu backend - ajuste a URL conforme necessário
      // A URL `/api/health-resources` é um exemplo baseado no seu App.jsx
      // Se o seu backend usa outra rota para cadastrar clínicas, ajuste aqui.
      const response = await fetch("/api/health-resources", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Adicione token de autenticação se necessário
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(clinica),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar clínica");
      }

      // Mostrar mensagem de sucesso
      setShowSuccess(true);
      
      // Limpar formulário
      setClinica({
        nome: "",
        tipoServico: "",
        endereco: "",
        telefone: "",
        email: "",
        site: "",
        acessibilidade: "",
        descricao: "",
      });

      // Chamar callback de sucesso (para atualizar lista na página principal)
      if (onSuccess) {
        onSuccess();
      }

      // Fechar modal após 2 segundos
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Erro ao cadastrar clínica:", error);
      alert("Erro ao cadastrar a clínica. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-blue-700">
            Cadastrar Clínica / Serviço
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mensagem de Sucesso */}
        {showSuccess && (
          <div className="mx-6 mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            ✅ Clínica cadastrada com sucesso!
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Nome da Clínica / Serviço *
            </label>
            <input
              type="text"
              name="nome"
              value={clinica.nome}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tipo de Serviço *
            </label>
            <select
              name="tipoServico"
              value={clinica.tipoServico}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              required
            >
              <option value="">Selecione...</option>
              <option value="Clínica Médica">Clínica Médica</option>
              <option value="Fisioterapia">Fisioterapia</option>
              <option value="Psicologia">Psicologia</option>
              <option value="Fonoaudiologia">Fonoaudiologia</option>
              <option value="Terapia Ocupacional">Terapia Ocupacional</option>
              <option value="Nutrição">Nutrição</option>
              <option value="Odontologia">Odontologia</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Endereço Completo *
            </label>
            <input
              type="text"
              name="endereco"
              value={clinica.endereco}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Telefone *
            </label>
            <input
              type="tel"
              name="telefone"
              value={clinica.telefone}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={clinica.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              placeholder="https://"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Site
            </label>
            <input
              type="url"
              name="site"
              value={clinica.site}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              placeholder="https://"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Recursos de Acessibilidade
            </label>
            <textarea
              name="acessibilidade"
              value={clinica.acessibilidade}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              rows="3"
              placeholder="Descreva os recursos de acessibilidade disponíveis (rampas, elevadores, banheiros adaptados, etc. )"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Descrição dos Serviços
            </label>
            <textarea
              name="descricao"
              value={clinica.descricao}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition"
              rows="3"
              placeholder="Descreva os serviços oferecidos"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

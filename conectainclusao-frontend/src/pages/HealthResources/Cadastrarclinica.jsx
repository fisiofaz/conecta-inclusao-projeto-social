import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarClinica() {
  const [clinica, setClinica] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    tipoServico: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClinica({ ...clinica, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aqui você pode conectar com seu backend (API REST)
      // Exemplo fictício:
      // await fetch("/api/clinicas", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(clinica),
      // });

      console.log("Clínica cadastrada:", clinica);
      alert("Clínica cadastrada com sucesso!");
      navigate("/saude");
    } catch (error) {
      console.error("Erro ao cadastrar clínica:", error);
      alert("Erro ao cadastrar a clínica.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Cadastrar Clínica
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={clinica.nome}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={clinica.endereco}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={clinica.cidade}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Serviço</label>
          <input
            type="text"
            name="tipoServico"
            value={clinica.tipoServico}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Salvar Clínica
        </button>
      </form>
    </div>
  );
}

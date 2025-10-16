import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastrarClinica() {
  const [clinica, setClinica] = useState({
    Nome: "",
    Endereço: "",
    Cidade: "",
    Especialidade1: "",
    Especialidade2: "",
    Especialidade3: "",
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
    <div className="max-w-2xl p-8 mx-auto mt-10 bg-white shadow-md rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">
        Cadastrar Clínica
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Nome</label>
          <input
            type="text"
            name="Nome"
            value={clinica.Nome}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Endereço</label>
          <input
            type="text"
            name="Endereço"
            value={clinica.Endereço}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Cidade</label>
          <input
            type="text"
            name="Cidade"
            value={clinica.Cidade}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Tipo de Serviço</label>
          <input
            type="text"
            name="Especialidade"
            value={clinica.Especialidade}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Salvar Clínica
        </button>
      </form>
    </div>
  );
}

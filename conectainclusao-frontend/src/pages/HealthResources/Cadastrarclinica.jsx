import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

export default function CadastrarClinica() {
  const [clinica, setClinica] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    especialidades: "", // Um único campo para várias especialidades
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Nome da Clínica"
          name="nome"
          value={clinica.nome}
          onChange={handleChange}
          placeholder="Ex: Clínica Bem Viver"
          required
        />

        <FormInput
          label="Endereço"
          name="endereco"
          value={clinica.endereco}
          onChange={handleChange}
          placeholder="Ex: Rua das Flores, 123"
          required
        />

        <FormInput
          label="Cidade"
          name="cidade"
          value={clinica.cidade}
          onChange={handleChange}
          placeholder="Ex: São Paulo"
          required
        />

        <FormInput
          label="Serviços ou Especialidades"
          name="especialidades"
          value={clinica.especialidades}
          onChange={handleChange}
          placeholder="Ex: Fisioterapia, Psicologia, Terapia Ocupacional"
          required
        />

        <FormButton type="submit" variant="primary" className="w-full">
          Salvar Clínica
        </FormButton>
      </form>
      
    </div>
  );
}

import React, { useState } from "react";
import api from '../services/api';
import Modal from "./Modal";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import Button from "./Button";
import FeedbackMessage from "./FeedbackMessage";


export default function ModalCadastroClinica({ isOpen, onClose, onSuccess }) {
  const [clinica, setClinica] = useState({
    nome: "",
    tipoRecurso: "",
    endereco: "",
    telefone: "",
    email: "",
    site: "",
    acessibilidadeDetalhes: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClinica(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      await api.post("/health-resources", clinica);
      setFeedback({ type: 'success', message: 'Clínica cadastrada com sucesso!' });      
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose(); // Fecha o modal
        setFeedback({ type: '', message: '' }); // Limpa a mensagem
        // Limpar o formulário pode ser feito aqui, se desejar, ou no fechamento do modal
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao cadastrar clínica:", error);
      setFeedback({ type: 'error', message: 'Erro ao cadastrar a clínica. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const serviceTypes = [
    { value: "", label: "Selecione..." },
    { value: "CLINICA_MEDICA", label: "Clínica Médica" }, // Ex: CLINICA_MEDICA
    { value: "FISIOTERAPIA", label: "Fisioterapia" },   // Ex: FISIOTERAPIA
    { value: "PSICOLOGIA", label: "Psicologia" },     // Ex: PSICOLOGIA
    { value: "FONOAUDIOLOGIA", label: "Fonoaudiologia" }, // Adicione os outros valores do seu Enum
    { value: "TERAPIA_OCUPACIONAL", label: "Terapia Ocupacional" },
    { value: "NUTRICAO", label: "Nutrição" },
    { value: "ODONTOLOGIA", label: "Odontologia" },
    { value: "OUTROS", label: "Outros" },             // Ex: OUTROS
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cadastrar Clínica / Serviço">
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Nome da Clínica / Serviço *" name="nome" value={clinica.nome} onChange={handleChange} required />
        
        {/* 👇 3. CORRIGIDO: 'name' e 'value' atualizados */}
        <FormSelect 
          label="Tipo de Serviço *" 
          name="tipoRecurso" // Corrigido
          value={clinica.tipoRecurso} // Corrigido
          onChange={handleChange} 
          options={serviceTypes} 
          required 
        />
        
        <FormInput label="Endereço Completo *" name="endereco" value={clinica.endereco} onChange={handleChange} required />
        <FormInput label="Telefone *" name="telefone" type="tel" value={clinica.telefone} onChange={handleChange} required />
        <FormInput label="E-mail" name="email" type="email" value={clinica.email} onChange={handleChange} />
        <FormInput label="Site" name="site" type="url" value={clinica.site} onChange={handleChange} placeholder="https://"/>
        
        {/* Campo de Acessibilidade (já corrigido por você) */}
        <FormTextarea 
          label="Recursos de Acessibilidade *" 
          name="acessibilidadeDetalhes" 
          value={clinica.acessibilidadeDetalhes} 
          onChange={handleChange} 
          rows="3" 
          placeholder="Ex: Rampas, elevadores..." 
          required
        />
        
        <FormTextarea label="Descrição dos Serviços" name="descricao" value={clinica.descricao} onChange={handleChange} rows="3" />
        
        <div className="flex flex-col gap-4 pt-4 mt-4 border-t sm:flex-row">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading} className="flex-1">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

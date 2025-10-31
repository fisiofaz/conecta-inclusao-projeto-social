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
    cep: "",
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

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Limpa o CEP

    if (cep.length !== 8) {
      return; // Sai se o CEP não tiver 8 dígitos
    }

    setLoading(true);
    setFeedback({ type: '', message: '' }); // Limpa feedback antigo
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setFeedback({ type: 'error', message: 'CEP não encontrado.' });
        setClinica(prevState => ({ ...prevState, endereco: '' })); // Limpa o endereço
      } else {
        // Sucesso! Combina os dados na string de endereço
        const fullAddress = `${data.logradouro}, ${data.bairro} - ${data.localidade}, ${data.uf}`;
        
        // Atualiza o estado
        setClinica(prevState => ({
          ...prevState,
          endereco: fullAddress // 👈 Preenche o endereço
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setFeedback({ type: 'error', message: 'Ocorreu um erro ao buscar o CEP.' });
    } finally {
      setLoading(false);
    }
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
        <FormInput name="nome" value={clinica.nome} onChange={handleChange} placeholder="Nome da Clínica / Serviço " required />
        <FormSelect name="tipoRecurso" value={clinica.tipoRecurso} onChange={handleChange} options={serviceTypes} placeholder="Tipo de Serviço " required />
        <FormInput name="cep" value={clinica.cep} onChange={handleChange} onBlur={handleCepBlur} placeholder="Digite o CEP" maxLength={9} required />
        <FormInput name="endereco" value={clinica.endereco} onChange={handleChange} placeholder="Endereço (preenchimento automático)" required />
        <FormInput name="telefone" type="tel" value={clinica.telefone} onChange={handleChange} placeholder="Telefone " required />
        <FormInput name="email" type="email" value={clinica.email} onChange={handleChange} placeholder={"E-mail"} required />
        <FormInput name="site" type="url" value={clinica.site} onChange={handleChange} placeholder="Site: https://" required />
        <FormTextarea name="acessibilidadeDetalhes" value={clinica.acessibilidadeDetalhes} onChange={handleChange} rows="3" placeholder="Recursos de Acessibilidade - Ex: Rampas, elevadores..." required />
        <FormTextarea name="descricao" value={clinica.descricao} onChange={handleChange} rows="3" placeholder="Descrição dos Serviços" required />
        
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

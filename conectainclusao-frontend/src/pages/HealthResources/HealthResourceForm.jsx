import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from '../../components/FormInput';
import FormTextarea from '../../components/FormTextarea';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';

function HealthResourceForm() {
  const { id } = useParams(); // usado para edição
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    tipoRecurso: '',
    especialidade: '',
    endereco: '',
    telefone: '',
    website: '',
    acessibilidadeDetalhes: '',
    horarioFuncionamento: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const userTipoPerfil = user?.tipoPerfil;
  const canManageHealthResources = userTipoPerfil === 'ROLE_ADMIN' || userTipoPerfil === 'ROLE_ORGAO_APOIO';
  
  // Buscar dados se for edição
  useEffect(() => {
    if (id) {
      const fetchResource = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/health-resources/${id}`);
          setFormData(response.data);
        } catch (err) {
          console.error('Erro ao carregar recurso de saúde:', err);
          setFeedback({ type: 'error', message: 'Não foi possível carregar os dados.' });
        } finally {
          setLoading(false);
        }
      };
      fetchResource();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFeedback({ type: '', message: '' });

      if (id) {
        await api.put(`/health-resources/${id}`, formData);
        setFeedback({ type: 'success', message: 'Recurso de saúde atualizado com sucesso!' });
      } else {
        await api.post('/health-resources', formData);
        setFeedback({ type: 'success', message: 'Recurso de saúde cadastrado com sucesso!' });
      }

      setTimeout(() => navigate('/saude'), 2000);
    } catch (err) {
      console.error('Erro ao salvar recurso de saúde:', err);
      setFeedback({ type: 'error', message: 'Não foi possível salvar o recurso. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  if (!canManageHealthResources) {
    return (
      <div className="container p-6 mx-auto text-center">
        <p className="text-lg font-bold text-red-600">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl p-8 mx-auto my-10 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="mb-8 text-3xl font-extrabold text-center text-green-700">
        {id ? 'Editar Recurso de Saúde' : 'Cadastrar Novo Recurso de Saúde'}
      </h2>

      <FeedbackMessage type={feedback.type} message={feedback.message} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Nome do Local"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Ex: Clínica de Fisioterapia Mover-se"
          required
        />
        <FormInput
          label="Tipo de Recurso"
          name="tipoRecurso"
          value={formData.tipoRecurso}
          onChange={handleChange}
          placeholder="Ex: Clínica, Hospital, Centro de Reabilitação..."
          required
        />
        <FormInput
          label="Especialidade"
          name="especialidade"
          value={formData.especialidade}
          onChange={handleChange}
          placeholder="Ex: Fisioterapia, Psicologia, Oftalmologia..."
        />
        <FormInput
          label="Endereço"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          placeholder="Ex: Rua das Flores, 123 - Centro, Curitiba - PR"
          required
        />
        <FormInput
          label="Telefone"
          name="telefone"
          type="tel"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(41) 99999-9999"
        />
        <FormInput
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://www.exemplo.com.br"
        />
        <FormTextarea
          label="Acessibilidade"
          name="acessibilidadeDetalhes"
          value={formData.acessibilidadeDetalhes}
          onChange={handleChange}
          rows={3}
          placeholder="Ex: Rampas de acesso, elevador, banheiros adaptados..."
        />
        <FormInput
          label="Horário de Funcionamento"
          name="horarioFuncionamento"
          value={formData.horarioFuncionamento}
          onChange={handleChange}
          placeholder="Ex: Segunda a Sexta, das 08h às 18h"
        />

        <div className="flex items-center justify-between pt-4 mt-6 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/saude')}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Salvando...' : id ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HealthResourceForm;

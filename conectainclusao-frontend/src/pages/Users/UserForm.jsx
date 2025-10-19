import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormInput from '../../components/FormInput';
import PasswordInput from '../../components/PasswordInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import Button from '../../components/Button';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado inicial do formulário (sem senha, ela não é retornada do backend)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    TipoPerfil: 'PCD',
    dataNascimento: '',
    deficiencia: '',
    cidade: '',
    estado: '',
    bio: '',
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) { // Se existe um ID, estamos em modo de edição
      setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setFormData({
            ...response.data,
            senha: '',
            dataNascimento: response.data.dataNascimento ? response.data.dataNascimento : '',
          });
        } catch (err) {
          console.error('Erro ao carregar usuário para edição:', err);
          setFeedback({ type: 'error', message: 'Não foi possível carregar o usuário para edição. Verifique suas permissões.' });
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);
    try {
      // Para o PUT, enviamos todos os campos, incluindo uma senha vazia se não for alterada
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.senha) {
        delete dataToSubmit.senha;
      }
      const response = await api.put(`/users/${id}`, dataToSubmit);
      if (response.status === 200) {
        setFeedback({ type: 'success', message: 'Usuário atualizado com sucesso!' });
        setTimeout(() => navigate('/users'), 2000);
      }
    } catch (err) {
      console.error('Erro ao salvar usuário:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao salvar o usuário. Verifique os dados e tente novamente.';
      if (err.response) {
        if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (Array.isArray(err.response.data.errors)) {
            const validationErrors = err.response.data.errors.map(e => e.defaultMessage || e.message).join('; ');
            errorMessage = 'Erros de validação: ' + validationErrors;
          }
        } else if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
        }
      }
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="container p-4 mx-auto text-center">Carregando dados do usuário para edição...</div>;
  }

  const profileTypes = [
    { value: 'PCD', label: 'Pessoa com Deficiência' },
    { value: 'Empresa', label: 'Empresa' },
    { value: 'ORGAO_APOIO', label: 'Órgão de Apoio' },
    { value: 'ADMIN', label: 'Administrador' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Editar Usuário
        </h2>
        <FeedbackMessage type={feedback.type} message={feedback.message} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className="col-span-full" />
          <FormInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="col-span-full" />
          <PasswordInput name="senha" value={formData.senha} onChange={handleChange} placeholder="Nova Senha (deixe em branco para manter)" className="col-span-full" />
          
          <FormSelect name="tipoPerfil" label="Tipo de Perfil:" value={formData.tipoPerfil} onChange={handleChange} options={profileTypes} className="col-span-full" />
          
          <FormInput name="dataNascimento" type="date" label="Data de Nascimento:" value={formData.dataNascimento} onChange={handleChange} />
          <FormInput name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" />
          
          <FormInput name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" />
          <FormInput name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" />

          <FormTextarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Biografia" rows={4} className="col-span-full" />
          
          <div className="col-span-full">
            <Button type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Atualizar Usuário'}
            </Button>
          </div>
        </form>
        <Button onClick={() => navigate('/users')} variant="secondary" className="w-full mt-4">
          Cancelar e Voltar
        </Button>
      </div>
    </div>
  );
}

export default UserForm;
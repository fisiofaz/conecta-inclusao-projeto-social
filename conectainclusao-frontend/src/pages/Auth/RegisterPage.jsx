import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import FormInput from '../../components/FormInput';
import PasswordInput from '../../components/PasswordInput';
import FormSelect from '../../components/FormSelect';
import FormTextarea from '../../components/FormTextarea';
import Button from '../../components/Button';

function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoPerfil: 'ROLE_USER',
    dataNascimento: '',
    deficiencia: '',
    cidade: '',
    estado: '',
    bio: '',
  });

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });
    setLoading(true);
    try {
     const response = await api.post('/api/auth/register', formData); // Envia para /api/auth/register
      if (response.status === 201) { // Status 201 Created do backend
        setFeedback({ type: 'success', message: 'Usuário registrado com sucesso! Você pode fazer login agora.' });
        // Redireciona para a página de login após um breve atraso
        setTimeout(() => { navigate('/login'); }, 2000);
      }
    } catch (err) {
      console.error('Erro no registro:', err.response || err);
      let errorMessage = 'Ocorreu um erro ao registrar. Tente novamente.';
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = 'Este e-mail já está em uso. Por favor, use outro.';
        } else if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (Array.isArray(err.response.data.errors)) { // Validação do Spring
            const validationErrors = err.response.data.errors.map(e => e.defaultMessage || e.message).join('; ');
            errorMessage = 'Erros de validação: ' + validationErrors;
          }
        } else if (typeof err.response.data === 'string') {
            errorMessage = err.response.data; // Caso o backend retorne apenas uma string de erro
        }
      }
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const profileTypes = [
   { value: 'ROLE_USER', label: 'Pessoa com Deficiência' }, // PCD agora é ROLE_USER
    { value: 'Empresa', label: 'Empresa' },
    { value: 'Orgão_Apoio', label: 'Órgão de Apoio' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-700">Cadastro de Usuário</h2>
      
      <FeedbackMessage type={feedback.type} message={feedback.message} />
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Completo" required className="col-span-full" />
          <FormInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="col-span-full" />
          <PasswordInput name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required className="col-span-full" />
          
          <FormSelect name="tipoPerfil" label="Tipo de Perfil:" value={formData.tipoPerfil} onChange={handleChange} options={profileTypes} className="col-span-full" />
          
          <FormInput name="dataNascimento" type="date" label="Data de Nascimento:" value={formData.dataNascimento} onChange={handleChange} />
          <FormInput name="deficiencia" value={formData.deficiencia} onChange={handleChange} placeholder="Tipo de Deficiência (se aplicável)" />
          
          <FormInput name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Cidade" />
          <FormInput name="estado" value={formData.estado} onChange={handleChange} placeholder="Estado (UF)" />

          <FormTextarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Fale um pouco sobre você..." rows={4} className="col-span-full" />
          
          <div className="col-span-full">
            <Button type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? 'Cadastrando...' : 'Cadastrar'} 
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
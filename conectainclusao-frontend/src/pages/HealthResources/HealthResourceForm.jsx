import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

function HealthResourceForm() {
  const { id } = useParams(); // usado para edição
  const navigate = useNavigate();
  const { getTipoPerfil } = useAuth();

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
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const userTipoPerfil = getTipoPerfil();
  const canManageHealthResources = userTipoPerfil === 'ADMIN' || userTipoPerfil === 'ORGAO_APOIO';

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
          setError('Não foi possível carregar os dados.');
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
      setError(null);

      if (id) {
        await api.put(`/health-resources/${id}`, formData);
        setMessage('Recurso de saúde atualizado com sucesso!');
      } else {
        await api.post('/health-resources', formData);
        setMessage('Recurso de saúde cadastrado com sucesso!');
      }

      setTimeout(() => navigate('/health-resources'), 2000);
    } catch (err) {
      console.error('Erro ao salvar recurso de saúde:', err);
      setError('Não foi possível salvar o recurso de saúde. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!canManageHealthResources) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-600 font-bold text-lg">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg my-10 max-w-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-green-700 text-center mb-8">
        {id ? 'Editar Recurso de Saúde' : 'Cadastrar Novo Recurso de Saúde'}
      </h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Recurso */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Tipo de Recurso</label>
          <input
            type="text"
            name="tipoRecurso"
            value={formData.tipoRecurso}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Clínica, Hospital, Centro de Reabilitação..."
          />
        </div>

        {/* Especialidade */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Especialidade</label>
          <input
            type="text"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Fisioterapia, Psicologia, Oftalmologia..."
          />
        </div>

        {/* Endereço */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Rua das Flores, 123 - Centro, Curitiba - PR"
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="(41) 99999-9999"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://www.exemplo.com.br"
          />
        </div>

        {/* Acessibilidade */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Acessibilidade</label>
          <textarea
            name="acessibilidadeDetalhes"
            value={formData.acessibilidadeDetalhes}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Rampas de acesso, elevador, banheiros adaptados..."
          ></textarea>
        </div>

        {/* Horário de Funcionamento */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Horário de Funcionamento</label>
          <input
            type="text"
            name="horarioFuncionamento"
            value={formData.horarioFuncionamento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Segunda a Sexta, das 08h às 18h"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/health-resources')}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            {loading ? 'Salvando...' : id ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default HealthResourceForm;

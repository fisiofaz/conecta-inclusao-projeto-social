import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { LoaderCircle, AlertTriangle, Users, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';

function UserListPage() {

  console.log("🧩 Entrou em UserListPage");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Função para carregar os usuários
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setFeedback({ type: 'error', message: 'Não foi possível carregar os usuários.' });
    } finally {
      setLoading(false);
    }
  };

  // Carrega os usuários quando a página é montada
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para deletar um usuário
  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      try {
        await api.delete(`/users/${userId}`);
        setFeedback({ type: 'success', message: 'Usuário excluído com sucesso!' });
        // Recarrega a lista após a exclusão
        fetchUsers();
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir o usuário.' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
        <span className="text-lg text-gray-600">Carregando usuários...</span>
      </div>
    );
  }

  console.log("📊 Renderizando UserListPage — usuários:", users.length, "loading:", loading, "feedback:", feedback);

  return (
    <div className="container p-6 mx-auto my-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
      
      <FeedbackMessage type={feedback.type} message={feedback.message} />

      {users.length === 0 && !loading ? (
        <div className="py-10 text-center text-gray-500">
          <Users size={48} className="mx-auto mb-4" />
          <p className="text-xl">Nenhum usuário encontrado no sistema.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nome</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Perfil (Role)</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.tipoPerfil}</td>
                  <td className="flex items-center justify-end gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    {/* Botão Atividades */}
                    <Link
                      to={`/users/details/${user.id}`}
                      className="flex items-center gap-1 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      title="Ver Atividades"
                    >
                      <Users size={16} />
                    </Link>
                    {/* Botão Editar (leva para a outra página) */}
                    <Link
                      to={`/users/edit/${user.id}`}
                      className="flex items-center gap-1 p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                      title="Editar Perfil"
                    >
                      <Edit size={16} />
                    </Link>
                    {/* Botão Excluir */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center gap-1 p-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                      title="Excluir Usuário"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserListPage;

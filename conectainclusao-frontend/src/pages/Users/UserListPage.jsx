import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UserCard from '../../components/UserCard';
import Button from '../../components/Button';
import FeedbackMessage from '../../components/FeedbackMessage';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user?.tipoPerfil === 'ROLE_ADMIN';

  useEffect(() => {
    // NÃO FAÇA NADA se o contexto ainda estiver carregando
    if (authLoading) {
      return; // Aguarde o AuthContext terminar
    }

    // Se o AuthContext terminou e o usuário é Admin, busque os dados
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          setListLoading(true);
          setError(null);
          const response = await api.get('/users');
          setUsers(response.data);
        } catch (err) {
          console.error('Erro ao buscar usuários:', err);
          setError('Não foi possível carregar a lista de usuários.');
        } finally {
          setListLoading(false);
        }
      };
      fetchUsers();
    } else {
      // Se o AuthContext terminou e o usuário NÃO é Admin
      setError('Acesso negado. Apenas administradores podem ver esta página.');
      setListLoading(false);
    }
  }, [isAdmin, authLoading]); // Reaja a mudanças no authLoading e isAdmin

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível!')) {
      try {
        await api.delete(`/users/${id}`);
        setFeedback({ type: 'success', message: 'Usuário excluído com sucesso!' });
        setUsers(users.filter(user => user.id !== id));
        setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        setFeedback({ type: 'error', message: 'Não foi possível excluir o usuário.' });
      }
    }
  };

  if (authLoading || listLoading) {
    return <div className="container p-4 mx-auto text-center">Carregando usuários...</div>;
  }

  if (error) {
    return (
      <div className="container p-4 mx-auto text-center">
        <p className="font-bold text-red-600 mb-4">{error}</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary">Voltar para o Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto my-8 rounded-lg shadow-lg bg-gray-50">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-blue-700">
        Lista de Usuários
      </h2>
      <FeedbackMessage type={feedback.type} message={feedback.message} />
      {users.length === 0 ? (
        <p className="text-lg text-center text-gray-600">
          Nenhum usuário encontrado no sistema.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserListPage;
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { getTipoPerfil } = useAuth(); 

  const userTipoPerfil = getTipoPerfil();
  const isAdmin = userTipoPerfil === 'ADMIN';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/users'); 
        setUsers(response.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('Você não tem permissão para visualizar esta lista de usuários. Apenas usuários logados podem ver.');
        } else {
          setError('Não foi possível carregar a lista de usuários. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) { 
        fetchUsers();
    } else {
        setLoading(false);
        setError('Apenas administradores podem visualizar a lista completa de usuários.');
    }

  }, [isAdmin]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível!')) {
      try {
        setLoading(true);
        await api.delete(`/users/${id}`);
        setMessage('Usuário excluído com sucesso!');
        setUsers(users.filter(user => user.id !== id));
        navigate('/');
      } catch (err) {
        console.error('Erro ao excluir usuário:', err);
        setError('Não foi possível excluir o usuário. Verifique suas permissões.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Carregando usuários...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600 font-bold">{error}</div>;
  }

  if (!isAdmin) {
      return <div className="container mx-auto p-4 text-center text-red-600 font-bold">Acesso negado. Apenas administradores podem visualizar a lista de usuários.</div>;
  }


  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg my-8">
      <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-10">
        Lista de Usuários
      </h2>
      {message && <p className="text-green-600 text-center mb-4">
        {message}
      </p>}
      {users.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Nenhum usuário encontrado no sistema.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-lg font-semibold text-gray-800 mb-3">
                {user.nome}
              </h3>
              <p className="text-sm text-gray-700 mb-2"><strong>
                Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-700 mb-2"><strong>
                Perfil:</strong> {user.tipoPerfil}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>Deficiência:</strong> {user.deficiencia || 'Nenhuma'}
              </p>
              <div className="flex justify-between items-center mt-4 space-x-2">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md text-center hover:bg-yellow-600 transition-colors duration-300 flex-1"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-center hover:bg-red-600 transition-colors duration-300 flex-1"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserListPage;
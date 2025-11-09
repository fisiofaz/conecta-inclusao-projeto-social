import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { LoaderCircle, AlertTriangle, User, Star, FileText, Briefcase, HeartHandshake } from 'lucide-react';
import Button from '../../components/Button';
import ApplicationCard from '../../components/ApplicationCard';
import OpportunityCard from '../../components/OpportunityCard';
import HealthResourceCard from '../../components/HealthResourceCard';

function UserDetailsPage() {
  const { id: userId } = useParams(); // Pega o ID do usuário da URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        //Busca os dados do usuário
        const userPromise = api.get(`/users/${userId}`).catch(() => null);
        //Busca os favoritos do usuário (nova API de Admin)
        const favoritesPromise = api.get(`/favorites/user/${userId}`).catch(() => ({ data: [] }));
        //Busca as candidaturas do usuário (nova API de Admin)
        const applicationsPromise = api.get(`/candidaturas/user/${userId}`).catch(() => ({ data: [] }));

        // Espera todas as 3 chamadas terminarem em paralelo
        const [userResponse, favoritesResponse, applicationsResponse] = await Promise.all([
          userPromise,
          favoritesPromise,
          applicationsPromise
        ]);

        if (!userResponse?.data) {
          setError("Usuário não encontrado.");
          return;
        }

        setUser(userResponse.data);
        setFavorites(favoritesResponse.data);
        setApplications(applicationsResponse.data);

      } catch (err) {
        console.error("Erro ao buscar detalhes do usuário:", err);
        setError("Não foi possível carregar os detalhes deste usuário.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const renderFavoriteCard = (item) => {
    if (!item) return null;
    try {
      switch (item.type) {
        case "opportunity":
          return (
            <OpportunityCard
              key={`fav-opp-${item.id}`}
              opportunity={item}
              canManage={false}
              icon={
                <Briefcase
                  size={20}
                  className="flex-shrink-0 mr-2 text-blue-500"
                />
              }
            />
          );
        case "health":
          return (
            <HealthResourceCard
              key={`fav-hr-${item.id}`}
              resource={item}
              canManage={false}
              icon={
                <HeartHandshake
                  size={20}
                  className="flex-shrink-0 mr-2 text-green-500"
                />
              }
            />
          );
        default:
          return null;
      }
    } catch (err) {
      console.error("Erro ao renderizar favorito:", err);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle size={32} className="mr-3 text-blue-500 animate-spin" />
        <span className="text-lg text-gray-600">
          Carregando detalhes do usuário...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-600">
        <AlertTriangle size={48} className="mx-auto mb-4" />
        <p>{error}</p>
        <Button
          onClick={() => navigate("/users")}
          variant="secondary"
          className="mt-4"
        >
          Voltar para a Lista
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>Usuário não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto my-8 space-y-8">
      {/* Card 1 - Info do Usuário */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <User size={32} className="mr-4 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.nome || "Sem nome"}
            </h1>
            <p className="text-lg text-gray-600">{user.email || "Sem email"}</p>
            <span className="px-3 py-1 mt-2 inline-block text-sm font-semibold text-purple-800 bg-purple-200 rounded-full">
              {user.tipoPerfil || "Perfil não informado"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-t pt-4 text-gray-700">
          <p>
            <strong>Cidade:</strong> {user.cidade || "N/A"}
          </p>
          <p>
            <strong>Estado:</strong> {user.estado || "N/A"}
          </p>
          <p>
            <strong>Deficiência:</strong> {user.deficiencia || "N/A"}
          </p>
          <p>
            <strong>Data Nasc.:</strong> {user.dataNascimento || "N/A"}
          </p>
          <p className="col-span-full">
            <strong>Bio:</strong> {user.bio || "N/A"}
          </p>
        </div>
      </div>

      {/* Card 2 - Candidaturas */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-gray-800">
          <FileText className="text-blue-600" />
          Candidaturas Realizadas ({applications.length})
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">
            Este usuário não se candidatou a nenhuma vaga.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>

      {/* Card 3 - Favoritos */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-gray-800">
          <Star className="text-yellow-500" />
          Itens Favoritos ({favorites.length})
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">
            Este usuário não favoritou nenhum item.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map(renderFavoriteCard)}
          </div>
        )}
      </div>

      <Button
        onClick={() => navigate("/users")}
        variant="secondary"
        className="mt-4"
      >
        Voltar para a Lista de Usuários
      </Button>
    </div>
  );
}

export default UserDetailsPage;
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function PrivateRoute({ children, allowedRoles }) {
  // Pega o usuário e o estado de loading do contexto
  const { user, loading } = useAuth(); 
  const location = useLocation();

  //Se o contexto ainda está carregando os dados do usuário, espere (não mostre nada ou um loader)
  if (loading) {
    // Você pode substituir isso por um componente Spinner depois
    return <div>Verificando permissões...</div>; 
  }

  //Se o carregamento terminou E NÃO há usuário, redireciona para o login
  if (!user) {
    // Salva o destino que o usuário tentou acessar para redirecionar de volta após o login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //Se perfis são necessários E o perfil do usuário NÃO está na lista permitida
  //    (Comparamos diretamente com user.tipoPerfil, que deve ter 'ROLE_ADMIN')
  if (allowedRoles && !allowedRoles.includes(user.tipoPerfil)) {
     console.warn(`Acesso negado para ${user.tipoPerfil} na rota ${location.pathname}. Perfis permitidos: ${allowedRoles.join(', ')}`);
     // Redireciona para o dashboard ou uma página "Não Autorizado" em vez de '/'
     return <Navigate to="/dashboard" replace />; 
  }

  //Se todas as verificações passaram, renderiza o componente protegido
  return children; 
}

export default PrivateRoute;
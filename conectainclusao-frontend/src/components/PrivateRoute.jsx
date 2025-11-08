import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  // Enquanto carrega os dados do usuário
  if (loading) {
    return <div>Verificando permissões...</div>; 
  }

  // Se não há usuário logado → redireciona para o login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔍 Verifica o perfil do usuário
  const userRole = user.tipoPerfil?.startsWith("ROLE_")
    ? user.tipoPerfil
    : `ROLE_${user.tipoPerfil}`;

  // 🔒 Se o perfil não está na lista permitida, bloqueia o acesso
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(
      `Acesso negado: ${user.tipoPerfil || "desconhecido"} na rota ${location.pathname}. 
       Perfis permitidos: ${allowedRoles.join(", ")}`
    );
      return <Navigate to="/access-denied" replace />;
  }

  // ✅ Se passou nas verificações, renderiza o conteúdo protegido
  return children;
}

export default PrivateRoute;

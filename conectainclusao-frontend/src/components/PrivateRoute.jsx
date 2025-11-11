import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function PrivateRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  if (loading) {
    return <div>Verificando permissões...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Normaliza o tipo de perfil (remove ROLE_ se existir)
  const userRole = user.tipoPerfil?.replace(/^ROLE_/, '').toUpperCase();
  const normalizedAllowedRoles = allowedRoles?.map(role => role.replace(/^ROLE_/, '').toUpperCase());

  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(userRole)) {
    console.warn(
      `🚫 Acesso negado: ${user.tipoPerfil || "desconhecido"} em ${location.pathname}.Perfis permitidos: ${allowedRoles.join(", ")}`
    );
    return <Navigate to="/access-denied" replace />;
  }

  console.log("✅ Acesso permitido, renderizando conteúdo protegido!");
  return children ? children : <Outlet />;
}

export default PrivateRoute;

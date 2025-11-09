import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function PrivateRoute({ allowedRoles }) {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  console.log("🟡 PrivateRoute chamado para:", location.pathname);
  console.log("👤 Usuário atual:", user);
  console.log("📜 allowedRoles:", allowedRoles);

  if (loading) {
    return <div>Verificando permissões...</div>;
  }

  if (!user) {
    console.log("❌ Sem usuário logado → redirecionando para /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.tipoPerfil?.startsWith("ROLE_")
    ? user.tipoPerfil
    : `ROLE_${user.tipoPerfil}`;

  console.log("✅ userRole detectado:", userRole);

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(
      `🚫 Acesso negado: ${user.tipoPerfil || "desconhecido"} em ${location.pathname}.
       Perfis permitidos: ${allowedRoles.join(", ")}`
    );
    return <Navigate to="/access-denied" replace />;
  }

  console.log("✅ Acesso permitido, renderizando conteúdo protegido!");
  return <Outlet />;
}

export default PrivateRoute;

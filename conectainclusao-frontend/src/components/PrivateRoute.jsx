import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  console.log("🟡 PrivateRoute chamado para:", location.pathname);
  console.log("👤 Usuário atual:", user);
  console.log("📜 allowedRoles:", allowedRoles);

  // Enquanto carrega os dados do usuário
  if (loading) {
    return <div>Verificando permissões...</div>; 
  }

  // Se não há usuário logado → redireciona para o login
  if (!user) {
    console.log("❌ Sem usuário logado → redirecionando para /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica e normaliza o perfil
  const userRole = user.tipoPerfil?.startsWith("ROLE_")
    ? user.tipoPerfil
    : `ROLE_${user.tipoPerfil}`;

  console.log("✅ userRole detectado:", userRole);

  // Verifica se tem permissão
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn(
      `🚫 Acesso negado: ${user.tipoPerfil || "desconhecido"} em ${location.pathname}.
       Perfis permitidos: ${allowedRoles.join(", ")}`
    );
    return <Navigate to="/access-denied" replace />;
  }

  console.log("✅ Acesso permitido, renderizando conteúdo protegido!");
  return children;
}

export default PrivateRoute;


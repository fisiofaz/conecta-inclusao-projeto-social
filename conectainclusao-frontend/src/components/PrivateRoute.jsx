import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, getTipoPerfil } = useAuth();

  // 1. Verifica se o usuário está autenticado
if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
}
  // 2. Verifica se a rota exige roles específicas
if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getTipoPerfil();
    const formattedUserRole = userRole ? `ROLE_${userRole.toUpperCase()}` : '';

    // Verifica se a role do usuário está entre as roles permitidas para esta rota
    if (!allowedRoles.includes(formattedUserRole)) {
    return <Navigate to="/" replace />; 
    }
}


return children;
}

export default PrivateRoute;
import { Routes, Route, useLocation } from 'react-router-dom';

// Componentes de Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Páginas Principais
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import AccessDeniedPage from './components/AccessDeniedPage'; // 👈 Verifique se este import está correto

// Páginas de Autenticação
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Páginas "Minhas" (Usuário Logado)
import MyComplaintsPage from './pages/MyComplaintsPage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import ApplicantsListPage from './pages/ApplicantsListPage';

// Páginas de Oportunidades
import OpportunityListPage from './pages/Opportunities/OpportunityListPage';
import OpportunityDetailsPage from './pages/Opportunities/OpportunityDetailsPage';
import OpportunityForm from './pages/Opportunities/OpportunityForm';

// Páginas de Denúncias
import ComplaintListPage from './pages/Complaints/ComplaintListPage';
import ComplaintDetailsPage from './pages/Complaints/ComplaintDetailsPage';
import ComplaintForm from './pages/Complaints/ComplaintForm';

// Páginas de Saúde
import SaudeBemEstar from "./pages/HealthResources/SaudeBemEstar";
import HealthResourceDetailsPage from './pages/HealthResources/HealthResourceDetailsPage';
import HealthResourceForm from './pages/HealthResources/HealthResourceForm';
// (HealthResourceListPage não está a ser usado, podemos remover se quiser)
// import HealthResourceListPage from './pages/HealthResources/HealthResourceListPage'; 
// Páginas de Admin
import UserListPage from './pages/Users/UserListPage';
import UserForm from './pages/Users/UserForm';
import UserDetailsPage from './pages/Users/UserDetailsPage';

// Página de Busca
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Rotas de Conteúdo (a maioria é pública) */}
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="/saude" element={<SaudeBemEstar />} />
          <Route path="/saude/:id" element={<HealthResourceDetailsPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />

          {/* --- Rotas Protegidas (Exigem Login) --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-complaints" element={<MyComplaintsPage />} />
            <Route path="/my-favorites" element={<MyFavoritesPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
            <Route path="/opportunities/:id/applicants" element={<ApplicantsListPage />} />
          </Route>

          {/* --- Rotas de Criação/Edição (Permissões Específicas) --- */}

          {/* Oportunidades (Empresa ou Admin) */}
          <Route path="/opportunities/new" element={<PrivateRoute allowedRoles={["EMPRESA", "ADMIN"]}><OpportunityForm /></PrivateRoute>} />
          <Route path="/opportunities/edit/:id" element={<PrivateRoute allowedRoles={["EMPRESA", "ADMIN"]}><OpportunityForm /></PrivateRoute>} />

          {/* Denúncias (Qualquer um logado) */}
          <Route path="/complaints/new" element={<PrivateRoute allowedRoles={["USER", "EMPRESA", "ORGAO_APOIO", "ADMIN"]}><ComplaintForm /></PrivateRoute>} />
          <Route path="/complaints/edit/:id" element={<PrivateRoute allowedRoles={["ADMIN"]}><ComplaintForm /></PrivateRoute>} />

          {/* Saúde (Órgão de Apoio ou Admin) */}
          <Route path="/saude/edit/:id" element={<PrivateRoute allowedRoles={["ORGAO_APOIO", "ADMIN"]}><HealthResourceForm /></PrivateRoute>} />
          <Route path="/saude/new" element={<PrivateRoute allowedRoles={["ORGAO_APOIO", "ADMIN"]}><HealthResourceForm /></PrivateRoute>} />{/* Admin: Gerenciamento de Usuários */}
          <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/users/details/:id" element={<UserDetailsPage />} />
          </Route>
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
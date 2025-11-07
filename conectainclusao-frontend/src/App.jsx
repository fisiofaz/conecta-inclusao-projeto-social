import { Routes, Route, useLocation } from 'react-router-dom';

// Componentes de Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Páginas Principais
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Páginas de Autenticação
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
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


// Páginas de Saúde (Agora consolidadas)
import SaudeBemEstar from "./pages/HealthResources/SaudeBemEstar";
import HealthResourceDetailsPage from './pages/HealthResources/HealthResourceDetailsPage';
import HealthResourceForm from './pages/HealthResources/HealthResourceForm';
import HealthResourceListPage from './pages/HealthResources/HealthResourceListPage';

// Páginas de Admin
import UserListPage from './pages/Users/UserListPage';
import UserForm from './pages/Users/UserForm';

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

          {/* Rotas Privadas (Área Logada) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/my-complaints" element={<MyComplaintsPage />} />
          <Route path="/my-favorites" element={<MyFavoritesPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/opportunities/:id/applicants" element={<ApplicantsListPage />} />

          {/* Oportunidades */}
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/opportunities/new" element={<PrivateRoute allowedRoles={["ROLE_EMPRESA", "ROLE_ADMIN"]}><OpportunityForm /></PrivateRoute>} />
          <Route path="/opportunities/edit/:id" element={<PrivateRoute allowedRoles={["ROLE_EMPRESA", "ROLE_ADMIN"]}><OpportunityForm /></PrivateRoute>} />

          {/* Denúncias */}
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="/complaints/new" element={<PrivateRoute allowedRoles={["ROLE_USER", "ROLE_EMPRESA", "ROLE_ORGAO_APOIO", "ROLE_ADMIN"]}><ComplaintForm /></PrivateRoute>} />
          <Route path="/complaints/edit/:id" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><ComplaintForm /></PrivateRoute>} />
         
          
          {/* Saúde e Bem-estar (Fluxo Consolidado) */}
          <Route path="/saude" element={<SaudeBemEstar />} />
          <Route path="/saude/:id" element={<HealthResourceDetailsPage />} /> {/* Rota de detalhes */}
          <Route path="/saude/edit/:id" element={<PrivateRoute allowedRoles={["ROLE_ORGAO_APOIO", "ROLE_ADMIN"]}><HealthResourceForm /></PrivateRoute>} />

          {/* Gerenciamento de Usuários (Admin) */}
          <Route path="/users" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><UserListPage /></PrivateRoute>} />
          <Route path="/users/new" element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><UserForm /></PrivateRoute>} />
          <Route path="/saude/edit/:id" element={<PrivateRoute allowedRoles={["ROLE_ORGAO_APOIO", "ROLE_ADMIN"]}> <HealthResourceForm /> </PrivateRoute>} 
/>
          {/* Rota 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

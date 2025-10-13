import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import OpportunityListPage from './pages/Opportunities/OpportunityListPage';
import OpportunityDetailsPage from './pages/Opportunities/OpportunityDetailsPage';
import OpportunityForm from './pages/Opportunities/OpportunityForm';
import ComplaintListPage from './pages/Complaints/ComplaintListPage';
import ComplaintDetailsPage from './pages/Complaints/ComplaintDetailsPage';
import ComplaintForm from './pages/Complaints/ComplaintForm';
import HealthResourceListPage from './pages/HealthResources/HealthResourceListPage';
import HealthResourceDetailsPage from './pages/HealthResources/HealthResourceDetailsPage';
import HealthResourceForm from './pages/HealthResources/HealthResourceForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import UserListPage from './pages/Users/UserListPage';
import UserForm from './pages/Users/UserForm';
import SaudeBemEstar from "./pages/HealthResources/SaudeBemEstar";
import CadastrarClinica from "./pages/HealthResources/Cadastrarclinica";




function App() {
  return (
    <div className="flex flex-col min-h-screen App">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />          

           {/* Rotas de Oportunidades */}
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/opportunities/new" element={
            <PrivateRoute allowedRoles={['ROLE_EMPRESA', 'ROLE_ADMIN']}>
              <OpportunityForm />
            </PrivateRoute>
          } />
          <Route path="/opportunities/edit/:id" element={
            <PrivateRoute allowedRoles={['ROLE_EMPRESA', 'ROLE_ADMIN']}>
              <OpportunityForm />
            </PrivateRoute>
          } />

          {/* Rotas de Denúncias */}
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="/complaints/new" element={
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_EMPRESA', 'ROLE_ORGAO_APOIO', 'ROLE_ADMIN']}> 
              <ComplaintForm />
            </PrivateRoute>
          } />
          <Route path="/complaints/edit/:id" element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <ComplaintForm />
            </PrivateRoute>
          } />
          
           {/* Rotas de Recursos de Saúde */}
          <Route path="/health-resources" element={<HealthResourceListPage />} />
          <Route path="/health-resources/:id" element={<HealthResourceDetailsPage />} />
          <Route path="/health-resources/new" element={
            <PrivateRoute allowedRoles={['ROLE_ORGAO_APOIO', 'ROLE_ADMIN']}> {/* Apenas ORGAO_APOIO ou ADMIN criam */}
              <HealthResourceForm />
            </PrivateRoute>
          } />
          <Route path="/health-resources/edit/:id" element={
            <PrivateRoute allowedRoles={['ROLE_ORGAO_APOIO', 'ROLE_ADMIN']}> {/* Apenas ORGAO_APOIO ou ADMIN editam */}
              <HealthResourceForm />
            </PrivateRoute>
          } />

          {/* Página de Saúde & Bem-Estar personalizada */}
          <Route path="/saude" element={<SaudeBemEstar />} />
          <Route path="/users" element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}> {/* Apenas ADMIN pode ver a lista de usuários */}
              <UserListPage />
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}> {/* Apenas ADMIN pode ver a lista de usuários */}
              <UserListPage />
            </PrivateRoute>
          } />
          <Route path="/users/edit/:id" element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}> {/* Apenas ADMIN pode editar usuários */}
              <UserForm />
            </PrivateRoute>
          } />
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
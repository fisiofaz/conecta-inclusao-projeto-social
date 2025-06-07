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


function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/opportunities/new" element={<OpportunityForm />} />
          <Route path="/opportunities/edit/:id" element={<OpportunityForm />} />
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="/complaints/new" element={<ComplaintForm />} />
          <Route path="/complaints/edit/:id" element={<ComplaintForm />} />
          <Route path="/health-resources" element={<HealthResourceListPage />} />
          <Route path="/health-resources/:id" element={<HealthResourceDetailsPage />} />
          <Route path="/health-resources/new" element={<HealthResourceForm />} />
          <Route path="/health-resources/edit/:id" element={<HealthResourceForm />} />
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
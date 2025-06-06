import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage'; 
import OpportunityListPage from './pages/Opportunities/OpportunityListPage'; 
import OpportunityDetailsPage from './pages/Opportunities/OpportunityDetailsPage';
import ComplaintListPage from './pages/Complaints/ComplaintListPage'; 
import ComplaintDetailsPage from './pages/Complaints/ComplaintDetailsPage';


function App() {
  return (
    <div className="App">
      <header>
        {/* Aqui podemos ter um Navbar global no futuro */}
        <h1>Conecta Inclusão</h1>
      </header>
      <main>
         <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
        </Routes>
      </main>
      <footer>
        {/* Rodapé global */}
        <p>&copy; 2025 Conecta Inclusão. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
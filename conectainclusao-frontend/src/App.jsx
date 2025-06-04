import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage'; 
import OpportunityListPage from './pages/Opportunities/OpportunityListPage'; 
import ComplaintListPage from './pages/Complaints/ComplaintListPage'; 

function App() {
  return (
    <div className="App">
      <header>
        {/* Aqui podemos ter um Navbar global no futuro */}
        <h1>Conecta Inclusão</h1>
      </header>
      <main>
        <Routes> {/* Container para todas as rotas */}
          <Route path="/" element={<HomePage />} /> {/* Rota para a Home Page */}
          <Route path="/login" element={<LoginPage />} /> {/* Rota para a página de Login */}
          <Route path="/register" element={<RegisterPage />} /> {/* Rota para a página de Registro */}
          <Route path="/opportunities" element={<OpportunityListPage />} /> {/* Rota para listar oportunidades */}
          <Route path="/complaints" element={<ComplaintListPage />} /> {/* Rota para listar denúncias */}
          {/* Rotas para detalhes (com :id) e outras operações virão depois */}
          <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} /> {/* Rota para páginas não encontradas */}
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
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AccessibilityTools from "./components/Acessibilidade"; // 🔹 import novo

// Páginas
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccessDeniedPage from "./components/AccessDeniedPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import MyComplaintsPage from "./pages/MyComplaintsPage";
import MyFavoritesPage from "./pages/MyFavoritesPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ApplicantsListPage from "./pages/ApplicantsListPage";
import OpportunityListPage from "./pages/Opportunities/OpportunityListPage";
import OpportunityDetailsPage from "./pages/Opportunities/OpportunityDetailsPage";
import OpportunityForm from "./pages/Opportunities/OpportunityForm";
import ComplaintListPage from "./pages/Complaints/ComplaintListPage";
import ComplaintDetailsPage from "./pages/Complaints/ComplaintDetailsPage";
import ComplaintForm from "./pages/Complaints/ComplaintForm";
import SaudeBemEstar from "./pages/HealthResources/SaudeBemEstar";
import HealthResourceDetailsPage from "./pages/HealthResources/HealthResourceDetailsPage";
import HealthResourceForm from "./pages/HealthResources/HealthResourceForm";
import UserListPage from "./pages/Users/UserListPage";
import UserForm from "./pages/Users/UserForm";
import UserDetailsPage from "./pages/Users/UserDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow" role="main">
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Conteúdo */}
          <Route path="/opportunities" element={<OpportunityListPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="/complaints" element={<ComplaintListPage />} />
          <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="/saude" element={<SaudeBemEstar />} />
          <Route path="/saude/:id" element={<HealthResourceDetailsPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />

          {/* Protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-complaints" element={<MyComplaintsPage />} />
            <Route path="/my-favorites" element={<MyFavoritesPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
            <Route path="/opportunities/:id/applicants" element={<ApplicantsListPage />} />
          </Route>

          {/* Edição */}
          <Route
            path="/opportunities/new"
            element={
              <PrivateRoute allowedRoles={["EMPRESA", "ADMIN"]}>
                <OpportunityForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/opportunities/edit/:id"
            element={
              <PrivateRoute allowedRoles={["EMPRESA", "ADMIN"]}>
                <OpportunityForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/complaints/new"
            element={
              <PrivateRoute allowedRoles={["USER", "EMPRESA", "ORGAO_APOIO", "ADMIN"]}>
                <ComplaintForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/complaints/edit/:id"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <ComplaintForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/saude/edit/:id"
            element={
              <PrivateRoute allowedRoles={["ORGAO_APOIO", "ADMIN"]}>
                <HealthResourceForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/saude/new"
            element={
              <PrivateRoute allowedRoles={["ORGAO_APOIO", "ADMIN"]}>
                <HealthResourceForm />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/users/details/:id" element={<UserDetailsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* 🔹 Ferramentas de acessibilidade */}
      <AccessibilityTools />
    </div>
  );
}

export default App;

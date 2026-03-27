import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/footer.jsx";
import Landing from "./pages/Landing.jsx";
import Match from "./pages/Match.jsx";
import ChallengePage from "./pages/ChallengePage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import CompanyList from "./pages/CompanyList.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";

function AppContent() {
  const { pathname } = useLocation();
  const showNavbar = pathname !== "/" && pathname !== "/company";
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/registrering" element={<RegistrationPage />} />
        <Route path="/match" element={<Match />} />
        <Route path="/matcha" element={<Navigate to="/match" replace />} />
        <Route path="/utmaningar" element={<ChallengePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company-list" element={<CompanyList />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/foretag" element={<Navigate to="/company" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

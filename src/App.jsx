import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Match from "./pages/Match.jsx";
import ChallengePage from "./pages/ChallengePage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import CompanyList from "./pages/CompanyList.jsx";
import StudentList from "./pages/StudentList.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import RegistrationCompany from "./pages/RegistrationCompany.jsx";
import RegistrationStudent from "./pages/RegistrationStudent.jsx";

function AppContent() {
  const { pathname } = useLocation();
  const showNavbar = pathname !== "/";
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/registrering" element={<RegistrationStudent />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/match" element={<Match />} />
        <Route path="/utmaningar" element={<ChallengePage />} />
        <Route path="/foretag" element={<CompanyPage />} />
        <Route path="/foretag-list" element={<CompanyList />} />
        <Route path="/foretag/registrering" element={<RegistrationCompany />} />
      </Routes>
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

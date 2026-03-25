import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Match from "./pages/Match.jsx";
import ChallengePage from "./pages/ChallengePage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/match" element={<Match />} />
        <Route path="/matcha" element={<Navigate to="/match" replace />} />
        <Route path="/utmaningar" element={<ChallengePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/foretag" element={<Navigate to="/company" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

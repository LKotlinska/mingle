import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

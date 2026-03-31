import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationCompany.css";
import RegisterForm from "../components/RegisterCompany";

export default function RegistrationPage() {
  return (
    <main className="registrationPage">
      <h1>Registrera ditt deltagande</h1>
      <RegisterForm/>
      <Link to="/company">← Hem</Link>
    </main>
  );
}

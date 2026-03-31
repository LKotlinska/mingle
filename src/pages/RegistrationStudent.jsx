import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";
import RegisterStudent from "../components/RegisterStudent";

export default function RegistrationPage() {
  return (
    <main className="registrationPage">
      <h1>Registrera ditt deltagande</h1>
      <RegisterStudent />
      <Link to="/student">← Hem</Link>
    </main>
  );
}
